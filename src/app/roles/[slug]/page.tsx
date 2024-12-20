import React from "react";

import { unstable_cache } from "next/cache";
import Form from "next/form";
import Link from "next/link";
import { notFound } from "next/navigation";

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
import { Globe } from "lucide-react";
import { Check } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { submitJobApp } from "~/features/job-posting/submit";
import { cn, fmtCurrency, queryParam } from "~/lib/utils";
import "~/styles/role.css";
import { api } from "~/trpc/server";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ submitted?: boolean }>;
}

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

const getMDX = unstable_cache(
  async (post: Awaited<ReturnType<typeof api.post.bySlug>>) => {
    const code = String(
      await compile(post!.post, { outputFormat: "function-body" }),
    );

    return code;
  },
  ["job-post"],
  {
    revalidate: 60 * 60,
  },
);

const Page: React.FC<PageProps> = async ({ params, searchParams }) => {
  const slug = (await params).slug;
  const submissionSuccessful = "submitted" in (await searchParams);

  const post = await api.post.bySlug({ slug });
  if (!post?.post) return notFound();

  const code = await getMDX(post);

  const { default: MDXContent } = await run(code, {
    ...runtime,
    baseUrl: import.meta.url,
  });

  const [start, end] = post.salaryRange;

  return (
    <div className="relative mb-12 grid grid-cols-3 items-start gap-4 md:grid-rows-1">
      <article className="relative col-span-3 md:col-span-2">
        <Link href="#apply" className="absolute right-4 top-4 z-50">
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
        <MDXContent />
      </article>

      <aside
        id="apply"
        className="col-span-3 mb-8 mt-4 self-start rounded p-4 md:sticky md:top-20 md:col-span-1"
      >
        {submissionSuccessful ? (
          <Alert className="mb-6">
            <Check className="rounded-full bg-green-600 stroke-white p-1 text-white" />
            <AlertTitle className="font-semibold text-primary/50">
              submitted
            </AlertTitle>
            <AlertDescription>
              Your application was successfully submitted. You'll hear back from
              us within a few days!
            </AlertDescription>
          </Alert>
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
            disabled={submissionSuccessful}
          >
            Apply
          </Button>
        </Form>
      </aside>
    </div>
  );
};

export default Page;
