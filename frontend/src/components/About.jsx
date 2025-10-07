import { motion } from "framer-motion";
import {
  FaBullseye,
  FaUsers,
  FaBookOpen,
  FaLaptopCode,
  FaUserGraduate,
} from "react-icons/fa";
import founderImg from "../assets/vishalp.png"; // 💡 Replace with your founder image path

export default function About() {
  return (
    <div className="font-sans">
      {/* 🌟 Hero Section */}
      <section className="pt-32 md:pt-40 px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 text-center md:text-left"
        >
          <p className="text-emerald-600 font-semibold">Our Story</p>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
            About <span className="text-emerald-700">NoteSea</span>
          </h1>
          <p className="mt-4 text-gray-600 text-lg max-w-lg">
            NoteSea was built with a simple goal — to make quality education and
            resources accessible to every student. What started as a small idea
            to share notes has now grown into a student-powered platform helping
            thousands across RTU and beyond.
          </p>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="flex-1"
        >
          <img
            src="/login1.png"
            alt="About NoteSea"
            className="w-full max-w-md mx-auto rounded-2xl shadow-lg"
          />
        </motion.div>
      </section>

      {/* 🌟 Mission & Vision */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            What Drives Us
          </h2>
          <div className="grid md:grid-cols-2 gap-10">
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="bg-white p-8 rounded-2xl shadow-md"
            >
              <div className="flex items-center gap-3 mb-4">
                <FaBullseye className="text-emerald-600 text-2xl" />
                <h3 className="text-xl font-semibold text-gray-800">
                  Our Mission
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                To empower students with high-quality academic materials and
                affordable projects that encourage practical learning,
                collaboration, and innovation.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.03 }}
              className="bg-white p-8 rounded-2xl shadow-md"
            >
              <div className="flex items-center gap-3 mb-4">
                <FaUsers className="text-emerald-600 text-2xl" />
                <h3 className="text-xl font-semibold text-gray-800">
                  Our Vision
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                To build an ocean of knowledge — a community where every student
                can learn, share, and succeed together without barriers.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 🌟 What We Offer */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">
            What We Offer
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: <FaBookOpen className="text-emerald-600 text-3xl" />,
                title: "Free RTU Notes",
                desc: "Access semester-wise notes curated by top-performing students.",
              },
              {
                icon: <FaLaptopCode className="text-emerald-600 text-3xl" />,
                title: "Affordable Projects",
                desc: "Learn through practical full-stack projects and codebases.",
              },
              {
                icon: <FaUsers className="text-emerald-600 text-3xl" />,
                title: "Community Support",
                desc: "Join peers, discuss topics, and learn collaboratively.",
              },
              {
                icon: <FaUserGraduate className="text-emerald-600 text-3xl" />,
                title: "AI Study Tools",
                desc: "Use our chatbot and smart utilities to boost productivity.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-lg transition"
              >
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-emerald-100 mx-auto mb-4">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-gray-800 text-lg mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 🌟 Founder Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
          {/* Founder Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex-1 flex justify-center"
          >
            <img
              src={founderImg}
              alt="Founder"
              className="w-80 h-80 object-cover rounded-full shadow-2xl border-4 border-emerald-600"
            />
          </motion.div>

          {/* Founder Story */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex-1"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Meet Our Founder
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              <span className="font-semibold text-emerald-700">
                Vishal Prajapati
              </span>{" "}
              — a passionate student and developer who experienced the challenges
              of finding reliable academic resources. His vision was simple:
              make knowledge accessible to everyone without barriers.
            </p>
            <p className="text-gray-700 leading-relaxed">
              From sharing class notes with friends to launching a full-fledged
              platform, Vishal’s journey reflects NoteSea’s core values:
              collaboration, accessibility, and student empowerment. Today,
              NoteSea stands as a growing community where learning meets
              technology.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 🌟 Call to Action */}
      <section className="py-20 bg-white text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Join the Wave of Smart Learning 🌊
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Whether you want to learn, contribute, or grow — NoteSea welcomes
            every student ready to dive deeper into knowledge.
          </p>
          <a
            href="/dashboard"
            className="bg-emerald-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-emerald-700 transition"
          >
            Explore Notes
          </a>
        </motion.div>
      </section>
    </div>
  );
}
