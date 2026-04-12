import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { buildContactNotificationHtml } from "~/lib/contact-notification-email";
import { getConnectionLabel } from "~/lib/content";
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
  message: z
    .string()
    .min(10, { error: "Message must be at least 10 characters" }),
  affiliation: z.string().optional(),
  connection: z.enum([
    "recruiter",
    "freelance client",
    "collaborative developer",
    "other",
  ]),
  website: z.string().max(0, "").optional(),
});

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 3;
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

export const contactRouter = createTRPCRouter({
  submit: publicProcedure
    .input(contactSchema)
    .mutation(async ({ ctx, input }) => {
      if (input.website) {
        return { success: true, message: "Email sent successfully" };
      }

      const clientIp =
        ctx.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
        ctx.headers.get("x-real-ip") ??
        "unknown";

      const now = Date.now();
      const entry = rateLimitMap.get(clientIp);
      if (entry && now < entry.resetAt) {
        if (entry.count >= RATE_LIMIT_MAX) {
          throw new TRPCError({
            code: "TOO_MANY_REQUESTS",
            message: "Too many messages. Please wait a minute and try again.",
          });
        }
        entry.count += 1;
      } else {
        rateLimitMap.set(clientIp, {
          count: 1,
          resetAt: now + RATE_LIMIT_WINDOW_MS,
        });
      }

      const { name, email, subject, message, affiliation, connection } = input;
      const safeSubject = subject.replace(/[\r\n]/g, " ");
      const connectionLabel = getConnectionLabel(connection);

      // Check if email configuration is available
      if (!env.SES_FROM_EMAIL || !env.ADMIN_EMAIL || !env.AWS_REGION) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Contact form is temporarily unavailable",
        });
      }

      const command = new SendEmailCommand({
        Source: env.SES_FROM_EMAIL,
        Destination: {
          ToAddresses: [env.ADMIN_EMAIL],
        },
        ReplyToAddresses: [email],
        Message: {
          Subject: {
            Data: `Web Portfolio Contact: ${safeSubject}`,
            Charset: "UTF-8",
          },
          Body: {
            Text: {
              Data: `
Message from ${name}

${message}

---
Company / Affiliation: ${affiliation ?? "Not specified"}
Role/Connection: ${connectionLabel}
Email: ${email}
            `.trim(),
              Charset: "UTF-8",
            },
            Html: {
              Data: buildContactNotificationHtml({
                name,
                email,
                subject,
                message,
                affiliation: affiliation ?? "Not specified",
                connection: connectionLabel,
              }),
              Charset: "UTF-8",
            },
          },
        },
      });

      try {
        await sesClient.send(command);
      } catch (cause: unknown) {
        const detail =
          cause instanceof Error
            ? `${cause.name}: ${cause.message}`
            : String(cause);
        console.error("[contact] SES send failed:", detail);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message:
            "Unable to send your message right now. Please try again in a few minutes, or use the email address in the Contact Information section.",
        });
      }

      return {
        success: true,
        message: "Email sent successfully",
      };
    }),
});
