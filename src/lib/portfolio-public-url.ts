import { env } from "~/env";

/** Virtual-hosted S3 origin for bucket `5-06-sei` (matches `resumeLinks` / `content.ts`). */
const S3_OBJECT_ORIGIN = "https://5-06-sei.s3.us-west-1.amazonaws.com";

/**
 * Public URL for an object key (e.g. `portfolio/community/art/art-image-1.jpg`).
 * Uses `NEXT_PUBLIC_CLOUDFRONT_URL` when set (same as `src/server/s3.ts` public URLs)—otherwise
 * the S3 virtual-hosted URL. Legacy `CLOUDFRONT_URL` / `CLOUDFRONT_PATH` are merged into
 * `NEXT_PUBLIC_CLOUDFRONT_URL` in `env.js` when the Next-named var is unset.
 */
export function portfolioObjectUrl(key: string): string {
  const cdn = env.NEXT_PUBLIC_CLOUDFRONT_URL?.replace(/\/$/, "");
  if (cdn) {
    return `${cdn}/${key}`;
  }
  return `${S3_OBJECT_ORIGIN}/${key}`;
}
