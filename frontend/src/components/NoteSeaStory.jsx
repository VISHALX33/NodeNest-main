import { motion } from "framer-motion";

export default function NoteSeaStory({ videos = [] }) {
  const getYouTubeId = (url) => {
    const regExp =
      /^.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[1].length === 11 ? match[1] : null;
  };

  return (
    <div className="max-w-6xl mx-auto mt-20 px-4">
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-center text-emerald-700 mb-6"
      >
        See the Story of <span className="text-emerald-900">NoteSea</span>
      </motion.h2>

      {/* Subtitle */}
      <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
        Watch the entire journey of NoteSea — from idea to launch and beyond 🚀
      </p>

      {/* Video Grid */}
      <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
        {videos.map((video, i) => {
          const videoId = getYouTubeId(video.url);
          const thumbnail = videoId
            ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
            : null;

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative aspect-video rounded-2xl overflow-hidden shadow-lg border border-emerald-100 cursor-pointer group"
              onClick={() => window.open(video.url, "_blank")}
            >
              {thumbnail && (
                <img
                  src={thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              )}
              <div className="absolute inset-0 bg-opacity-40 flex items-center justify-center group-hover:bg-opacity-50 transition">
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    className="w-7 h-7 text-emerald-700"
                  >
                    <path d="M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l4.5-2.5a.5.5 0 0 0 0-.814l-4.5-2.5z" />
                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4z" />
                  </svg>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white p-3 text-sm font-medium">
                {video.title}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
