/**
 * Adds the "Activity Tracker" project, uploads its hero image to S3 (portfolio/activity-tracker.png),
 * and demotes "Memory Squares" from featured. Idempotent — safe to re-run.
 *
 * Run from repo root (requires AWS creds + MONGODB_URI in .env):
 *   npx tsx scripts/add-activity-tracker.ts
 *
 * Optional flag: --image-path <path>  (defaults to the screenshot under .cursor/projects/.../assets)
 */
import { readFileSync, existsSync } from "node:fs";
import { extname } from "node:path";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { PrismaClient } from "../generated/prisma";
import { loadMongoUri, parseDotEnv } from "./lib/env";

const PROJECT_TITLE = "Activity Tracker";
const MEMORY_SQUARES_TITLE = "Memory Squares";
const IMAGE_KEY = "portfolio/activity-tracker.png";

const DEFAULT_IMAGE_PATH = String.raw`C:\Users\Cassius\.cursor\projects\c-Users-Cassius-code-personal-projects-current-lineup-legends-v2\assets\c__Users_Cassius_AppData_Roaming_Cursor_User_workspaceStorage_f3c9770237dff940cce761d2cdba0949_images_Screenshot_2026-05-12_012845-6e4b9bcd-aa65-4518-87d4-5477cfc56e2a.png`;

const PROJECT_DESCRIPTION = `<p>A learning-focused full-stack task tracker built deliberately <strong>from primitives</strong>. Where a real product would reach for a library, this project writes the moving parts by hand so the request lifecycle, auth, and data fetching stay visible end-to-end.</p>
<ul>
<li>Hand-rolled DB-backed cookie sessions with 32-byte opaque tokens stored as SHA-256 hashes in Postgres — no JWTs or Auth.js, with full issue → validate → revoke → expire control</li>
<li>Custom data fetching hooks (<code>useTasks</code>, <code>useTeam</code>, <code>useUser</code>, <code>useDebouncedSearch</code>) with explicit loading, cancellation, and stale-response guarding — no React Query, SWR, or tRPC</li>
<li><code>AbortController</code> threaded through every read service plus a single axios response interceptor for logging, 401 dispatch, and cancellation handling</li>
<li>Express 5 API with hand-rolled <code>isSignedIn</code> / <code>isAdmin</code> middleware, validation, rate limiting, helmet, and bcrypt password hashing</li>
<li>Drizzle ORM as a thin typed SQL wrapper (no DAO/repository layer), drizzle-kit migrations, and an idempotent dev seeder</li>
<li>React 19 + Vite 8 + Tailwind 4 frontend with React Router 7, lazy routes, role-based guards, and PascalCase feature folders for component organization</li>
</ul>
<p><em>Personal learning project — no live deployment. Read the source to see how things work without a library hiding the mechanics.</em></p>`;

const PROJECT_TECHNOLOGIES = [
  { name: "React", icon: null },
  { name: "TypeScript", icon: null },
  { name: "Vite", icon: null },
  { name: "Tailwind CSS", icon: null },
  { name: "Express", icon: null },
  { name: "Node.js", icon: null },
  { name: "PostgreSQL", icon: null },
  { name: "Drizzle ORM", icon: null },
  { name: "Axios", icon: null },
  { name: "REST API", icon: null },
];

function getCliFlag(name: string): string | undefined {
  const idx = process.argv.findIndex((a) => a === `--${name}`);
  return idx !== -1 ? process.argv[idx + 1] : undefined;
}

async function uploadHeroImage(): Promise<string> {
  const dot = parseDotEnv();
  const bucket =
    dot.S3_BUCKET_NAME ??
    process.env.S3_BUCKET_NAME ??
    dot.BUCKET_NAME ??
    process.env.BUCKET_NAME;
  const region = dot.AWS_REGION ?? process.env.AWS_REGION ?? "us-west-1";
  const accessKeyId = dot.AWS_ACCESS_KEY_ID ?? process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey =
    dot.AWS_SECRET_ACCESS_KEY ?? process.env.AWS_SECRET_ACCESS_KEY;

  if (!bucket || !accessKeyId || !secretAccessKey) {
    throw new Error(
      "Missing S3 bucket or credentials. Set S3_BUCKET_NAME (or BUCKET_NAME), AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY in .env",
    );
  }

  const imagePath = getCliFlag("image-path") ?? DEFAULT_IMAGE_PATH;
  if (!existsSync(imagePath)) {
    throw new Error(`Hero image not found at: ${imagePath}`);
  }

  const ext = extname(imagePath).toLowerCase();
  if (ext !== ".png") {
    throw new Error(
      `Expected a .png hero image (S3 key is ${IMAGE_KEY}); received ${ext || "(no extension)"}`,
    );
  }

  const body = readFileSync(imagePath);
  const client = new S3Client({
    region,
    credentials: { accessKeyId, secretAccessKey },
  });

  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: IMAGE_KEY,
      Body: body,
      ContentType: "image/png",
      CacheControl: "public, max-age=31536000, immutable",
    }),
  );

  const cdnBase = (
    dot.NEXT_PUBLIC_CLOUDFRONT_URL ??
    process.env.NEXT_PUBLIC_CLOUDFRONT_URL ??
    ""
  ).replace(/\/$/, "");
  const publicUrl = cdnBase
    ? `${cdnBase}/${IMAGE_KEY}`
    : `https://${bucket}.s3.${region}.amazonaws.com/${IMAGE_KEY}`;

  console.log(`Uploaded hero image to S3`);
  console.log(`  key: ${IMAGE_KEY}`);
  console.log(`  url: ${publicUrl}`);
  return publicUrl;
}

async function upsertProject(prisma: PrismaClient, imgUrl: string) {
  const existing = await prisma.project.findFirst({
    where: { title: PROJECT_TITLE },
  });

  const data = {
    title: PROJECT_TITLE,
    description: PROJECT_DESCRIPTION,
    prodLink: null,
    videoLink: "",
    githubLink: "https://github.com/cassius2828/activity-tracker",
    technologies: PROJECT_TECHNOLOGIES,
    featured: true,
    archived: false,
    img: imgUrl,
    year: 2026,
    priorityLevel: 3,
  };

  if (existing) {
    await prisma.project.update({ where: { id: existing.id }, data });
    console.log(
      `Updated existing project: "${PROJECT_TITLE}" (${existing.id})`,
    );
  } else {
    const created = await prisma.project.create({ data });
    console.log(`Created project: "${PROJECT_TITLE}" (${created.id})`);
  }
}

async function demoteMemorySquares(prisma: PrismaClient) {
  const memorySquares = await prisma.project.findFirst({
    where: { title: MEMORY_SQUARES_TITLE },
  });
  if (!memorySquares) {
    console.warn(`Skipped demote: "${MEMORY_SQUARES_TITLE}" not found`);
    return;
  }
  if (memorySquares.featured === false) {
    console.log(`Already demoted: "${MEMORY_SQUARES_TITLE}"`);
    return;
  }
  await prisma.project.update({
    where: { id: memorySquares.id },
    data: { featured: false, priorityLevel: 1 },
  });
  console.log(`Demoted: "${MEMORY_SQUARES_TITLE}" → featured=false`);
}

async function main() {
  const imgUrl = await uploadHeroImage();
  const uri = loadMongoUri();
  const prisma = new PrismaClient({ datasources: { db: { url: uri } } });

  try {
    await upsertProject(prisma, imgUrl);
    await demoteMemorySquares(prisma);
    console.log("Done.");
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e: unknown) => {
  console.error(e);
  process.exit(1);
});
