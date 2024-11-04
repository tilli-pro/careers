import * as runtime from "react/jsx-runtime";
import { compile, run } from "@mdx-js/mdx";

const JobMDX: React.FC<{ post: string }> = async ({ post }) => {
  const code = String(await compile(post, { outputFormat: "function-body" }));

  const { default: MDXContent } = await run(code, {
    ...runtime,
    baseUrl: import.meta.url,
  });

  return <MDXContent />;
};

export default JobMDX;
