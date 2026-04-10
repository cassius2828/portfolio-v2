import { type Metadata } from "next";
import { ClientsContent } from "../_components/clients/ClientsContent";
import { PageShell } from "../_components/layout/PageShell";
import { personalInfo } from "~/lib/content";

export const metadata: Metadata = {
  title: "Clients",
  description: `Freelance web development services by ${personalInfo.name}. Custom applications, CMS, Shopify, AI-driven development, and more. Building stellar solutions in any tech stack.`,
  openGraph: {
    title: `Freelance Services | ${personalInfo.name}`,
    description: `Freelance web development services by ${personalInfo.name}. Custom applications, CMS, Shopify, AI-driven development, and more. Building stellar solutions in any tech stack.`,
  },
};

export default function ClientsPage() {
  return (
    <PageShell
      bgSlot={
        <>
          <div className="absolute top-1/3 left-1/4 h-96 w-96 rounded-full bg-[var(--color-accent)] opacity-5 blur-[100px]" />
          <div className="absolute right-1/4 bottom-1/3 h-96 w-96 rounded-full bg-purple-500 opacity-5 blur-[100px]" />
        </>
      }
    >
      <ClientsContent />
    </PageShell>
  );
}
