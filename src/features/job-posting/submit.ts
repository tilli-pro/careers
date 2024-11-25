"use server";

import { notFound, redirect } from "next/navigation";

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import type { Prisma } from "@prisma/client";
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

  const application: Partial<Prisma.JobApplicationCreateWithoutApplicantInput> =
    {};
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
  application.email = email as string;
  data.delete("email");

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
      if (!application.answers) {
        application.answers = { connect: [] };
      }

      if (Array.isArray(application.answers.connect)) {
        application.answers.connect.push({
          id: undefined,
          questionId: question,
          postingId: jobId,
          applicantId: applicant.id,
          answer: answer as string,
        });
      }
    } else {
      console.log({
        question,
        answer,
      });
    }
  }

  console.log(application);

  return redirect(`/roles/${slug}?submitted`);
};
