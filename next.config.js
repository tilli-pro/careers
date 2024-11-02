/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        {
          key: "Accept-CH",
          value: "Sec-CH-Prefers-Color-Scheme",
        },
        {
          key: "Vary",
          value: "Sec-CH-Prefers-Color-Scheme",
        },
        {
          key: "Critical-CH",
          value: "Sec-CH-Prefers-Color-Scheme",
        },
      ],
    },
  ],
};

export default config;
