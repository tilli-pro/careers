"use server";

import { notFound, redirect } from "next/navigation";

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Prisma } from "@prisma/client";
import { create } from "domain";

import { db } from "~/server/db";

// TODO: setup env for this
const client = new S3Client({
  region: "us-west-2",
  credentials: {
    accessKeyId: "",
    accountId: "",
    secretAccessKey: "",
    sessionToken: "",
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
    const command = new PutObjectCommand({
      Body: Buffer.from(await resume.arrayBuffer()),
      ContentType: resume.type,
      ContentLength: resume.size,
      Bucket: "",
      Key: resume.name,
      Tagging: "",
    });
    const upload = await client.send(command);
    application.resumeUrl = resume.name;
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
  } catch (e) {
    return redirect(`/roles/${slug}?failed=create`);
  }

  return redirect(`/roles/${slug}?submitted`);
};
