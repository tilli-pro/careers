import baseConfig, { restrictEnvAccess } from "@tilli-pro/eslint-config/base";
import nextjsConfig from "@tilli-pro/eslint-config/nextjs";
import reactConfig from "@tilli-pro/eslint-config/react";

export default [
  ...baseConfig,
  ...reactConfig,
  ...nextjsConfig,
  ...restrictEnvAccess,
  {
    ignores: [".next/**"]
  },
  {
    rules: {
      "@next/next/no-duplicate-head": "off",
      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/dot-notation": "off",
      "@typescript-eslint/no-empty-function": "off",
    },
  },
];
