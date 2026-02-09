import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";

let transporter: Transporter | null = null;

const getTransporter = (): Transporter => {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }
  return transporter;
};

interface SendNoteEmailParams {
  to: string;
  noteTitle: string;
  noteContent: string;
}

export const sendNoteCreatedEmail = async ({
  to,
  noteTitle,
  noteContent,
}: SendNoteEmailParams): Promise<void> => {
  try {
    const mailOptions = {
      from: `"Lead Notes App" <${process.env.SMTP_EMAIL}>`,
      to,
      subject: `New Note Created: ${noteTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">📝 New Note Created!</h2>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px;">
            <h3 style="color: #555; margin-top: 0;">${noteTitle}</h3>
            <p style="color: #666; white-space: pre-wrap;">${noteContent}</p>
          </div>
          <p style="color: #999; font-size: 12px; margin-top: 20px;">
            This email was sent from Lead Notes App.
          </p>
        </div>
      `,
    };

    await getTransporter().sendMail(mailOptions);
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error("Error sending email:", error);
    // Don't throw - email failure shouldn't break note creation
  }
};
