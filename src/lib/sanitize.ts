import "server-only";
import sanitizeHtml from "sanitize-html";

/**
 * Server-safe HTML sanitizer. Strips dangerous tags/attributes while preserving
 * safe formatting markup. Use this before passing HTML content to client
 * components that render via dangerouslySetInnerHTML.
 */
export function sanitizeContent(dirty: string): string {
  return sanitizeHtml(dirty, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat([
      "img",
      "h1",
      "h2",
      "h3",
      "span",
      "pre",
      "code",
    ]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      img: ["src", "alt", "width", "height", "loading"],
      code: ["class"],
      pre: ["class"],
      span: ["class", "style"],
    },
    allowedSchemes: ["http", "https", "mailto"],
  });
}
