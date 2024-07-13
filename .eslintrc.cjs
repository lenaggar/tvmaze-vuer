/* eslint-env node */

module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-essential",
    "plugin:prettier/recommended",
    "@vue/eslint-config-typescript",
    "@vue/eslint-config-typescript/recommended",
    "@vue/eslint-config-prettier",
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
  },
};
