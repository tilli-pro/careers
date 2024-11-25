"use server";

import { notFound, redirect } from "next/navigation";

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Prisma } from "@prisma/client";

import { env } from "~/env";
import { db } from "~/server/db";
import { sendNudgeEmail } from "~/server/services/nudge";

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
    return redirect(`/roles/${slug}?failed=email`);
  }
  data.delete("email");

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
  });
  if (!applicant) {
    applicant = await db.applicant.create({
      data: {
        user: {
          create: {
            email,
          },
        },
      },
    });
  }
  application.applicantId = applicant.id;

  const name = data.get("name") as string;
  application.legalName = name;
  application.preferredName = name;
  data.delete("name");

  const attribution = data.get("attribution") as string;
  application.attribution = attribution;
  data.delete("attribution");

  const resume = data.get("resume") as File;
  // handle uploading file and setting url
  if (resume) {
    // 10MB limit
    if (resume.size > 1024 * 1024 * 10) {
      return redirect(`/roles/${slug}?failed=sizelimit`);
    }
    const command = new PutObjectCommand({
      Body: Buffer.from(await resume.arrayBuffer()),
      ContentType: resume.type,
      ContentLength: resume.size,
      Bucket: env.S3_BUCKET,
      Key: resume.name,
      Tagging: `for=${jobId},name=${encodeURIComponent(name)}`,
    });
    const upload = await client.send(command);
    if ((upload.$metadata.httpStatusCode ?? 400) < 400) {
      application.resumeUrl = resume.name;
    } else {
      console.log(upload);
      return redirect(`/roles/${slug}?failed=upload`);
    }
  } else {
    return redirect(`/roles/${slug}?failed=resume`);
  }
  data.delete("resume");

  for (const [question, answer] of data) {
    if (/social-/.test(question)) {
      // handle adding relevant socials
    } else if (/answerid-/.test(question)) {
      if (Array.isArray(application.answers.create)) {
        application.answers.create.push({
          questionId: question,
          answer: answer as string,
        } as any);
      }
    } else {
      console.log({
        question,
        answer,
      });
    }
  }

  console.log(application);
  try {
    const applicationSubmission = await db.jobApplication.create({
      data: application,
    });

    if (applicationSubmission) {
      // TODO: create nudge template for job app submission
      // for both candidate and to notify interviewers/ hiring managers
      await sendNudgeEmail({ name, email }, 1234, []);
      await sendNudgeEmail(
        { name: "Ibrahim Ali", email: "ibrahims@tilli.pro" },
        5678,
        [],
      );
    }
  } catch (e) {
    return redirect(`/roles/${slug}?failed=create`);
  }

  return redirect(`/roles/${slug}?submitted`);
};
