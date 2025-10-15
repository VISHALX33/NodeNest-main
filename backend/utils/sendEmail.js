import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Send an email using Resend API
 * @param {string} to - Receiver email address
 * @param {string} subject - Email subject
 * @param {string} html - HTML body of the email
 */
export const sendEmail = async (to, subject, html) => {
  try {
    const data = await resend.emails.send({
      from: process.env.EMAIL_FROM || "NoteSea <onboarding@resend.dev>",
      to,
      subject,
      html,
    });
    console.log("✅ Email sent successfully:", data?.id);
    return true;
  } catch (error) {
    console.error("❌ Email sending failed:", error);
    return false;
  }
};
