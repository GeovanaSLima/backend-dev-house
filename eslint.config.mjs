import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: { 
      globals: globals.node,
    },
    extends: ['plugin:prettier/recommended'],
    plugins: ["prettier"],
    rules: {
      "prettier/prettier": "error",
      "class-methods-use-this": "off",
      "no-param-reassign": "off",
      "camelcase": "off",
      "no-underscore-dangle": "off",
      "no-unused-vars": ["error", { "argsIgnorePattern": "next" }]
    },
    env: {
      node: true,
      es2021: true
    },
    files: ["*.js"],
  },
  pluginJs.configs.recommended,
];
