import next from "@tilli-pro/eslint-config/next.mjs";

export default [
  ...next,
  {
    rules: {
      "@next/next/no-duplicate-head": "off",
    },
  },
];
