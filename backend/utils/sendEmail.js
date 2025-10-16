import { Resend } from "resend";
import dotenv from "dotenv";

// ✅ Load .env variables early
dotenv.config();

// Debug log (you can remove later)
console.log("🔑 RESEND_API_KEY loaded:", !!process.env.RESEND_API_KEY);

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Send an email using Resend API
 * @param {string} to - Receiver email address
 * @param {string} subject - Email subject
 * @param {string} html - HTML body of the email
 */
export const sendEmail = async (to, subject, html) => {
  try {
    const response = await resend.emails.send({
      from: process.env.EMAIL_FROM || "NoteSea <onboarding@resend.dev>",
      to,
      subject,
      html,
    });

    if (response?.id) {
      console.log("✅ Email sent successfully:", response.id);
    } else {
      console.log("✅ Email sent (no ID returned):", response);
    }

    return true;
  } catch (error) {
    console.error("❌ Email sending failed:", error);
    return false;
  }
};
