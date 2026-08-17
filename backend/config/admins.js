export const ADMIN_EMAILS = [
  "vishalprajapati2303@gmail.com",
  "harshul@notesea.xyz",
  "ceo@notesea.xyz",
];

export const isAdminEmail = (email) =>
  ADMIN_EMAILS.includes(String(email || "").toLowerCase());
