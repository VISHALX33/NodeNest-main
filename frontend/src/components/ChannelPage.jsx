import React, { useState } from "react";
import { FaYoutube, FaCopy, FaCheck } from "react-icons/fa";
import bannerImage from "../assets/banner.png";
import vishalp from "../assets/Vishalp.jpg";

export default function ChannelPage() {
  const [copied, setCopied] = useState(false);

  const channelData = {
    name: "Vishal Prajapati",
    handle: "@Vishalprajapati-q7l",
    description:
      "Full-stack development tutorials, real projects, and coding tips. Learn by building and grow as a developer.",
    profileImage: vishalp,
    youtubeChannelUrl: "https://www.youtube.com/@Vishalprajapati-q7l",
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(channelData.handle);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-lg overflow-hidden">
        
        {/* Banner */}
        <img
          src={bannerImage}
          alt="Banner"
          className="w-full h-40 object-cover"
        />

        {/* Profile Section */}
        <div className="flex flex-col items-center text-center px-6 pb-8 -mt-16">
          
          {/* Profile Image */}
          <img
            src={channelData.profileImage}
            alt={channelData.name}
            className="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover"
          />

          {/* Channel Name */}
          <h1 className="mt-4 text-3xl font-extrabold text-emerald-600">
            {channelData.name}
          </h1>

          {/* Handle + Copy */}
          <div className="flex items-center gap-2 mt-2">
            <p className="text-gray-500 text-lg">{channelData.handle}</p>

            <button
              onClick={handleCopy}
              className="p-2 hover:bg-emerald-50 rounded-full transition-all"
              title="Copy YouTube handle"
            >
              {copied ? (
                <FaCheck className="text-emerald-600 text-sm" />
              ) : (
                <FaCopy className="text-gray-500 hover:text-emerald-600 text-sm" />
              )}
            </button>
          </div>

          {copied && (
            <p className="text-emerald-600 text-sm mt-1 font-medium animate-pulse">
              Copied to clipboard!
            </p>
          )}

          {/* Description */}
          <p className="mt-5 text-gray-600 max-w-xl">
            {channelData.description}
          </p>

          {/* CTA */}
          <a
            href={channelData.youtubeChannelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-full transition"
          >
            <FaYoutube className="text-xl" />
            Visit YouTube Channel
          </a>
        </div>
      </div>
    </div>
  );
}
