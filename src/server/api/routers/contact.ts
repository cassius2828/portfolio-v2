import { z } from "zod";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { env } from "~/env";

const sesClient = new SESClient({
  region: env.AWS_REGION,
  credentials:
    env.AWS_ACCESS_KEY_ID && env.AWS_SECRET_ACCESS_KEY
      ? {
          accessKeyId: env.AWS_ACCESS_KEY_ID,
          secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
        }
      : undefined,
});

const contactSchema = z.object({
  name: z.string().min(1, { error: "Name is required" }),
  email: z.string().email({ error: "Invalid email address" }),
  subject: z.string().min(1, { error: "Subject is required" }),
  message: z.string().min(10, { error: "Message must be at least 10 characters" }),
  affiliation: z.string().optional(),
  connection: z.enum([
    "recruiter",
    "freelance client",
    "collaborative developer",
    "other",
  ]),
});

export const contactRouter = createTRPCRouter({
  // Submit contact form
  submit: publicProcedure.input(contactSchema).mutation(async ({ input }) => {
    const { name, email, subject, message, affiliation, connection } = input;

    // Check if email configuration is available
    if (!env.SES_FROM_EMAIL || !env.ADMIN_EMAIL || !env.AWS_REGION) {
      throw new Error("Email configuration is not set up");
    }

    const command = new SendEmailCommand({
      Source: env.SES_FROM_EMAIL,
      Destination: {
        ToAddresses: [env.ADMIN_EMAIL],
      },
      ReplyToAddresses: [email],
      Message: {
        Subject: {
          Data: `Portfolio Contact: ${subject}`,
          Charset: "UTF-8",
        },
        Body: {
          Text: {
            Data: `
Message from ${name}

${message}

---
Company / Affiliation: ${affiliation ?? "Not specified"}
Role/Connection: ${connection}
Email: ${email}
            `.trim(),
            Charset: "UTF-8",
          },
          Html: {
            Data: `
<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #333;">New Portfolio Contact</h2>
  <p><strong>From:</strong> ${name}</p>
  <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
  <p><strong>Subject:</strong> ${subject}</p>
  <p><strong>Company/Affiliation:</strong> ${affiliation ?? "Not specified"}</p>
  <p><strong>Role:</strong> ${connection}</p>
  <hr style="border: 1px solid #eee; margin: 20px 0;" />
  <div style="background: #f9f9f9; padding: 20px; border-radius: 8px;">
    <p style="white-space: pre-wrap;">${message}</p>
  </div>
</div>
            `.trim(),
            Charset: "UTF-8",
          },
        },
      },
    });

    await sesClient.send(command);

    return {
      success: true,
      message: "Email sent successfully",
    };
  }),
});
