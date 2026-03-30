import type { Project, Blog, User } from "../../generated/prisma";
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

export interface SerializedBlogOwner {
  id: string;
  name: string | null;
  image: string | null;
}

export interface SerializedBlog {
  id: string;
  title: string;
  content: string;
  img: string | null;
  createdAt: string;
  updatedAt: string;
  owner: SerializedBlogOwner | null;
}

type BlogWithOwner = Blog & {
  owner: Pick<User, "id" | "name" | "image"> | null;
};

export function serializeBlog(blog: BlogWithOwner): SerializedBlog {
  return {
    id: blog.id,
    title: blog.title,
    content: blog.content,
    img: blog.img,
    createdAt: blog.createdAt.toISOString(),
    updatedAt: blog.updatedAt.toISOString(),
    owner: blog.owner
      ? { id: blog.owner.id, name: blog.owner.name, image: blog.owner.image }
      : null,
  };
}
