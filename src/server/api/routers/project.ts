import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  adminProcedure,
} from "~/server/api/trpc";

const technologySchema = z.object({
  name: z.string(),
  icon: z.string().optional(),
});

export const projectRouter = createTRPCRouter({
  // Get all projects
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.project.findMany({
      orderBy: { priorityLevel: "desc" },
    });
  }),

  // Get featured projects
  getFeatured: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.project.findMany({
      where: { featured: true },
      orderBy: { priorityLevel: "desc" },
    });
  }),

  // Get regular (non-featured) projects
  getRegular: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.project.findMany({
      where: { featured: false },
      orderBy: { priorityLevel: "desc" },
    });
  }),

  // Get project by ID
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const project = await ctx.db.project.findUnique({
        where: { id: input.id },
      });

      if (!project) {
        return null;
      }

      return project;
    }),

  // Create project (admin only)
  create: adminProcedure
    .input(
      z.object({
        title: z.string().min(1),
        description: z.string().min(1),
        prodLink: z.string().url().optional().or(z.literal("")),
        videoLink: z.string().url().optional().or(z.literal("")),
        githubLink: z.string().url(),
        technologies: z.array(technologySchema),
        featured: z.boolean().default(false),
        img: z.string().optional(),
        priorityLevel: z.number().int().min(1).default(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.project.create({
        data: {
          title: input.title,
          description: input.description,
          prodLink: input.prodLink || null,
          videoLink: input.videoLink || null,
          githubLink: input.githubLink,
          technologies: input.technologies,
          featured: input.featured,
          img: input.img,
          priorityLevel: input.priorityLevel,
        },
      });
    }),

  // Update project (admin only)
  update: adminProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().min(1).optional(),
        description: z.string().min(1).optional(),
        prodLink: z.string().url().optional().or(z.literal("")),
        videoLink: z.string().url().optional().or(z.literal("")),
        githubLink: z.string().url().optional(),
        technologies: z.array(technologySchema).optional(),
        featured: z.boolean().optional(),
        img: z.string().optional(),
        priorityLevel: z.number().int().min(1).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return ctx.db.project.update({
        where: { id },
        data: {
          ...data,
          prodLink: data.prodLink || null,
          videoLink: data.videoLink || null,
        },
      });
    }),

  // Delete project (admin only)
  delete: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.project.delete({
        where: { id: input.id },
      });
    }),
});

