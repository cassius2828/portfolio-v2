"use client";

import { useEffect } from "react";

/** Set by `Header` when navigating from another route to `/#section-id`. */
export const PORTFOLIO_SCROLL_TO_ID_KEY = "portfolioScrollTo";

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth" });
}

const SCROLL_DELAY_MS = 80;

/**
 * After landing on `/`, scroll to a section when `Header` stored a target id, or when the URL has
 * a hash (e.g. `/#recommendations`).
 */
export function HomeAnchorScroll() {
  useEffect(() => {
    const fromStorage = sessionStorage.getItem(PORTFOLIO_SCROLL_TO_ID_KEY);
    if (fromStorage) {
      sessionStorage.removeItem(PORTFOLIO_SCROLL_TO_ID_KEY);
      const t = window.setTimeout(
        () => scrollToId(fromStorage),
        SCROLL_DELAY_MS,
      );
      return () => window.clearTimeout(t);
    }

    const hash = window.location.hash?.replace(/^#/, "");
    if (hash) {
      const t = window.setTimeout(() => scrollToId(hash), SCROLL_DELAY_MS);
      return () => window.clearTimeout(t);
    }
  }, []);

  return null;
}
