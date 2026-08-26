import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const webhookRouter = createTRPCRouter({
  getLatest: publicProcedure.query(async ({ ctx }) => {
    const receipt = await ctx.db.openAIWebhookReceipt.findUnique({
      where: { slot: "latest" },
    });

    if (!receipt) {
      return null;
    }

    return {
      receivedAt: receipt.receivedAt.toISOString(),
      eventType: receipt.eventType,
      responseId: receipt.responseId ?? undefined,
      outputText: receipt.outputText,
    };
  }),
});
