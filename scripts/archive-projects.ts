/**
 * Marks portfolio projects as archived by matching title (case-insensitive).
 * Run from repo root: npx tsx scripts/archive-projects.ts
 * Requires MONGODB_URI in .env or environment.
 */
import { PrismaClient } from "../generated/prisma";
import { loadMongoUri } from "./lib/env";

/** Matches: Apex Solar, Max Protection Moving, Hawk Surf (or "suft"), Pet Paradise, Cat Collector, Natours */
const TITLE_PATTERNS: RegExp[] = [
  /apex\s*solar/i,
  /max\s*protection\s*moving/i,
  /hawk\s*su?rf/i,
  /pet\s*paradise/i,
  /cat\s*collector/i,
  /natours/i,
];

async function main() {
  const uri = loadMongoUri();
  const prisma = new PrismaClient({
    datasources: { db: { url: uri } },
  });

  const projects = await prisma.project.findMany();
  let updated = 0;

  for (const p of projects) {
    const match = TITLE_PATTERNS.some((re) => re.test(p.title));
    if (!match) continue;
    await prisma.project.update({
      where: { id: p.id },
      data: { archived: true },
    });
    console.log(`Archived: "${p.title}" (${p.id})`);
    updated += 1;
  }

  if (updated === 0) {
    console.log(
      "No matching projects found. Titles in DB:",
      projects.map((x) => x.title).join(" | ") || "(none)",
    );
  } else {
    console.log(`Done. ${String(updated)} project(s) marked archived.`);
  }

  await prisma.$disconnect();
}

main().catch((e: unknown) => {
  console.error(e);
  process.exit(1);
});
