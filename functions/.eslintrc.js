module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  ignorePatterns: [
    "/lib/**/*", // Ignore compiled files
    "/node_modules/**/*",
  ],
  rules: {
    "quotes": ["error", "single"],
    "indent": ["error", 2],
    "max-len": ["error", { "code": 120 }],
    "no-unused-vars": "warn",
    "no-console": "off",
    "require-jsdoc": "off",
  },
};