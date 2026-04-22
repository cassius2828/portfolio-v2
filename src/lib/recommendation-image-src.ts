/**
 * Recommendation avatar `img` values in `content.ts` are S3 object keys under the portfolio
 * bucket (same pattern as community impact). Absolute URLs still pass through for one-off
 * external assets.
 *
 * Uses `NEXT_PUBLIC_CLOUDFRONT_URL` when set (mirrors `portfolio-public-url.ts`); otherwise the
 * bucket virtual-hosted URL.
 */
const PORTFOLIO_S3_OBJECT_ORIGIN =
  "https://5-06-sei.s3.us-west-1.amazonaws.com";

export function recommendationImageSrc(img: string): string {
  const trimmed = img.trim();
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  const cdn = process.env.NEXT_PUBLIC_CLOUDFRONT_URL?.replace(/\/$/, "");
  if (cdn) return `${cdn}/${trimmed}`;
  return `${PORTFOLIO_S3_OBJECT_ORIGIN}/${trimmed}`;
}
