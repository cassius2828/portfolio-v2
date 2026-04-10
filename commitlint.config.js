export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "docs",
        "style",
        "refactor",
        "perf",
        "test",
        "build",
        "ci",
        "chore",
        "revert",
      ],
    ],
    "type-case": [2, "always", "lower-case"],
    "subject-case": [0],
    "subject-empty": [2, "never"],
    "subject-full-stop": [0],
    "header-max-length": [0],
    "body-max-line-length": [0],
  },
};
