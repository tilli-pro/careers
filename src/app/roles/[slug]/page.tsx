import * as runtime from "react/jsx-runtime";
import { compile, run } from "@mdx-js/mdx";

import { api } from "~/trpc/server";

const notFound = `
# Uh oh!

It seems like the posting you're looking for was not found. If you believe that this is an error, please reach out to us at hiring@tilli.pro.
`;
interface PageProps {
  params: Promise<{ slug: string }>;
}

const Page: React.FC<PageProps> = async ({ params }) => {
  const slug = (await params).slug;
  const post = await api.post.bySlug({ slug });

  const jobPost = post?.post ?? notFound;

  const code = String(
    await compile(jobPost, { outputFormat: "function-body" }),
  );

  const { default: MDXContent } = await run(code, {
    ...runtime,
    baseUrl: import.meta.url,
  });

  return (
    <div>
      <MDXContent />
    </div>
  );
};

export default Page;
