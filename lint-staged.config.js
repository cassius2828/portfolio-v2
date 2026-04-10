export default {
  "*.{ts,tsx}": [
    "eslint --no-warn-ignored --max-warnings 0",
    "prettier --write",
  ],
  "*.{js,jsx,mdx,json,md,css,scss}": ["prettier --write"],
};
