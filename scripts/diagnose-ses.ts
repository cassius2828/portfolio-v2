/**
 * Read-only SES checks: quota + verification status for SES_FROM_EMAIL / domain.
 * Does not send mail. Run: npx tsx scripts/diagnose-ses.ts
 */
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import {
  SESClient,
  GetSendQuotaCommand,
  GetIdentityVerificationAttributesCommand,
} from "@aws-sdk/client-ses";

function loadEnv(): Record<string, string> {
  const out: Record<string, string> = {};
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
      out[key] = val;
    }
  }
  return out;
}

async function main() {
  const env = loadEnv();
  const region = env.AWS_REGION;
  const accessKeyId = env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = env.AWS_SECRET_ACCESS_KEY;
  const from = env.SES_FROM_EMAIL;
  const admin = env.ADMIN_EMAIL;

  if (!region || !accessKeyId || !secretAccessKey) {
    console.error(
      "Missing AWS_REGION, AWS_ACCESS_KEY_ID, or AWS_SECRET_ACCESS_KEY in .env",
    );
    process.exit(1);
  }

  const client = new SESClient({
    region,
    credentials: { accessKeyId, secretAccessKey },
  });

  console.log("Region:", region);
  console.log("SES_FROM_EMAIL:", from ?? "(unset)");
  console.log("ADMIN_EMAIL:", admin ?? "(unset)");
  console.log("");

  try {
    const quota = await client.send(new GetSendQuotaCommand({}));
    console.log("Send quota (last 24h):", {
      Max24HourSend: quota.Max24HourSend,
      SentLast24Hours: quota.SentLast24Hours,
      MaxSendRate: quota.MaxSendRate,
    });
  } catch (e) {
    console.error("GetSendQuota failed (wrong region or bad credentials?):", e);
    process.exit(1);
  }

  if (!from) {
    console.log("\nSet SES_FROM_EMAIL to diagnose identity verification.");
    process.exit(0);
  }

  const at = from.indexOf("@");
  const domain = at === -1 ? "" : from.slice(at + 1);
  const identities = [from, domain].filter(Boolean);

  try {
    const ver = await client.send(
      new GetIdentityVerificationAttributesCommand({
        Identities: identities,
      }),
    );
    console.log("\nIdentity verification in this region:");
    for (const id of identities) {
      const attr = ver.VerificationAttributes?.[id];
      console.log(
        `  ${id}:`,
        attr?.VerificationStatus ??
          "NOT_FOUND (add/verify this identity in SES for this region)",
      );
    }
  } catch (e) {
    console.error("GetIdentityVerificationAttributes failed:", e);
  }

  console.log(
    "\nSandbox: destination addresses must be verified unless the account is in production.",
  );
  console.log(
    "If From shows NOT_FOUND, verify the domain or address in SES (same region as AWS_REGION).",
  );
  console.log(
    "DNS for cassiusreynolds.com vs .dev: the From address domain must match what you verified in SES.",
  );
}

main().catch((e: unknown) => {
  console.error(e);
  process.exit(1);
});
