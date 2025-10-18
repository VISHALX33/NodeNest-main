import { motion } from "framer-motion";
import {
  FaBullseye,
  FaUsers,
  FaBookOpen,
  FaLaptopCode,
  FaUserGraduate,
} from "react-icons/fa";
import founderImg from "../assets/Vishalp.png";

export default function About() {
  return (
    <div className="relative font-sans overflow-hidden bg-gray-50">

      {/* Hero Section */}
      <section className="pt-32 md:pt-40 px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="flex-1 text-center md:text-left space-y-4"
        >
          <p className="text-emerald-600 font-semibold">Our Story</p>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
            About <span className="text-emerald-700">NoteSea</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-lg mx-auto md:mx-0">
            NoteSea was built with a simple goal — to make quality education and resources accessible to every student. What started as a small idea to share notes has now grown into a student-powered platform helping thousands across RTU and beyond.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1"
        >
          <img
            src="/login1.png"
            alt="About NoteSea"
            className="w-full max-w-md mx-auto rounded-3xl shadow-2xl hover:scale-105 transition-transform duration-500"
          />
        </motion.div>
      </section>

      {/* Wave divider */}
      <div className="-mt-1">
        <svg viewBox="0 0 1440 100" className="w-full h-20">
          <path
            d="M0,30 C360,70 1080,-10 1440,30 L1440,100 L0,100 Z"
            fill="#f9fafb"
            className="animate-wave-slow"
          />
        </svg>
      </div>

      {/* Mission & Vision */}
      <section className="py-20 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            What Drives Us
          </h2>
          <div className="grid md:grid-cols-2 gap-10">
            {[{
              icon: <FaBullseye className="text-emerald-600 text-2xl" />,
              title: "Our Mission",
              desc: "To empower students with high-quality academic materials and affordable projects that encourage practical learning, collaboration, and innovation."
            }, {
              icon: <FaUsers className="text-emerald-600 text-2xl" />,
              title: "Our Vision",
              desc: "To build an ocean of knowledge — a community where every student can learn, share, and succeed together without barriers."
            }].map((item, i) => (
              <motion.div key={i} whileHover={{ scale: 1.05 }} className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-lg transition-shadow hover:shadow-2xl">
                <div className="flex items-center gap-3 mb-4">
                  {item.icon}
                  <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Wave divider */}
      <div className="-mt-20">
        <svg viewBox="0 0 1440 100" className="w-full h-20">
          <path
            d="M0,30 C360,-10 1080,70 1440,30 L1440,100 L0,100 Z"
            fill="#ffffff"
            className="animate-wave-slow"
          />
        </svg>
      </div>

      {/* What We Offer */}
      <section className="py-20 bg-white relative z-10">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">
            What We Offer
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: <FaBookOpen className="text-emerald-600 text-3xl" />, title: "Free RTU Notes", desc: "Access semester-wise notes curated by top-performing students." },
              { icon: <FaLaptopCode className="text-emerald-600 text-3xl" />, title: "Affordable Projects", desc: "Learn through practical full-stack projects and codebases." },
              { icon: <FaUsers className="text-emerald-600 text-3xl" />, title: "Community Support", desc: "Join peers, discuss topics, and learn collaboratively." },
              { icon: <FaUserGraduate className="text-emerald-600 text-3xl" />, title: "AI Study Tools", desc: "Use our chatbot and smart utilities to boost productivity." }
            ].map((item, i) => (
              <motion.div key={i} whileHover={{ scale: 1.05 }} className="bg-white/70 backdrop-blur-md p-6 rounded-3xl shadow-lg hover:shadow-2xl transition">
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-emerald-100 mx-auto mb-4">{item.icon}</div>
                <h3 className="font-semibold text-gray-800 text-lg mb-2">{item.title}</h3>
                <p className="text-gray-700 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Wave divider */}
<div className="-mt-20">
  <svg viewBox="0 0 1440 150" className="w-full h-36">
    <path
      d="M0,60 C360,0 1080,120 1440,60 L1440,150 L0,150 Z"
      fill="#ffffff" // contrasting color for wave
      className="animate-wave-slow"
    />
  </svg>
</div>

<style>{`
  @keyframes wave-slow { 
    0% { transform: translateX(0); } 
    50% { transform: translateX(-20px); } 
    100% { transform: translateX(0); } 
  }
  .animate-wave-slow { 
    animation: wave-slow 15s ease-in-out infinite; 
  }
`}</style>

      {/* Founder Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="flex-1 flex justify-center">
            <img
              src={founderImg}
              alt="Founder"
              className="w-80 h-80 object-cover rounded-full shadow-2xl border-4 border-emerald-600 hover:scale-105 transition-transform duration-500"
            />
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="flex-1 space-y-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Meet Our Founder</h2>
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold text-emerald-700">Vishal Prajapati</span> — a passionate student and developer who experienced the challenges of finding reliable academic resources. His vision was simple: make knowledge accessible to everyone without barriers.
            </p>
            <p className="text-gray-700 leading-relaxed">
              From sharing class notes with friends to launching a full-fledged platform, Vishal’s journey reflects NoteSea’s core values: collaboration, accessibility, and student empowerment. Today, NoteSea stands as a growing community where learning meets technology.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-emerald-50 text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Join the Wave of Smart Learning 🌊
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Whether you want to learn, contribute, or grow — NoteSea welcomes every student ready to dive deeper into knowledge.
          </p>
          <a href="/dashboard" className="bg-emerald-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-emerald-700 transition shadow-lg hover:shadow-2xl">
            Explore Notes
          </a>
        </motion.div>
      </section>

      {/* Wave Animation */}
      <style>{`
        @keyframes wave-slow { 0% { transform: translateX(0); } 50% { transform: translateX(-15px); } 100% { transform: translateX(0); } }
        .animate-wave-slow { animation: wave-slow 12s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
