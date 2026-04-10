import { serializeProject, serializeBlog } from "../serialize";

describe("serializeProject", () => {
  const mockProject = {
    id: "proj-1",
    title: "Test Project",
    description: "A test project",
    prodLink: "https://example.com",
    videoLink: "https://video.com",
    githubLink: "https://github.com/test",
    technologies: ["React", "TypeScript"],
    featured: true,
    img: "https://img.com/test.png",
    priorityLevel: 1,
    createdAt: new Date("2025-01-01"),
    updatedAt: new Date("2025-06-01"),
  };

  it("should return all expected fields", () => {
    const result = serializeProject(mockProject as any);
    expect(result).toEqual({
      id: "proj-1",
      title: "Test Project",
      description: "A test project",
      prodLink: "https://example.com",
      videoLink: "https://video.com",
      githubLink: "https://github.com/test",
      technologies: ["React", "TypeScript"],
      featured: true,
      img: "https://img.com/test.png",
      priorityLevel: 1,
    });
  });

  it("should strip Date fields (createdAt / updatedAt not in output)", () => {
    const result = serializeProject(mockProject as any);
    expect(result).not.toHaveProperty("createdAt");
    expect(result).not.toHaveProperty("updatedAt");
  });
});

describe("serializeBlog", () => {
  const now = new Date("2025-06-15T12:00:00Z");
  const earlier = new Date("2025-01-01T00:00:00Z");

  const mockBlog = {
    id: "blog-1",
    title: "Test Blog",
    content: "Blog content here",
    img: "https://img.com/blog.png",
    createdAt: earlier,
    updatedAt: now,
    ownerId: "user-1",
    owner: {
      id: "user-1",
      name: "Cassius",
      image: "https://img.com/avatar.png",
    },
  };

  it("should convert Date fields to ISO strings", () => {
    const result = serializeBlog(mockBlog as any);
    expect(result.createdAt).toBe("2025-01-01T00:00:00.000Z");
    expect(result.updatedAt).toBe("2025-06-15T12:00:00.000Z");
  });

  it("should serialize owner to id/name/image", () => {
    const result = serializeBlog(mockBlog as any);
    expect(result.owner).toEqual({
      id: "user-1",
      name: "Cassius",
      image: "https://img.com/avatar.png",
    });
  });

  it("should handle null owner", () => {
    const result = serializeBlog({ ...mockBlog, owner: null } as any);
    expect(result.owner).toBeNull();
  });

  it("should handle null img", () => {
    const result = serializeBlog({ ...mockBlog, img: null } as any);
    expect(result.img).toBeNull();
  });

  it("should return all expected keys", () => {
    const result = serializeBlog(mockBlog as any);
    expect(Object.keys(result).sort()).toEqual([
      "content",
      "createdAt",
      "id",
      "img",
      "owner",
      "title",
      "updatedAt",
    ]);
  });
});
