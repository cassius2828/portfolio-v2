# Portfolio v2

Personal portfolio built with the T3 Stack — Next.js 15, TypeScript, tRPC, Prisma (MongoDB), Tailwind CSS, and NextAuth.

## Getting Started

```bash
# Install dependencies
npm install

# Copy environment variables and fill in values
cp .env.example .env

# Generate Prisma client
npx prisma generate

# Start dev server
npm run dev
```

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **API:** tRPC
- **Database:** MongoDB via Prisma
- **Auth:** NextAuth.js (GitHub provider)
- **Storage:** AWS S3 + CloudFront CDN
- **Email:** AWS SES (contact form)
- **Testing:** Jest (unit), Playwright (e2e)
- **CI/CD:** GitHub Actions, Husky + lint-staged + Commitlint

## Scripts

| Command                | Description                     |
| ---------------------- | ------------------------------- |
| `npm run dev`          | Start dev server with Turbopack |
| `npm run build`        | Production build                |
| `npm test`             | Run unit tests                  |
| `npm run test:e2e`     | Run Playwright e2e tests        |
| `npm run lint`         | Lint with ESLint                |
| `npm run typecheck`    | Type-check with TypeScript      |
| `npm run format:check` | Check formatting with Prettier  |

## Environment Variables

See `.env.example` for the full list. Required variables:

- `AUTH_SECRET` — NextAuth secret (required in production)
- `AUTH_GITHUB_ID` / `AUTH_GITHUB_SECRET` — GitHub OAuth credentials
- `MONGODB_URI` — MongoDB connection string
