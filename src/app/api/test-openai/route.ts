import { env } from "~/env";
import { openai } from "~/server/openai";

export async function POST() {
  if (env.NODE_ENV !== "development") {
    return new Response("Not found", { status: 404 });
  }

  const response = await openai.responses.create({
    model: "gpt-5.6",
    input: "Reply with exactly: Cassius webhook test successful",
    background: true,
  });

  console.log("Started background OpenAI response:", response.id);

  return Response.json({
    id: response.id,
    status: response.status,
  });
}
