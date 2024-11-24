import Form from "next/form";
import Link from "next/link";
import { notFound } from "next/navigation";

import * as runtime from "react/jsx-runtime";
import { compile, run } from "@mdx-js/mdx";
import type { SocialLink } from "@prisma/client";
import { Check } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { submitJobApp } from "~/features/job-posting/submit";
import { cn } from "~/lib/utils";
import "~/styles/role.css";
import { api } from "~/trpc/server";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ submitted?: boolean }>;
}

const defaultQuestions = [
  {
    id: "name",
    question: "Name",
    placeholder: "Jane Sumerack",
    required: true,
  },
  {
    id: "email",
    question: "Email",
    type: "email",
    placeholder: "j.sumerack@email.com",
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

const Question: React.FC<(typeof defaultQuestions)[number]> = ({
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
  return <Input type="url" name={social} placeholder={placeholder} />;
};

const Page: React.FC<PageProps> = async ({ params, searchParams }) => {
  const slug = (await params).slug;
  const submissionSuccessful = "submitted" in (await searchParams);

  const post = await api.post.bySlug({ slug });

  if (!post?.post) return notFound();

  const code = String(
    await compile(post.post, { outputFormat: "function-body" }),
  );

  const { default: MDXContent } = await run(code, {
    ...runtime,
    baseUrl: import.meta.url,
  });

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
        <MDXContent />
      </article>

      <aside
        id="apply"
        className="col-span-3 mb-8 mt-4 self-start rounded border border-muted p-4 md:sticky md:top-20 md:col-span-1"
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

            {defaultQuestions.map((q) => (
              <Question key={q.question} {...q} />
            ))}

            {post.questions.map((q) => (
              <Question key={q.id} {...q} />
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
              className="hidden"
              hidden
              value="false"
              type="checkbox"
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
