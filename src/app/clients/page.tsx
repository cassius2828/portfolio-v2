import { type Metadata } from "next";
import { ClientsContent } from "../_components/clients/ClientsContent";
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
    <div className="min-h-screen pt-28">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[var(--color-bg-primary)]" />
        <div className="absolute left-1/4 top-1/3 h-96 w-96 rounded-full bg-[var(--color-accent)] opacity-5 blur-[100px]" />
        <div className="absolute bottom-1/3 right-1/4 h-96 w-96 rounded-full bg-purple-500 opacity-5 blur-[100px]" />
      </div>

      <ClientsContent />
    </div>
  );
}
