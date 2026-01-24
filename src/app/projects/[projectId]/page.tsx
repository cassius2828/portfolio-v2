import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { api } from "~/trpc/server";
import { ProjectDetail } from "../../_components/projects/ProjectDetail";

interface ProjectPageProps {
  params: Promise<{ projectId: string }>;
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

  return {
    title: project.title,
    description: project.description.slice(0, 160),
    openGraph: {
      title: `${project.title} | Cassius Reynolds`,
      description: project.description.slice(0, 160),
      type: "article",
      images: project.img ? [{ url: project.img }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description.slice(0, 160),
      images: project.img ? [project.img] : undefined,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { projectId } = await params;
  const project = await api.project.getById({ id: projectId });

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen pt-28">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[var(--color-bg-primary)]" />
        <div className="absolute left-1/4 top-1/4 h-[400px] w-[400px] rounded-full bg-[var(--color-accent)] opacity-[0.03] blur-[150px]" />
      </div>

      <ProjectDetail project={project} />
    </div>
  );
}

