/**
 * Sets `year` on each project document. Defaults to 2024 except known titles.
 * Run after `npx prisma db push`:  npx tsx scripts/backfill-project-years.ts
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
  throw new Error("MONGODB_URI not found.");
}

/**
 * Project year by title. Keys must match MongoDB `title` (aliases cover common variants).
 * Lineup Legends 2026, Libris List 2025, Athlete 2 Athlete 2025, Place of Grace 2023; other projects 2024.
 */
const YEAR_BY_TITLE: Record<string, number> = {
  "Lineup Legends": 2026,
  LibrisList: 2025,
  "Libris List": 2025,
  "Athlete 2 Athlete": 2025,
  "Place of Grace Inc": 2023,
  "Place of Grace": 2023,
  "Internal War": 2023,
};

const DEFAULT_YEAR = 2024;

async function main() {
  const uri = loadMongoUri();
  const prisma = new PrismaClient({
    datasources: { db: { url: uri } },
  });

  const projects = await prisma.project.findMany();
  let updated = 0;

  for (const p of projects) {
    const year = YEAR_BY_TITLE[p.title] ?? DEFAULT_YEAR;
    if (p.year === year) continue;
    await prisma.project.update({
      where: { id: p.id },
      data: { year },
    });
    console.log(`Updated "${p.title}" → ${String(year)}`);
    updated += 1;
  }

  console.log(`Done. ${String(updated)} project(s) updated.`);
  await prisma.$disconnect();
}

main().catch((e: unknown) => {
  console.error(e);
  process.exit(1);
});
