import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  adminProcedure,
} from "~/server/api/trpc";

export const blogRouter = createTRPCRouter({
  // Get all blogs
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.blog.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });
  }),

  // Get blog by ID
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const blog = await ctx.db.blog.findUnique({
        where: { id: input.id },
        include: {
          owner: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
      });

      if (!blog) {
        return null;
      }

      return blog;
    }),

  // Get adjacent blogs for navigation
  getAdjacent: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const currentBlog = await ctx.db.blog.findUnique({
        where: { id: input.id },
        select: { createdAt: true },
      });

      if (!currentBlog) {
        return { prev: null, next: null };
      }

      const [prev, next] = await Promise.all([
        ctx.db.blog.findFirst({
          where: { createdAt: { lt: currentBlog.createdAt } },
          orderBy: { createdAt: "desc" },
          select: { id: true, title: true },
        }),
        ctx.db.blog.findFirst({
          where: { createdAt: { gt: currentBlog.createdAt } },
          orderBy: { createdAt: "asc" },
          select: { id: true, title: true },
        }),
      ]);

      return { prev, next };
    }),

  // Create blog (admin only)
  create: adminProcedure
    .input(
      z.object({
        title: z.string().min(1),
        content: z.string().min(1),
        img: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.blog.create({
        data: {
          title: input.title,
          content: input.content,
          img: input.img,
          ownerId: ctx.session.user.id,
        },
      });
    }),

  // Update blog (admin only)
  update: adminProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().min(1).optional(),
        content: z.string().min(1).optional(),
        img: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return ctx.db.blog.update({
        where: { id },
        data,
      });
    }),

  // Delete blog (admin only)
  delete: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.blog.delete({
        where: { id: input.id },
      });
    }),
});

