import { env } from "~/env";

/** Virtual-hosted S3 origin for bucket `5-06-sei` (matches `resumeLinks` / `content.ts`). */
const S3_OBJECT_ORIGIN = "https://5-06-sei.s3.us-west-1.amazonaws.com";

/**
 * Public URL for an object key (e.g. `portfolio/community/art/art-image-1.jpg`).
 * Uses `NEXT_PUBLIC_CLOUDFRONT_URL` + key when set—same pattern as `src/server/s3.ts` `publicUrl`—otherwise the S3 URL.
 */
export function portfolioObjectUrl(key: string): string {
  const cdn = env.NEXT_PUBLIC_CLOUDFRONT_URL?.replace(/\/$/, "");
  if (cdn) {
    return `${cdn}/${key}`;
  }
  return `${S3_OBJECT_ORIGIN}/${key}`;
}
