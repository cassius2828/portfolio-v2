import { setLatestWebhook } from "~/lib/webhook-store";
import { openai } from "~/server/openai";

export async function POST(req: Request) {
  const body = await req.text();

  try {
    const event = await openai.webhooks.unwrap(body, req.headers);

    if (event.type !== "response.completed") {
      console.log("Ignoring OpenAI webhook event:", event.type);
      return new Response("ok", { status: 200 });
    }

    const response = await openai.responses.retrieve(event.data.id);

    setLatestWebhook({
      receivedAt: new Date().toISOString(),
      eventType: event.type,
      responseId: response.id,
      outputText: response.output_text,
    });

    console.log("Stored completed OpenAI response:", response.id);

    return new Response("ok", { status: 200 });
  } catch (error) {
    console.error("Invalid OpenAI webhook:", error);
    return new Response("Invalid webhook", { status: 400 });
  }
}
