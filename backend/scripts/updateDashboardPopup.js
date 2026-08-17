import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import SiteContent from "../models/SiteContent.js";

const POPUP_IMAGE =
  "https://res.cloudinary.com/dwq5qifuk/image/upload/v1786958161/Untitled_design_a1dweg.png";

async function main() {
  await mongoose.connect(process.env.MONGO_URI);

  const result = await SiteContent.findOneAndUpdate(
    { key: "dashboard_popup" },
    {
      $set: {
        key: "dashboard_popup",
        data: { enabled: true, imageUrl: POPUP_IMAGE, link: "" },
      },
    },
    { upsert: true, new: true }
  );

  console.log("✅ Dashboard popup updated:", result.data);
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
