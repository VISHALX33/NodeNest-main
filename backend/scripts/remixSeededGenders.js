/**
 * Fix the 65 newest (seeded) users:
 * - Mix genders randomly (~50/50)
 * - Match Indian first names to gender
 * Does NOT delete anyone. Older 342 users untouched.
 *
 * Run: node scripts/remixSeededGenders.js
 */
import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "../models/User.js";

dotenv.config();

const SEEDED_COUNT = 65;

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

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildMixedGenders(n) {
  const male = Math.ceil(n / 2);
  const female = n - male;
  return shuffle([...Array(male).fill("Male"), ...Array(female).fill("Female")]);
}

await mongoose.connect(process.env.MONGO_URI);

const newest = await User.find({})
  .sort({ createdAt: -1 })
  .limit(SEEDED_COUNT)
  .select("_id name gender email");

const genders = buildMixedGenders(newest.length);
let maleIdx = 0;
let femaleIdx = 0;
let male = 0;
let female = 0;

for (let i = 0; i < newest.length; i++) {
  const gender = genders[i];
  const parts = (newest[i].name || "").trim().split(/\s+/);
  const last = parts.length > 1 ? parts.slice(1).join(" ") : "Sharma";
  const first =
    gender === "Male"
      ? maleFirst[maleIdx++ % maleFirst.length]
      : femaleFirst[femaleIdx++ % femaleFirst.length];

  if (gender === "Male") male++;
  else female++;

  await User.updateOne(
    { _id: newest[i]._id },
    { $set: { gender, name: `${first} ${last}` } }
  );
}

console.log(`Remixed ${newest.length} newest users (names + gender).`);
console.log(`Male: ${male}, Female: ${female}`);
console.log("Sample mixed order:");
const check = await User.find({})
  .sort({ createdAt: -1 })
  .limit(15)
  .select("name gender");
check.forEach((u) => console.log(`  ${u.gender.padEnd(6)}  ${u.name}`));
console.log("Older users unchanged. Total users still 407.");

await mongoose.disconnect();
