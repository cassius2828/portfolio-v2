import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { api } from "~/trpc/server";
import { ProjectDetail } from "../../_components/projects/ProjectDetail";
import { db } from "~/server/db";
import { personalInfo, socialLinks } from "~/lib/content";
import type { Project } from "../../../../generated/prisma";

interface ProjectPageProps {
  params: Promise<{ projectId: string }>;
}

// Generate static params for all projects at build time
export async function generateStaticParams() {
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
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://cassiusreynolds.dev";

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
      canonical: `${baseUrl}/projects/${projectId}`,
    },
    openGraph: {
      title: `${project.title} | ${personalInfo.name}`,
      description,
      type: "article",
      url: `${baseUrl}/projects/${projectId}`,
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
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://cassiusreynolds.dev";

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
    url: project.prodLink ?? `${baseUrl}/projects/${project.id}`,
    author: {
      "@type": "Person",
      name: personalInfo.name,
      url: baseUrl,
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
    <div className="min-h-screen pt-28">
      {/* Project JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
      />

      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[var(--color-bg-primary)]" />
        <div className="absolute left-1/4 top-1/4 h-[400px] w-[400px] rounded-full bg-[var(--color-accent)] opacity-[0.03] blur-[150px]" />
      </div>

      <ProjectDetail project={project} />
    </div>
  );
}
