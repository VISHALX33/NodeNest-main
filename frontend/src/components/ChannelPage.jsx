import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Sparkles,
  Youtube,
  Copy,
  Check,
  ExternalLink,
  LayoutGrid,
  Code2,
  PlayCircle,
} from "lucide-react";
import bannerImage from "../assets/banner.png";
import vishalp from "../assets/Vishalp.jpeg";
import API from "../utils/axios";

const HIGHLIGHTS = [
  { Icon: Code2, label: "Full-stack tutorials" },
  { Icon: PlayCircle, label: "Real project demos" },
  { Icon: Youtube, label: "MERN & React builds" },
];

export default function ChannelPage() {
  const [copied, setCopied] = useState(false);
  const [channelData, setChannelData] = useState({
    name: "Vishal Prajapati",
    handle: "@Vishalprajapati-q7l",
    description:
      "Full-stack development tutorials, real projects, and coding tips. Learn by building and grow as a developer.",
    profileImage: vishalp,
    bannerImage: bannerImage,
    youtubeChannelUrl: "https://www.youtube.com/@Vishalprajapati-q7l",
  });

  useEffect(() => {
    API.get("/cms/content/channel")
      .then((res) => {
        const d = res.data || {};
        setChannelData((prev) => ({
          ...prev,
          ...d,
          profileImage: d.profileImage || prev.profileImage,
          bannerImage: d.bannerImage || prev.bannerImage,
        }));
      })
      .catch(() => {});
  }, []);

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
    <div className="relative min-h-screen bg-gradient-to-b from-emerald-50/50 via-white to-white overflow-hidden">
      <div className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 bg-emerald-200/25 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 -left-20 w-64 h-64 bg-teal-200/20 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 relative z-10">
        {/* Page intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-3 border border-emerald-200">
            <Sparkles size={12} /> Creator
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-emerald-900 tracking-tight">
            Our YouTube Channel
          </h1>
          <p className="text-gray-500 text-sm mt-2 max-w-lg mx-auto">
            Watch project walkthroughs, coding tutorials, and NoteSea feature demos.
          </p>
        </motion.div>

        {/* Channel card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white border border-emerald-100 rounded-3xl shadow-xl overflow-hidden"
        >
          {/* Banner */}
          <div className="relative h-40 sm:h-48 overflow-hidden">
            <img
              src={channelData.bannerImage}
              alt="Channel banner"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/50 via-emerald-900/10 to-transparent" />
          </div>

          <div className="px-6 sm:px-10 pb-10 -mt-16 sm:-mt-20 relative">
            {/* Avatar */}
            <div className="flex flex-col sm:flex-row sm:items-end gap-5 sm:gap-6">
              <div className="relative shrink-0 mx-auto sm:mx-0">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-4 border-white shadow-lg ring-2 ring-emerald-100">
                  <img
                    src={channelData.profileImage}
                    alt={channelData.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center shadow-md border-2 border-white">
                  <Youtube size={20} className="text-white" fill="white" />
                </div>
              </div>

              <div className="flex-1 text-center sm:text-left pt-2 sm:pb-1">
                <h2 className="text-2xl sm:text-3xl font-black text-green-300 leading-tight">
                  {channelData.name}
                </h2>

                <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
                  <p className="text-gray-500 font-semibold text-sm sm:text-base">
                    {channelData.handle}
                  </p>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="p-2 hover:bg-emerald-50 rounded-lg transition-colors border border-transparent hover:border-emerald-100"
                    title="Copy YouTube handle"
                  >
                    {copied ? (
                      <Check size={16} className="text-emerald-600" />
                    ) : (
                      <Copy size={16} className="text-gray-400 hover:text-emerald-600" />
                    )}
                  </button>
                </div>

                {copied && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-emerald-600 text-xs font-bold mt-1"
                  >
                    Copied to clipboard!
                  </motion.p>
                )}
              </div>
            </div>

            <p className="mt-6 text-gray-600 text-sm sm:text-base leading-relaxed text-center sm:text-left max-w-2xl">
              {channelData.description}
            </p>

            {/* Highlights */}
            <div className="flex flex-wrap justify-center sm:justify-start gap-3 mt-6">
              {HIGHLIGHTS.map(({ Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 px-3 py-2 bg-emerald-50 border border-emerald-100 rounded-xl text-xs font-bold text-emerald-800"
                >
                  <Icon size={14} className="text-emerald-600" />
                  {label}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <a
                href={channelData.youtubeChannelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3.5 rounded-xl transition-colors shadow-lg shadow-emerald-600/20"
              >
                <Youtube size={20} />
                Visit YouTube Channel
                <ExternalLink size={16} className="opacity-80" />
              </a>
              <Link
                to="/gallery"
                className="inline-flex items-center justify-center gap-2 flex-1 bg-white border border-emerald-200 text-emerald-800 font-bold px-6 py-3.5 rounded-xl hover:bg-emerald-50 transition-colors"
              >
                <LayoutGrid size={18} />
                View Project Gallery
              </Link>
            </div>
          </div>
        </motion.div>

        <p className="text-center text-xs text-gray-400 mt-10">
          Subscribe for new MERN project demos and NoteSea updates every week.
        </p>
      </div>
    </div>
  );
}
