import IconCloud from "~/components/ui/icon-cloud";

const slugs = [
  "dotnet",
  "kubernetes",
  "nodedotjs",
  "typescript",
  "prisma",
  "postgresql",
  "react",
  "awsfargate",
  "amazonwebservices",
  "nextdotjs",
  "openjdk",
  "express",
  "amazonecs",
  "apachekafka",
  "caddy",
  "nginx",
  "rust",
  "github",
  "datadog",
  "linear",
  "sentry",
  "letsencrypt",
  "opentelemetry",
  "cockroachlabs",
  "dotenv",
  "turborepo",
  "eslint",
  "swift",
  "amazonredshift",
  "git",
  "shadcnui",
  "fortinet",
  "kotlin",
  "go",
  "mobx",
  "docker",
  "clickhouse",
  "ubuntu",
  "figma",
  "electron",
].sort(() => Math.random() - 0.5);

const Stack: React.FC = () => {
  return <IconCloud id="product-canvas" iconSlugs={slugs} />;
};

export default Stack;
