import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { api } from "~/trpc/server";
import { ProjectDetail } from "../../_components/projects/ProjectDetail";
import { PageShell } from "../../_components/layout/PageShell";
import { db } from "~/server/db";
import { personalInfo, socialLinks } from "~/lib/content";
import { serializeProject } from "~/lib/serialize";
import { SITE_URL } from "~/lib/constants";
import type { Project } from "../../../../generated/prisma";

interface ProjectPageProps {
  params: Promise<{ projectId: string }>;
}

export async function generateStaticParams() {
  if (process.env.SKIP_ENV_VALIDATION) return [];

  const projects = await db.project.findMany({
    select: { id: true },
  });

  return projects.map((project) => ({
    projectId: project.id,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { projectId } = await params;
  const project = await api.project.getById({ id: projectId });

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  const description = project.description.slice(0, 160);

  return {
    title: project.title,
    description,
    alternates: {
      canonical: `${SITE_URL}/projects/${projectId}`,
    },
    openGraph: {
      title: `${project.title} | ${personalInfo.name}`,
      description,
      type: "article",
      url: `${SITE_URL}/projects/${projectId}`,
      images: project.img ? [{ url: project.img }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description,
      images: project.img ? [project.img] : undefined,
    },
  };
}

// SoftwareSourceCode JSON-LD structured data for projects
function generateProjectJsonLd(project: Project) {
  // Extract programming languages from technologies
  const programmingLanguages = project.technologies
    .map((tech) => tech.name)
    .filter((name) =>
      [
        "JavaScript",
        "TypeScript",
        "Python",
        "Java",
        "Go",
        "Rust",
        "C++",
        "C#",
        "Ruby",
        "PHP",
      ].includes(name),
    );

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: project.title,
    description: project.description,
    image: project.img ?? undefined,
    codeRepository: project.githubLink,
    url: project.prodLink ?? `${SITE_URL}/projects/${project.id}`,
    author: {
      "@type": "Person",
      name: personalInfo.name,
      url: SITE_URL,
      sameAs: [socialLinks.github.url, socialLinks.linkedin.url],
    },
    programmingLanguage:
      programmingLanguages.length > 0 ? programmingLanguages : undefined,
    runtimePlatform: project.technologies
      .map((tech) => tech.name)
      .filter((name) =>
        ["Node.js", "React", "Next.js", "Django", "Express"].includes(name),
      ),
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { projectId } = await params;
  const project = await api.project.getById({ id: projectId });

  if (!project) {
    notFound();
  }

  const projectJsonLd = generateProjectJsonLd(project);

  return (
    <PageShell
      bgSlot={
        <div className="absolute top-1/4 left-1/4 h-[400px] w-[400px] rounded-full bg-[var(--color-accent)] opacity-[0.03] blur-[150px]" />
      }
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(projectJsonLd).replaceAll("</", "<\\/"),
        }}
      />

      <ProjectDetail project={serializeProject(project)} />
    </PageShell>
  );
}
