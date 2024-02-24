/** @type {import("prettier").Config & import("prettier-plugin-tailwindcss").PluginOptions & import("@trivago/prettier-plugin-sort-imports").PluginConfig} */
const config = {
  trailingComma: "es5",
  singleQuote: false,
  printWidth: 80,
  arrowParens: "always",
  useTabs: false,
  tabWidth: 2,
  semi: true,
  bracketSameLine: false,
  plugins: [
    "@trivago/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
  importOrder: [
    "^react$",
    "^server$",
    "<THIRD_PARTY_MODULES>",
    "#((server|client|portal)/.*|constants|schema)$",
    "^[./]",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderGroupNamespaceSpecifiers: true,
  importOrderParserPlugins: ["typescript", "jsx", "decorators"],
  endOfLine: "lf",
  tailwindConfig: "./tailwind.config.ts",
};

export default config;
