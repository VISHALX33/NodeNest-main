/**
 * Safe seeder: ADDS only users needed to reach TARGET_TOTAL.
 * Never deletes or updates existing users.
 * Genders are mixed randomly (interleaved), roughly 50/50.
 *
 * Run from backend folder:
 *   node scripts/seedExtraUsers.js
 */
import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

dotenv.config();

const TARGET_TOTAL = 407;

const maleFirst = [
  "Aarav", "Vivaan", "Aditya", "Vihaan", "Arjun", "Sai", "Reyansh", "Ayaan", "Krishna", "Ishaan",
  "Shaurya", "Atharv", "Advik", "Kabir", "Dhruv", "Rudra", "Kartik", "Yash", "Rohan", "Kunal",
  "Harsh", "Nikhil", "Pranav", "Siddharth", "Aryan", "Dev", "Om", "Laksh", "Veer", "Aniket",
  "Manav", "Tanish", "Raghav",
];

const femaleFirst = [
  "Aadhya", "Ananya", "Aarohi", "Diya", "Ira", "Myra", "Sara", "Anvi", "Pari", "Kiara",
  "Saanvi", "Avni", "Ishita", "Navya", "Riya", "Sneha", "Pooja", "Neha", "Priya", "Kriti",
  "Meera", "Tanvi", "Shreya", "Isha", "Kavya", "Nisha", "Aditi", "Khushi", "Jiya", "Anushka",
  "Simran", "Pallavi",
];

const lastNames = [
  "Sharma", "Verma", "Gupta", "Singh", "Yadav", "Patel", "Meena", "Jain", "Agarwal", "Chopra",
  "Malhotra", "Kapoor", "Joshi", "Nair", "Iyer", "Reddy", "Rao", "Das", "Banerjee", "Choudhary",
  "Rathore", "Chauhan", "Thakur", "Mishra", "Pandey", "Saxena", "Bansal", "Tiwari", "Kulkarni", "Deshmukh",
];

function pick(arr, i) {
  return arr[i % arr.length];
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Mixed gender sequence: equal-ish Male/Female, shuffled so it's M/F/M/M/F... not all males first */
function buildMixedGenders(n) {
  const male = Math.ceil(n / 2);
  const female = n - male;
  return shuffle([...Array(male).fill("Male"), ...Array(female).fill("Female")]);
}

function makeEmail(first, last, i, used) {
  const f = first.toLowerCase();
  const l = last.toLowerCase();
  const year = 98 + (i % 8);
  const n = 10 + (i % 89);
  const candidates = [
    `${f}.${l}${n}@gmail.com`,
    `${f}${l}.${year}@gmail.com`,
    `${f}_${l}${n}@gmail.com`,
    `${f}.${l}.rtu@gmail.com`,
    `${f}${n}.${l}@gmail.com`,
    `${f}.${l}${year}@gmail.com`,
  ];
  for (const e of candidates) {
    if (!used.has(e)) return e;
  }
  return `${f}.${l}.ns${Date.now().toString().slice(-4)}${i}@gmail.com`;
}

function makePhone(i) {
  const prefixes = [
    "98", "97", "96", "95", "94", "93", "91", "90", "89", "88", "87", "86", "85",
    "84", "83", "82", "81", "80", "79", "78", "77", "76", "75", "74", "70",
  ];
  const p = prefixes[i % prefixes.length];
  const mid = String(100000 + ((i * 7919) % 900000)).slice(0, 6);
  const last = String(10 + (i % 89)).padStart(2, "0");
  return `${p}${mid}${last}`.slice(0, 10);
}

async function main() {
  await mongoose.connect(process.env.MONGO_URI);

  const before = await User.countDocuments();
  console.log(`Existing users (will keep all): ${before}`);

  const need = Math.max(0, TARGET_TOTAL - before);
  if (need === 0) {
    console.log(`Already at/above ${TARGET_TOTAL}. No users added.`);
    await mongoose.disconnect();
    return;
  }

  console.log(`Will ADD ${need} new users only (mixed genders, no deletes).`);

  const existingEmails = new Set(
    (await User.find({}, { email: 1 }).lean()).map((u) => u.email.toLowerCase())
  );

  const hashedPassword = await bcrypt.hash("NoteSea@2026", 10);
  const genderOrder = buildMixedGenders(need);

  let created = 0;
  let skipped = 0;
  let maleIdx = 0;
  let femaleIdx = 0;

  for (let i = 0; i < need; i++) {
    const gender = genderOrder[i];
    const first =
      gender === "Male"
        ? pick(maleFirst, maleIdx++ + 7)
        : pick(femaleFirst, femaleIdx++ + 5);
    const last = pick(lastNames, i * 3 + 11);
    const email = makeEmail(first, last, i, existingEmails);

    if (existingEmails.has(email)) {
      skipped++;
      continue;
    }
    existingEmails.add(email);

    try {
      await User.create({
        name: `${first} ${last}`,
        email,
        phone: makePhone(i + 17),
        password: hashedPassword,
        collegeStudent: i % 3 !== 0,
        gender,
        isVerified: i % 4 !== 0,
      });
      created++;
    } catch (err) {
      console.warn(`Skip ${email}:`, err.message);
      skipped++;
    }
  }

  const after = await User.countDocuments();
  console.log("-----");
  console.log(`Created: ${created} (gender order mixed/random)`);
  console.log(`Skipped: ${skipped}`);
  console.log(`Before:  ${before}`);
  console.log(`After:   ${after}`);
  console.log(`Sample gender sequence: ${genderOrder.slice(0, 12).join(", ")}...`);
  console.log(`Default password for seeded users: NoteSea@2026`);

  await mongoose.disconnect();
}

main().catch(async (e) => {
  console.error(e);
  try {
    await mongoose.disconnect();
  } catch {}
  process.exit(1);
});
