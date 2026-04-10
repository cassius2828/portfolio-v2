import { type Metadata } from "next";
import { ResumeViewer } from "../_components/resume/ResumeViewer";
import { PageShell } from "../_components/layout/PageShell";
import { personalInfo } from "~/lib/content";

export const metadata: Metadata = {
  title: "Resume",
  description: `View and download ${personalInfo.name}'s resume. ${personalInfo.title} with expertise in React, Next.js, TypeScript, and Node.js.`,
  openGraph: {
    title: `Resume | ${personalInfo.name}`,
    description: `View and download ${personalInfo.name}'s resume. ${personalInfo.title} with expertise in React, Next.js, TypeScript, and Node.js.`,
  },
};

export default function ResumePage() {
  return (
    <PageShell>
      <ResumeViewer />
    </PageShell>
  );
}
