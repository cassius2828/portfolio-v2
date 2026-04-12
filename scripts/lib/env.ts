import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

/** Parse .env file and return all key-value pairs. */
export function parseDotEnv(): Record<string, string> {
  const out: Record<string, string> = {};
  const envPath = resolve(process.cwd(), ".env");
  if (!existsSync(envPath)) return out;

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
    out[key] = val;
  }
  return out;
}

/** Load MONGODB_URI from .env or process.env — throws if missing. */
export function loadMongoUri(): string {
  const env = parseDotEnv();
  const uri = env.MONGODB_URI ?? process.env.MONGODB_URI;
  if (!uri)
    throw new Error(
      "MONGODB_URI not found. Set it in .env or the environment.",
    );
  return uri;
}
