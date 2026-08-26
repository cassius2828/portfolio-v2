import { getLatestWebhook } from "~/lib/webhook-store";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const webhookRouter = createTRPCRouter({
  getLatest: publicProcedure.query(() => getLatestWebhook()),
});
