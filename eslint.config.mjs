import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";

// Next.js 16 ships native ESLint flat configs — import them directly.
// (Wrapping them through @eslint/eslintrc's FlatCompat crashes with a
// "Converting circular structure to JSON" error in this toolchain.)
const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypeScript,
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
];

export default eslintConfig;
