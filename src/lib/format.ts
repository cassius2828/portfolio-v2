/**
 * Strip HTML tags from a string, returning plain text.
 */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "");
}

type DateVariant = "long" | "short";

const DATE_OPTS: Record<DateVariant, Intl.DateTimeFormatOptions> = {
  long: { year: "numeric", month: "long", day: "numeric" },
  short: { year: "numeric", month: "short", day: "numeric" },
};

/**
 * Format an ISO date string or Date into a human-readable string.
 *
 * @param date  - ISO string or Date object
 * @param variant - "long" (January 1, 2025) or "short" (Jan 1, 2025)
 */
export function formatDate(
  date: string | Date,
  variant: DateVariant = "long",
): string {
  return new Intl.DateTimeFormat("en-US", DATE_OPTS[variant]).format(
    typeof date === "string" ? new Date(date) : date,
  );
}
