import mongoose from "mongoose";

const siteContentSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      enum: ["channel", "about", "how_it_works", "dashboard_popup", "career_positions"],
    },
    data: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

export default mongoose.model("SiteContent", siteContentSchema);
