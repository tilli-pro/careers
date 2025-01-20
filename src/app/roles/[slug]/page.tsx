import React, { Suspense } from "react";

import Form from "next/form";
import Link from "next/link";
import { notFound } from "next/navigation";
import { unstable_after } from "next/server";

import * as runtime from "react/jsx-runtime";
import { faker } from "@faker-js/faker";
import {
  SiDevdotto,
  SiDribbble,
  SiGithub,
  SiLinkedin,
  SiMedium,
  SiX,
} from "@icons-pack/react-simple-icons";
import { compile, run } from "@mdx-js/mdx";
import { SocialLink } from "@prisma/client";
import { AlertTriangle, Check, Globe } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { ShineBorder } from "~/components/ui/shine-border";
import { Textarea } from "~/components/ui/textarea";
import { submitJobApp } from "~/features/job-posting/submit";
import {
  FailureReason,
  SubmissionFailures,
} from "~/features/job-posting/types";
import { cn, fmtCurrency, queryParam } from "~/lib/utils";
import { dbAll } from "~/server/api/routers/post";
import { db } from "~/server/db";
import "~/styles/role.css";
import { api } from "~/trpc/server";

export const revalidate = 3600;
export const dynamicParams = true;
export const experimental_ppr = true;

export async function generateStaticParams() {
  const data = await dbAll();

  return data.map(({ slug }) => ({
    slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{
    submitted?: string;
    failed?: FailureReason;
  }>;
}

const Page: React.FC<PageProps> = async ({ params, searchParams }) => {
  const slug = (await params).slug;
  const { submitted, failed } = await searchParams;
  const applicantId = submitted;

  const post = await api.post.bySlug({ slug });
  if (!post?.post) return notFound();

  const submissionSuccessful = applicantId
    ? await db.applicant.findUnique({
        where: {
          id: applicantId,
          applications: { some: { postingId: post.id, notifiedWeb: false } },
        },
      })
    : null;

  const [start, end] = post.salaryRange;

  unstable_after(async () => {
    if (submissionSuccessful && applicantId) {
      await db.jobApplication.update({
        where: {
          postingId_applicantId: {
            applicantId: applicantId,
            postingId: post.id,
          },
        },
        data: {
          notifiedWeb: true,
        },
      });
    }
  });

  return (
    <>
      {!!failed && <SubmissionError failed={failed} />}
      <div className="relative mb-12 grid grid-cols-3 items-start gap-4 md:grid-rows-1">
        <article className="relative col-span-3 md:col-span-2">
          <Link href="#apply" className="absolute right-4 top-4 z-[30]">
            <Button
              className={cn(
                "md:hidden dark:text-white",
                submissionSuccessful
                  ? "bg-green-600 hover:bg-green-500/90"
                  : "bg-blue-600 hover:bg-blue-600/90",
              )}
            >
              {submissionSuccessful ? "Submitted!" : "Apply Now"}
            </Button>
          </Link>
          <h1>{post.title}</h1>
          <div className="flex flex-row gap-2">
            <p>
              <Link
                className="hover:underline"
                href={`/roles?${queryParam("department", post.department.slug)}`}
              >
                {post.department.name}
              </Link>
            </p>
            <span>•</span>
            <p>
              <Link
                className="hover:underline"
                href={`roles?${queryParam("location", post.location.slug)}`}
              >
                {post.location.location}
              </Link>
            </p>
          </div>
          <p className="text-xs font-medium opacity-50">
            {fmtCurrency(start ?? NaN)} - {fmtCurrency(end ?? NaN)}
          </p>
          <Suspense fallback={<div>Loading...</div>}>
            <JobRoleContent post={post.post} />
          </Suspense>
        </article>

        <aside
          id="apply"
          className="col-span-3 mb-8 mt-4 self-start rounded p-4 md:sticky md:top-20 md:col-span-1"
        >
          {submissionSuccessful ? (
            <ShineBorder
              borderWidth={2}
              className="mb-6"
              color={["#CCC", "#888", "#333"]}
            >
              <Alert className="border-none">
                {/* <Check
                className="relative z-0 rounded-full bg-green-600 stroke-white p-1 text-white"
                size={48}
              /> */}
                <AlertTitle className="relative z-10 mb-3 flex flex-row items-center gap-1 bg-background/10 font-tilli font-bold text-primary/80 backdrop-blur">
                  <Check
                    className="relative z-0 rounded-full bg-green-600 stroke-white stroke-[4] p-1 text-white"
                    size={16}
                  />
                  <div>Application Submitted</div>
                </AlertTitle>
                <AlertDescription className="relative z-10 bg-background/10 backdrop-blur">
                  Your application was successfully submitted. You'll hear back
                  from us within a few days!
                </AlertDescription>
              </Alert>
            </ShineBorder>
          ) : (
            <div className="mb-6 text-center">
              <h2 className="md:hidden">Apply to be a {post.title}</h2>
              <h2 className="hidden md:block">Apply Now</h2>
            </div>
          )}

          <Form action={submitJobApp}>
            <div className="mb-8 flex w-full flex-col gap-4">
              <Input type="hidden" name="post_id" hidden value={post.id} />
              <Input type="hidden" name="post_slug" hidden value={post.slug} />

              {defaultQuestions().map((q) => (
                <Question key={q.question} {...q} />
              ))}

              {post.questions.map((q) => (
                <Question key={q.id} {...q} id={`answerid-${q.id}`} />
              ))}

              <div className="grid w-full items-center gap-1.5">
                <Label>Related Profiles</Label>
                {post.allowedSocials.map((social) => (
                  <Social key={social} social={social} />
                ))}
              </div>

              <div className="grid w-full items-center gap-1.5">
                <Label>Resume/ CV*</Label>
                <Input
                  type="file"
                  name="resume"
                  placeholder="resume.pdf"
                  accept="application/pdf"
                  required
                />
              </div>

              <span className="self-end text-right text-xs text-primary/50">
                *required fields
              </span>

              <Input
                containerClassName="hidden"
                className="hidden"
                hidden
                value="false"
                type="hidden"
                name="submit_true_for_fast_track_interview"
              />
            </div>

            <Button
              className="z-50 w-full bg-blue-600 hover:bg-blue-600/90 dark:text-white"
              tabIndex={0}
              type="submit"
              disabled={!!submissionSuccessful}
            >
              Apply
            </Button>
          </Form>
        </aside>
      </div>
    </>
  );
};

interface SubmissionErrorProps {
  failed: FailureReason;
}
const SubmissionError: React.FC<SubmissionErrorProps> = ({ failed }) => {
  const description = () => {
    switch (failed) {
      case SubmissionFailures.email:
        return "Please submit a valid email for your application.";
      case SubmissionFailures.resume:
        return "Please submit a valid resume for your application.";
      case SubmissionFailures.create:
        return "There was an issue submitting your application. Please try again. If this issue persists, please contact us at career@tilli.pro.";
      case SubmissionFailures.exists:
        return "Our records indicate you already have an active application with us for this role. If you believe this is a mistake, please contact us at career@tilli.pro.";
      case SubmissionFailures.sizelimit:
        return "Please upload a resume that is less than 20MB in size.";
      case SubmissionFailures.upload:
        return "There was an issue submitting your application. Please try again. If this issue persists, please contact us at career@tilli.pro.";
      default:
        return "An unknown error occurred. If this persists, please contact us at career@tilli.pro.";
    }
  };

  return (
    <Alert
      variant="destructive"
      className="mt-4 items-center bg-red-500 text-white"
    >
      <AlertTriangle className="text-white" color="white" size={20} />
      <AlertTitle>Submission Error</AlertTitle>
      <AlertDescription>{description()}</AlertDescription>
    </Alert>
  );
};

const defaultQuestions = () => {
  const placeholderFirstName = faker.person.firstName();
  const placeholderLastName = faker.person.lastName();
  const baseProviders = ["gmail.com", "outlook.com", "icloud.com"];
  const providers = [
    ...baseProviders,
    ...baseProviders,
    ...baseProviders,
    ...baseProviders,
    ...baseProviders,
    ...baseProviders,
    ...baseProviders,
    ...baseProviders,
    "apple.com",
    "github.com",
    "linear.app",
  ];
  const placeholderEmail = faker.internet.email({
    firstName: placeholderFirstName,
    lastName: placeholderLastName,
    provider: providers[Math.floor(Math.random() * providers.length)],
  });

  return [
    {
      id: "name",
      question: "Name",
      placeholder: `${placeholderFirstName} ${placeholderLastName}`,
      required: true,
    },
    {
      id: "email",
      question: "Email",
      type: "email",
      placeholder: placeholderEmail,
      required: true,
    },
    {
      id: "about-tilli",
      question: "How did you learn about Tilli?",
      placeholder: "Write here...",
      required: false,
      longForm: true,
    },
  ];
};

const JobRoleContent: React.FC<{ post: string }> = async ({ post }) => {
  const code = await compile(post, { outputFormat: "function-body" });

  const { default: MDXContent } = await run(code, {
    ...runtime,
    baseUrl: import.meta.url,
  });

  return <MDXContent />;
};

const Question: React.FC<ReturnType<typeof defaultQuestions>[number]> = ({
  question,
  id,
  placeholder,
  type,
  required,
  longForm,
}) => {
  const Component = longForm ? Textarea : Input;

  return (
    <div className="grid w-full items-center gap-1.5">
      <Label htmlFor={question}>
        {question}
        {required ? "*" : ""}
      </Label>
      <Component
        type={type ?? "text"}
        className=""
        id={question}
        placeholder={placeholder}
        required={required}
        name={id}
      />
    </div>
  );
};

const Social: React.FC<{ social: SocialLink }> = ({ social }) => {
  const placeholder = social.slice(0, 1) + social.slice(1).toLocaleLowerCase();

  const SocialIconBase = (() => {
    switch (social) {
      case SocialLink.GITHUB:
        return SiGithub;
      case SocialLink.DRIBBBLE:
        return SiDribbble;
      case SocialLink.LINKEDIN:
        return SiLinkedin;
      case SocialLink.TWITTER:
        return SiX;
      case SocialLink.PERSONAL:
        return Globe;
      case SocialLink.DEVTO:
        return SiDevdotto;
      case SocialLink.MEDIUM:
        return SiMedium;
      default:
        return Globe;
    }
  })();

  return (
    <Input
      IconLeft={SocialIconBase}
      type="url"
      name={`social-${social}`}
      placeholder={placeholder}
    />
  );
};

export default Page;
