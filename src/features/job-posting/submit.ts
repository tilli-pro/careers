"use server";

import { redirect } from "next/navigation";

import type { JobApplication, Prisma } from "@prisma/client";

export const submitJobApp = async (data: FormData) => {
  console.log(data);

  const application: Partial<Prisma.JobApplicationCreateWithoutApplicantInput> =
    {};
  const jobId = data.get("post_id") as string;
  const slug = data.get("post_slug") as string;

  for (const [question, answer] of data) {
    switch (question) {
      case "post_id":
        break;
      case "name":
        application.legalName = answer as string;
        application.preferredName = answer as string;
        break;
      case "email":
        application.email = answer as string;
        break;
      case "about-tilli":
        application.attribution = answer as string;
        break;
      case "resume":
        if (answer && answer instanceof File) {
          const resume = answer;

          //
        }
        break;
      default:
        if (!application.answers) application.answers = { connect: [] };
        if (Array.isArray(application.answers.connect)) {
          application.answers.connect.push({
            id: undefined,
            questionId: question,
            postingId: jobId,
            applicantId: "",
            answer: answer as string,
          });
        }
        break;
    }

    console.log(application);
  }

  return redirect(`/roles/${slug}?submitted`);
};
