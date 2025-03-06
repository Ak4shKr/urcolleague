import { createTransport } from "nodemailer";
import {
  BREVO_SMTP_KEY,
  BREVO_SMTP_PORT,
  BREVO_SMTP_SERVER,
  BREVO_USER,
} from "../constants/env/env";

export const transporter = createTransport({
  host: BREVO_SMTP_SERVER,
  port: Number(BREVO_SMTP_PORT),
  secure: false,
  auth: {
    user: BREVO_USER,
    pass: BREVO_SMTP_KEY,
  },
});

export const sendMail = async (to: string, subject: string, html: string) => {
  try {
    const res = await transporter.sendMail({
      from: "Akash",
      to: to,
      subject: subject,
      html: html,
    });
    console.log(`Message sent: ${res.messageId}`);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to send email");
  }
};
