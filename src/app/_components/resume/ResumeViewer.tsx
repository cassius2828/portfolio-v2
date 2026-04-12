"use client";

import { useRouter } from "next/navigation";
import { useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "../shared/SectionHeading";
import { ResumeDocument } from "./ResumeDocument";

export function ResumeViewer() {
  const router = useRouter();
  const resumeRef = useRef<HTMLDivElement>(null);

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-5xl px-6 pb-24 print:pb-0"
    >
      {/* Screen-only heading & actions */}
      <div className="print:hidden">
        <SectionHeading
          as="h1"
          title="My Resume"
          className="mb-8 text-center"
        />
      </div>

      {/* Resume preview — capped at viewport height; long content scrolls inside */}
      <div
        ref={resumeRef}
        className="mx-auto mb-8 max-h-[100dvh] max-w-[8.5in] overflow-x-hidden overflow-y-auto rounded-lg shadow-2xl print:mb-0 print:max-h-none print:max-w-none print:overflow-visible print:rounded-none print:shadow-none"
      >
        <ResumeDocument />
      </div>

      {/* Screen-only action buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4 print:hidden">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-tertiary)] px-6 py-3 font-medium text-[var(--color-text-secondary)] transition-all hover:border-[var(--color-border-hover)] hover:text-[var(--color-text-primary)]"
        >
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
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back
        </button>

        <button
          onClick={handlePrint}
          className="flex items-center gap-2 rounded-lg bg-[var(--color-accent)] px-6 py-3 font-medium text-[var(--color-bg-primary)] transition-all hover:bg-[var(--color-accent-hover)]"
        >
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
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          Export PDF
        </button>
      </div>
    </motion.div>
  );
}
