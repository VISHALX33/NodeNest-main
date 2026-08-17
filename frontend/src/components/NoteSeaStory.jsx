import { motion } from "framer-motion";
import { Play, Sparkles } from "lucide-react";

export default function NoteSeaStory({ videos = [] }) {
  const getYouTubeId = (url) => {
    const regExp = /^.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[1].length === 11 ? match[1] : null;
  };

  return (
    <div className="max-w-6xl mx-auto mt-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider mb-3">
          <Sparkles size={12} /> YouTube Series
        </span>
        <h2 className="text-3xl md:text-4xl font-black text-emerald-800 tracking-tight">
          The Story of <span className="text-emerald-600">NoteSea</span>
        </h2>
        <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
          {videos.length} episodes — from idea to launch and beyond 🚀
        </p>
      </motion.div>

      {/* Horizontal scroll on mobile, grid on desktop */}
      <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-3 lg:grid-cols-5 md:overflow-visible">
        {videos.map((video, i) => {
          const videoId = getYouTubeId(video.url);
          const thumbnail = videoId
            ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`
            : null;

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -6 }}
              className="relative flex-shrink-0 w-56 md:w-auto snap-start aspect-video rounded-2xl overflow-hidden shadow-lg border-2 border-emerald-100 cursor-pointer group"
              onClick={() => window.open(video.url, "_blank")}
            >
              {thumbnail && (
                <img
                  src={thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              )}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />

              <span className="absolute top-2 left-2 px-2 py-0.5 bg-emerald-600 text-white text-[10px] font-black rounded-md">
                EP {i + 1}
              </span>

              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.15 }}
                  className="w-12 h-12 bg-white/95 rounded-full flex items-center justify-center shadow-xl"
                >
                  <Play size={20} className="text-emerald-700 ml-0.5" fill="currentColor" />
                </motion.div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3 pt-8">
                <p className="text-white text-xs font-bold leading-snug line-clamp-2">{video.title}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center text-sm text-slate-400 mt-4"
      >
        Swipe to browse all episodes →
      </motion.p>
    </div>
  );
}
