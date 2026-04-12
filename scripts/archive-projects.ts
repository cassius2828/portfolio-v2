/**
 * Marks portfolio projects as archived by matching title (case-insensitive).
 * Run from repo root: npx tsx scripts/archive-projects.ts
 * Requires MONGODB_URI in .env or environment.
 */
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { PrismaClient } from "../generated/prisma";

function loadMongoUri(): string {
  const envPath = resolve(process.cwd(), ".env");
  if (existsSync(envPath)) {
    const raw = readFileSync(envPath, "utf8");
    for (const line of raw.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      let val = trimmed.slice(eq + 1).trim();
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1);
      }
      if (key === "MONGODB_URI") return val;
    }
  }
  const fromEnv = process.env.MONGODB_URI;
  if (fromEnv) return fromEnv;
  throw new Error("MONGODB_URI not found. Set it in .env or the environment.");
}

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
