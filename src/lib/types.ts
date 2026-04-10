export interface SerializedProject {
  id: string;
  title: string;
  description: string;
  prodLink: string | null;
  videoLink: string | null;
  githubLink: string;
  technologies: { name: string; icon?: string | null }[];
  featured: boolean | null;
  img: string | null;
  priorityLevel: number;
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
