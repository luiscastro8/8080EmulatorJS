module.exports = {
  env: {
    browser: true,
    es2021: true,
    "jest/globals": true,
  },
  extends: ["airbnb-base", "prettier", "plugin:import/typescript"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "jest"],
  rules: {
    "no-bitwise": ["error", { allow: ["&", "|", "<<", ">>"] }],
    "prefer-destructuring": ["error", { object: true, array: false }],
    "import/extensions": ["error", "ignorePackages", { ts: "never" }],
  },
};
