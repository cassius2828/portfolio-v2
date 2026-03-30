import type { Project } from "../../generated/prisma";
import type { SerializedProject } from "~/app/_components/shared/ProjectCard";

/**
 * Strips non-serializable fields (Date objects) from Prisma models
 * before passing them as props to client components, preventing
 * hydration mismatches from Date serialization inconsistencies.
 */
export function serializeProject(project: Project): SerializedProject {
  return {
    id: project.id,
    title: project.title,
    description: project.description,
    prodLink: project.prodLink,
    videoLink: project.videoLink,
    githubLink: project.githubLink,
    technologies: project.technologies,
    featured: project.featured,
    img: project.img,
    priorityLevel: project.priorityLevel,
  };
}
