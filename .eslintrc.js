module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  parser: ["@typescript-eslint/parser"],
  ignorePatterns: ["build"],
};
