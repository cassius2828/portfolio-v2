/**
 * Backfill: sets archived = false on every project that doesn't already
 * have archived = true.  MongoDB doesn't auto-populate @default values
 * on existing documents, so Prisma sees the missing field as null and
 * `where: { archived: false }` skips them.
 *
 * Run:  npx tsx scripts/backfill-archived.ts
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

async function main() {
  const uri = loadMongoUri();
  const prisma = new PrismaClient({
    datasources: { db: { url: uri } },
  });

  const projects = await prisma.project.findMany();
  let patched = 0;

  for (const p of projects) {
    if (p.archived === true) {
      console.log(`  skip (already archived): "${p.title}"`);
      continue;
    }
    await prisma.project.update({
      where: { id: p.id },
      data: { archived: false },
    });
    console.log(`  set archived=false: "${p.title}"`);
    patched += 1;
  }

  console.log(`Done. Patched ${String(patched)} project(s).`);
  await prisma.$disconnect();
}

main().catch((e: unknown) => {
  console.error(e);
  process.exit(1);
});
