import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import airbnbBase from "eslint-config-airbnb-base";
import airbnbTypeScriptBase from "eslint-config-airbnb-typescript/base";
import jestRecommended from "eslint-plugin-jest/recommended";
import prettier from "eslint-config-prettier";

export default [
  {
    languageOptions: {
      globals: globals.browser,
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: "./tsconfig.eslint.json",
      },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReactConfig,
  airbnbBase,
  airbnbTypeScriptBase,
  jestRecommended,
  prettier,
  {
    plugins: {
      "react-hooks": "eslint-plugin-react-hooks",
      "@typescript-eslint": tseslint,
    },
    rules: {
      "no-plusplus": "off",
      "no-bitwise": "off",
      "@typescript-eslint/no-use-before-define": "off",
      "import/extensions": "off",
      "import/prefer-default-export": "off",
      "arrow-body-style": "off",
      "prefer-arrow-callback": "off",
      "prefer-destructuring": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "indent": "off",
      "@typescript-eslint/indent": "off",
    },
  },
];
