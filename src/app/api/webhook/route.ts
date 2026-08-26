import { db } from "~/server/db";
import { openai } from "~/server/openai";

export async function POST(req: Request) {
  const body = await req.text();

  const event = await openai.webhooks
    .unwrap(body, req.headers)
    .catch((error: unknown) => {
      console.error("Invalid OpenAI webhook signature:", error);
      return null;
    });

  if (!event) {
    return new Response("Invalid webhook", { status: 400 });
  }

  if (event.type !== "response.completed") {
    console.log("Ignoring OpenAI webhook event:", event.type);
    return new Response("ok", { status: 200 });
  }

  try {
    const response = await openai.responses.retrieve(event.data.id);

    await db.openAIWebhookReceipt.upsert({
      where: { slot: "latest" },
      create: {
        slot: "latest",
        eventType: event.type,
        responseId: response.id,
        outputText: response.output_text,
      },
      update: {
        receivedAt: new Date(),
        eventType: event.type,
        responseId: response.id,
        outputText: response.output_text,
      },
    });

    console.log("Stored completed OpenAI response:", response.id);

    return new Response("ok", { status: 200 });
  } catch (error) {
    console.error("Failed to process OpenAI webhook:", error);
    return new Response("Webhook processing failed", { status: 500 });
  }
}
