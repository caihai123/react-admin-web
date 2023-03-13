module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["react-app", "react-app/jest", "eslint:recommended"],
  parserOptions: {
    ecmaVersion: 2020,
  },
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error",
    "no-console": process.env.NODE_ENV === "production" ? "error" : "warn",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "warn",
  },
};
