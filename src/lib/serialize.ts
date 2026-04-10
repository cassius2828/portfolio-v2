import type { Project, Blog, User } from "../../generated/prisma";
import type { SerializedProject, SerializedBlog } from "~/lib/types";

export type {
  SerializedProject,
  SerializedBlog,
  SerializedBlogOwner,
} from "~/lib/types";

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
