import { z } from "zod";
import nodemailer from "nodemailer";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { env } from "~/env";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
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
    if (!env.SMTP_HOST || !env.SMTP_USER || !env.SMTP_PASS || !env.ADMIN_EMAIL) {
      throw new Error("Email configuration is not set up");
    }

    const transporter = nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: parseInt(env.SMTP_PORT ?? "587"),
      secure: false,
      auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: env.SMTP_USER,
      to: env.ADMIN_EMAIL,
      subject: `Portfolio Contact: ${subject}`,
      text: `
Message from ${name}

${message}

---
Company / Affiliation: ${affiliation ?? "Not specified"}
Role/Connection: ${connection}
Email: ${email}
      `.trim(),
      html: `
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
    };

    await transporter.sendMail(mailOptions);

    return {
      success: true,
      message: "Email sent successfully",
    };
  }),
});

