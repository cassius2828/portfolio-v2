"use client";

import { useState, useCallback, useRef, useEffect } from "react";

interface CopyLinkButtonProps {
  text: string;
  className?: string;
  variant?: "outline" | "solid";
  label?: string;
}

export function CopyLinkButton({
  text,
  className,
  variant = "outline",
  label = "Copy Link",
}: CopyLinkButtonProps) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      timerRef.current = setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  }, [text]);

  const baseClass =
    variant === "solid"
      ? copied
        ? "bg-green-500 text-white"
        : "bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)]"
      : "border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]";

  return (
    <button
      onClick={handleCopy}
      aria-label={copied ? "Copied" : label}
      className={`flex items-center gap-2 rounded-lg px-6 py-3 transition-all ${baseClass} ${className ?? ""}`}
    >
      {copied ? (
        <>
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          {variant === "solid" ? "Copied!" : "Link Copied!"}
        </>
      ) : (
        <>
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
            />
          </svg>
          {label}
        </>
      )}
    </button>
  );
}
