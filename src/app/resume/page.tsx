import { type Metadata } from "next";
import { ResumeViewer } from "../_components/resume/ResumeViewer";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "View and download Cassius Reynolds' resume. Full Stack Developer with expertise in React, Next.js, TypeScript, and Node.js.",
  openGraph: {
    title: "Resume | Cassius Reynolds",
    description:
      "View and download Cassius Reynolds' resume. Full Stack Developer with expertise in React, Next.js, TypeScript, and Node.js.",
  },
};

export default function ResumePage() {
  return (
    <div className="min-h-screen pt-28">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[var(--color-bg-primary)]" />
      </div>

      <ResumeViewer />
    </div>
  );
}

