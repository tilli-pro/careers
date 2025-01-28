await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  experimental: {
    ppr: "incremental",
    after: true,
  },
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
