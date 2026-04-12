/**
 * Backfill: sets archived = false on every project that doesn't already
 * have archived = true.  MongoDB doesn't auto-populate @default values
 * on existing documents, so Prisma sees the missing field as null and
 * `where: { archived: false }` skips them.
 *
 * Run:  npx tsx scripts/backfill-archived.ts
 */
import { PrismaClient } from "../generated/prisma";
import { loadMongoUri } from "./lib/env";

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
