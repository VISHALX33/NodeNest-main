import mongoose from "mongoose";

const galleryItemSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ["image", "youtube"], required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    url: { type: String, default: "" },
    videoId: { type: String, default: "" },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("GalleryItem", galleryItemSchema);
