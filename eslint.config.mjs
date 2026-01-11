export default [
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "**/*.ts",
      "**/*.tsx",
    ],
  },
  {
    files: ["**/*.{js,jsx,mjs,cjs}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    rules: {},
  },
];
