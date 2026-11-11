import expo from "eslint-plugin-expo"
import antfu from "@antfu/eslint-config"
import reactNative from "eslint-plugin-react-native"

import { fixupPluginRules } from "@eslint/compat"

export default antfu({
  type: "app",
  react: true,
  typescript: {
    tsconfigPath: "tsconfig.json",
  },
  stylistic: {
    indent: 2,
    quotes: "double",
    semi: false,
  },
  gitignore: true,
  ignores: [
    ".cache/**",
    ".local/**",
    "assets/expo.icon/**",
    "node_modules/**",
  ],
}, {
  files: ["**/*.{js,jsx,ts,tsx,mjs,cjs,mts,cts}"],
  rules: {
    "antfu/if-newline": "off",
    "curly": ["error", "all"],
    "eqeqeq": ["error", "always"],
    "no-duplicate-imports": [
      "error",
      { allowSeparateTypeImports: true },
    ],
    "no-empty": "error",
    "no-empty-function": "error",
    "no-unreachable": "error",
    "no-var": "error",
    "node/no-process-env": "error",
    "node/no-process-exit": "error",
    "node/prefer-global/process": "off",
    "perfectionist/sort-imports": "off",
    "prefer-const": "error",
    "react-refresh/only-export-components": "off",
    "style/arrow-parens": "off",
    "style/jsx-curly-newline": "off",
    "style/max-len": [
      "error",
      { code: 120 },
    ],
    "style/multiline-ternary": "off",
    "style/operator-linebreak": "off",
    "style/quotes": "error",
    "ts/consistent-type-definitions": ["error", "type"],
    "ts/no-empty-function": "error",
    "ts/no-explicit-any": "error",
    "ts/no-unused-expressions": "off",
    "ts/no-unused-vars": [
      "error",
      {
        args: "all",
        vars: "all",
        caughtErrors: "all",
        argsIgnorePattern: "^$",
        varsIgnorePattern: "^$",
        caughtErrorsIgnorePattern: "^$",
      },
    ],
    "unicorn/filename-case": [
      "error",
      {
        case: "kebabCase",
        ignore: ["README.md", "LICENSE"],
      },
    ],
    "unused-imports/no-unused-imports": "error",
  },
}, {
  files: ["src/**/*.{js,jsx,ts,tsx}"],
  plugins: {
    "expo": expo,
    "react-native": fixupPluginRules(reactNative),
  },
  rules: {
    "e18e/prefer-url-canparse": "off",
    "expo/no-dynamic-env-var": "error",
    "expo/no-env-var-destructuring": "error",
    "expo/prefer-box-shadow": "error",
    "expo/use-dom-exports": "error",
    "react-native/no-inline-styles": "error",
    "react-native/no-raw-text": "error",
    "react-native/no-single-element-style-arrays": "error",
    "react-native/no-unused-styles": "error",
    "react-native/split-platform-components": "error",
  },
})
