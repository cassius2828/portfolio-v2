import { type Metadata } from "next";
import { CommunityImpactContent } from "../_components/community/CommunityImpactContent";
import { personalInfo } from "~/lib/content";
import { COMMUNITY_IMPACT_SECTION_DEFS } from "~/lib/community-impact-data";
import { portfolioObjectUrl } from "~/lib/portfolio-public-url";

export const metadata: Metadata = {
  title: "Community Impact",
  description: `Community work by ${personalInfo.name}: Coaching, Youth Mentorship, and Community Art.`,
  openGraph: {
    title: `Community Impact | ${personalInfo.name}`,
    description: `Coaching, Youth Center Mentorships, and Community Art Contributions.`,
  },
};

export default function CommunityImpactPage() {
  const sections = COMMUNITY_IMPACT_SECTION_DEFS.map((section) => ({
    id: section.id,
    title: section.title,
    description: section.description,
    photos: section.photoDefs.map(({ key, alt }) => ({
      src: portfolioObjectUrl(key),
      alt,
    })),
  }));

  return (
    <div className="min-h-screen pt-28">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[var(--color-bg-primary)]" />
        <div className="absolute left-1/4 top-1/3 h-96 w-96 rounded-full bg-[var(--color-accent)] opacity-5 blur-[100px]" />
        <div className="absolute bottom-1/3 right-1/4 h-96 w-96 rounded-full bg-purple-500 opacity-5 blur-[100px]" />
      </div>

      <CommunityImpactContent sections={sections} />
    </div>
  );
}
