"use server";

import { notFound, redirect } from "next/navigation";

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Prisma, SocialLink } from "@prisma/client";

import { env } from "~/env";
import { db } from "~/server/db";
import { sendNudgeEmail } from "~/server/services/nudge";

import { SubmissionFailures } from "./types";

// TODO: setup env for this
const client = new S3Client({
  region: env.AWS_REGION,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
});

const applicationValidator =
  Prisma.validator<Prisma.JobApplicationUncheckedCreateInput>();

export const submitJobApp = async (data: FormData) => {
  const jobId = data.get("post_id") as string;
  const slug = data.get("post_slug") as string;
  if (!slug || !jobId) {
    return notFound();
  }
  data.delete("post_id");
  data.delete("post_slug");

  const email = data.get("email") as string;
  if (!email) {
    return redirect(`/roles/${slug}?failed=${SubmissionFailures.email}`);
  }
  data.delete("email");
  const _shouldFastTrack = data.get("submit_true_for_fast_track_interview") as
    | "true"
    | "false";
  const shouldFastTrack = _shouldFastTrack !== "false";
  data.delete("submit_true_for_fast_track_interview");

  const role = await db.jobPosting.findFirst({
    where: { id: jobId },
    include: {
      hiringManager: {
        include: {
          user: true,
        },
      },
    },
  });

  const application = applicationValidator({
    email,
    legalName: "" as string,
    preferredName: "" as string,
    postingId: jobId,
    applicantId: "" as string,
    resumeUrl: "" as string,
    attribution: "" as string,
    answers: {
      create:
        [] as Prisma.JobPostingApplicantAnswerUncheckedCreateNestedManyWithoutApplicationInput["create"],
    },
  });
  let applicant = await db.applicant.findFirst({
    where: { user: { email } },
    include: { user: { include: { socials: true } } },
  });

  if (!applicant) {
    applicant = await db.applicant.create({
      data: {
        user: {
          connectOrCreate: {
            create: {
              name: data.get("name") as string,
            },
            where: {
              email,
            },
          },
        },
      },
      include: {
        user: {
          include: {
            socials: true,
          },
        },
      },
    });
  } else {
    // make sure they haven't submitted an application yet for this job
    const existing = await db.jobApplication.findFirst({
      where: {
        postingId: jobId,
        applicantId: applicant.id,
      },
    });
    if (existing) {
      return redirect(`/roles/${slug}?failed=${SubmissionFailures.exists}`);
    }
  }
  application.applicantId = applicant.id;

  const name = data.get("name") as string;
  application.legalName = name;
  application.preferredName = name;
  data.delete("name");

  const attribution = data.get("about-tilli") as string;
  application.attribution = attribution;
  data.delete("about-tilli");

  const resume = data.get("resume") as File;
  // handle uploading file and setting url
  if (resume) {
    // 10MB limit
    if (resume.size > 1024 * 1024 * 10) {
      return redirect(`/roles/${slug}?failed=${SubmissionFailures.sizelimit}`);
    }
    try {
      const resumeKey = `${role?.slug ?? "NO_SLUG"}-${applicant.id}-${resume.name}`;
      const command = new PutObjectCommand({
        Body: Buffer.from(await resume.arrayBuffer()),
        ContentType: resume.type,
        ContentLength: resume.size,
        Bucket: env.S3_BUCKET,
        Key: resumeKey,
        // Tagging: `jobId=${jobId}`,
      });
      const upload = await client.send(command);
      if ((upload.$metadata.httpStatusCode ?? 400) < 400) {
        application.resumeUrl = resumeKey;
      } else {
        console.log(upload);
        throw new Error("Failed to upload resume");
      }
    } catch (e) {
      console.log(e);
      return redirect(`/roles/${slug}?failed=${SubmissionFailures.upload}`);
    }
  } else {
    return redirect(`/roles/${slug}?failed=${SubmissionFailures.resume}`);
  }
  data.delete("resume");

  for (const [question, answer] of data) {
    if (/social-/.test(question)) {
      // handle adding relevant socials
      if (!answer) continue;

      const social = question.split("social-")[1]!;
      const type = social as SocialLink;

      if (!applicant.user?.socials.find((s) => s.type === type)) {
        await db.socialAccount.create({
          data: {
            type,
            value: answer as string,
            userId: applicant.userId!,
          },
        });
      } else {
        await db.socialAccount.updateMany({
          where: {
            userId: applicant.userId!,
            type,
          },
          data: {
            value: answer as string,
          },
        });
      }
    } else if (/answerid-/.test(question)) {
      if (Array.isArray(application.answers.create)) {
        application.answers.create.push({
          questionId: question,
          answer: answer as string,
        } as any);
      }
    } else if (question.includes("$ACTION_ID_")) {
      console.log("Skipping server action form field");
    } else {
      console.log({
        question,
        answer,
      });
    }
  }

  const applicantId = applicant.id;
  try {
    const applicationSubmission = await db.jobApplication.create({
      data: application,
      include: {
        answers: {
          include: {
            question: true,
          },
        },
      },
    });

    if (applicationSubmission) {
      // for both candidate and to notify interviewers/ hiring managers
      const merge = {
        job_slug: role?.slug ?? "",
        job_name: role?.title ?? "",
        job_hiring: role?.hiringManager.user.name ?? "Tilli Team",
        applicant_name: applicationSubmission.legalName,
        applicant_email: applicationSubmission.email,
        applicant_referral: applicationSubmission.attribution ?? "NONE",
        applicant_answers: JSON.stringify(
          Object.fromEntries([
            ["FAST_TRACK", shouldFastTrack ? "YES" : "NO"],
            ...applicationSubmission.answers.map(
              ({ answer, question: { id, question } }) => [
                id,
                `Question: ${question}\nAnswer:${answer}`,
              ],
            ),
          ]),
          null,
          2,
        ),
      };
      const mergeTags = Object.entries(merge).map(([key, value]) => ({
        tagName: key,
        tagValue: value,
      }));

      try {
        const settled = await Promise.allSettled([
          sendNudgeEmail(
            { name, email },
            env.NUDGE_NOTIFY_ID,
            mergeTags,
            undefined,
            { emailBcc: env.HIRING_SUPER_EMAIL },
          ),
          sendNudgeEmail(
            { name: env.HIRING_SUPER_NAME, email: env.HIRING_SUPER_EMAIL },
            env.NUDGE_SUBMIT_ID,
            mergeTags,
            resume ? [resume] : undefined,
            role?.hiringManager.user.email
              ? { emailCc: role?.hiringManager.user.email }
              : undefined,
          ),
        ]);
        settled.forEach((result) => {
          if (result.status === "rejected") {
            console.log(result.reason);
          } else {
            console.log("Email sent successfully:", result.value);
          }
        });
      } catch (e) {
        console.log(e);
      }

      await db.jobApplication.update({
        where: {
          postingId_applicantId: {
            postingId: jobId,
            applicantId: applicant.id,
          },
        },
        data: {
          notifiedEmail: true,
        },
      });
    }
  } catch (e) {
    console.log(e);
    return redirect(`/roles/${slug}?failed=${SubmissionFailures.create}`);
  }

  return redirect(`/roles/${slug}?submitted=${applicantId}`);
};
