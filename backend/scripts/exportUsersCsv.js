import dotenv from "dotenv";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";

dotenv.config();

function csvEscape(v) {
  if (v === null || v === undefined) return "";
  const s = String(v);
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

await mongoose.connect(process.env.MONGO_URI);

const users = await mongoose.connection
  .collection("users")
  .find(
    {},
    {
      projection: {
        password: 0,
        emailOtp: 0,
        emailOtpExpires: 0,
        resetPasswordToken: 0,
        resetPasswordExpires: 0,
        __v: 0,
      },
    }
  )
  .sort({ createdAt: 1 })
  .toArray();

const headers = [
  "_id",
  "user_uni_id",
  "name",
  "email",
  "phone",
  "gender",
  "collegeStudent",
  "isVerified",
  "createdAt",
  "updatedAt",
];

const lines = [headers.join(",")];

for (const u of users) {
  lines.push(
    headers
      .map((h) => {
        let val = u[h];
        if (val instanceof Date) val = val.toISOString();
        else if (typeof val === "boolean") val = val ? "true" : "false";
        else if (val && typeof val === "object") val = String(val);
        return csvEscape(val ?? "");
      })
      .join(",")
  );
}

const outPath = path.join(process.cwd(), "..", "NoteSea_Users_Export.csv");
fs.writeFileSync(outPath, "\uFEFF" + lines.join("\n"), "utf8"); // BOM for Excel

console.log(`Exported ${users.length} users`);
console.log(`File: ${outPath}`);

await mongoose.disconnect();
