/**
 * Fetches recommendation portrait URLs and uploads them to S3:
 *   s3://<bucket>/portfolio/recommendations/<slug>.<ext>
 *
 * Run from repo root (requires AWS credentials and bucket in `.env`):
 *   npx tsx scripts/upload-recommendation-images.ts
 *
 * Env: `S3_BUCKET_NAME` or `BUCKET_NAME`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`,
 * optional `AWS_REGION` (default us-west-1). Optional `NEXT_PUBLIC_CLOUDFRONT_URL` for printed public URLs.
 *
 * Keep `SOURCE_BY_NAME` in sync with `src/lib/content.ts` names; set each recommendation `img`
 * to the printed object key (not the full URL) so the app resolves CDN vs S3 like community photos.
 */
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { recommendations } from "../src/lib/content";
import { parseDotEnv } from "./lib/env";

const PREFIX = "portfolio/recommendations";

function slugFromName(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function extFromContentType(ct: string | null): string {
  if (!ct) return "jpg";
  const c = ct.toLowerCase();
  if (c.includes("png")) return "png";
  if (c.includes("webp")) return "webp";
  if (c.includes("jpeg") || c.includes("jpg")) return "jpg";
  return "jpg";
}

/** LinkedIn (or other) URLs to mirror into S3 — keyed by display name from `content.ts`. */
const SOURCE_BY_NAME: Record<string, string> = {
  "Spencer Darr":
    "https://media.licdn.com/dms/image/v2/D5603AQHI05bN9WXtNg/profile-displayphoto-crop_800_800/B56Z0gwpKMKsAI-/0/1774371118121?e=1778716800&v=beta&t=kOmUmxXP3rOlzy9sWpnV1HOTUEH1JJ4YTqcq2rT_UD8",
  "Jamel Burgos":
    "https://media.licdn.com/dms/image/v2/C4E03AQEFxqlGYRx9Jw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1599843818434?e=1777507200&v=beta&t=EtBVELyGzfUkgGCzRBZJREFsZqSYGJTtu8HI8f8rUds",
  "Eric Popelka":
    "https://media.licdn.com/dms/image/v2/D5603AQHQAUKsZNNCrw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1685231406979?e=1778716800&v=beta&t=Pu7nsi9698TC8PmUfFAornRbrIu6Z7Oc8A7YAyry7Wg",
};

async function main() {
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
    console.error(
      "Missing S3 bucket or credentials. Set S3_BUCKET_NAME (or BUCKET_NAME), AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY in .env",
    );
    process.exit(1);
  }

  const namesInContent = new Set(recommendations.map((r) => r.name));
  for (const name of Object.keys(SOURCE_BY_NAME)) {
    if (!namesInContent.has(name)) {
      console.warn(
        `Warning: SOURCE_BY_NAME has "${name}" but no matching recommendation in content.ts`,
      );
    }
  }

  const client = new S3Client({
    region,
    credentials: { accessKeyId, secretAccessKey },
  });

  const cdnBase = (
    dot.NEXT_PUBLIC_CLOUDFRONT_URL ??
    process.env.NEXT_PUBLIC_CLOUDFRONT_URL ??
    ""
  ).replace(/\/$/, "");

  for (const [name, url] of Object.entries(SOURCE_BY_NAME)) {
    const slug = slugFromName(name);
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
      },
    });

    if (!res.ok) {
      console.error(
        `Failed to fetch ${name}: HTTP ${res.status} ${res.statusText}`,
      );
      process.exit(1);
    }

    const body = Buffer.from(await res.arrayBuffer());
    const ext = extFromContentType(res.headers.get("content-type"));
    const key = `${PREFIX}/${slug}.${ext}`;
    const contentType =
      res.headers.get("content-type")?.split(";")[0]?.trim() ?? `image/${ext}`;

    await client.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: body,
        ContentType: contentType,
        CacheControl: "public, max-age=31536000, immutable",
      }),
    );

    const publicUrl = cdnBase
      ? `${cdnBase}/${key}`
      : `https://${bucket}.s3.${region}.amazonaws.com/${key}`;

    console.log(`${name}`);
    console.log(`  key:   ${key}`);
    console.log(`  url:   ${publicUrl}\n`);
  }

  console.log(
    "In src/lib/content.ts set `img` to the object key only, e.g. `portfolio/recommendations/eric-popelka.jpg` (match the extension printed above).",
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
