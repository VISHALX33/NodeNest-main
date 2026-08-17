import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ExternalLink } from "lucide-react";
import API from "../utils/axios";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function ProjectService() {
  const [projects, setProjects] = useState({ easy: [], medium: [], hard: [] });
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const [easy, medium, hard] = await Promise.all([
          API.get("/projects?category=easy"),
          API.get("/projects?category=medium"),
          API.get("/projects?category=hard"),
        ]);
        setProjects({ easy: easy.data, medium: medium.data, hard: hard.data });
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    };
    fetchProjects();
  }, []);

  const projectLevels = [
    {
      level: "Grab Your Projects",
      tag: "Easy",
      description: "Basic CRUD apps — quick to build & perfect for students.",
      projects: projects.easy,
      link: "/easy-projects",
      gradient: "from-emerald-500 to-teal-600",
      bg: "from-emerald-50 to-teal-50",
    },
    {
      level: "Buy Great Projects",
      tag: "Medium",
      description: "Auth, dashboards & real-time features for solid portfolios.",
      projects: projects.medium,
      link: "/medium-projects",
      gradient: "from-blue-500 to-indigo-600",
      bg: "from-blue-50 to-indigo-50",
    },
    {
      level: "Discover And Buy",
      tag: "Advanced",
      description: "Production-ready SaaS apps with payments & scaling.",
      projects: projects.hard,
      link: "/hard-projects",
      gradient: "from-violet-500 to-purple-700",
      bg: "from-violet-50 to-purple-50",
    },
  ];

  const showcaseProjects = [
    { name: "Car Rental Website", image: "https://res.cloudinary.com/dwq5qifuk/image/upload/v1765369795/Screenshot_2025-12-10_175747_fw58hc.png" },
    { name: "Hotel Booking Website", image: "https://res.cloudinary.com/dwq5qifuk/image/upload/v1766147229/Screenshot_2025-12-19_175403_kxdrhp.png" },
    { name: "Food Delivery Website", image: "https://res.cloudinary.com/dwq5qifuk/image/upload/v1766596623/Screenshot_2025-12-24_224505_tugvg4.png" },
    { name: "Personal Portfolio Website", image: "https://res.cloudinary.com/dwq5qifuk/image/upload/v1765636402/Screenshot_2025-12-13_195704_y2dguv.png" },
    { name: "Gym and Fitness Website", image: "https://res.cloudinary.com/dwq5qifuk/image/upload/v1765996467/Screenshot_2025-12-18_000157_z8hsrd.png" },
    { name: "Mini Social Media App", image: "https://res.cloudinary.com/dwq5qifuk/image/upload/v1766387689/Screenshot_2025-12-22_124212_ms34yv.png" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % showcaseProjects.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [showcaseProjects.length]);

  const priceRange = (list, key) => {
    if (!list.length) return "—";
    const vals = list.map((p) => p[key]).filter(Boolean);
    if (!vals.length) return "—";
    return `₹${Math.min(...vals)} – ₹${Math.max(...vals)}`;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-wider mb-3">
          <Sparkles size={12} /> MERN Stack
        </span>
        <h2 className="text-3xl md:text-4xl font-black text-emerald-800 tracking-tight">
          Project Development Services
        </h2>
        <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
          At <b>NoteSea</b>, we build full MERN projects for students and businesses. Choose your level and get delivery in 1–2 days.
        </p>
      </motion.div>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {projectLevels.map((category, index) => (
          <motion.div
            key={category.tag}
            variants={fadeUp}
            custom={index}
            whileHover={{ y: -8 }}
            className={`relative bg-gradient-to-br ${category.bg} rounded-3xl p-6 border border-white shadow-lg hover:shadow-xl transition-shadow flex flex-col`}
          >
            <span className={`inline-block self-start px-3 py-1 rounded-full bg-gradient-to-r ${category.gradient} text-white text-[10px] font-black uppercase tracking-wider mb-4`}>
              {category.tag}
            </span>
            <h3 className="text-xl font-black text-slate-800 mb-2">{category.level}</h3>
            <p className="text-gray-600 text-sm mb-4 leading-relaxed">{category.description}</p>

            <ul className="space-y-2 text-gray-700 text-sm mb-6 flex-1">
              {category.projects.slice(0, 5).map((project) => (
                <li key={project._id} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 shrink-0" />
                  {project.name}
                </li>
              ))}
              {category.projects.length > 5 && (
                <li className="text-emerald-600 text-xs font-bold">+{category.projects.length - 5} more</li>
              )}
            </ul>

            <div className="border-t border-white/60 pt-4 text-sm space-y-1 mb-4">
              <p className="text-gray-600">
                <b>🎓 Frontend:</b>{" "}
                <span className="text-emerald-700 font-bold">{priceRange(category.projects, "studentPrice")}</span>
              </p>
              <p className="text-gray-600">
                <b>🏢 Full Stack:</b>{" "}
                <span className="text-emerald-700 font-bold">{priceRange(category.projects, "businessPrice")}</span>
              </p>
            </div>

            <Link to={category.link}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-3 rounded-xl bg-gradient-to-r ${category.gradient} text-white font-bold shadow-md flex items-center justify-center gap-2`}
              >
                See All <ArrowRight size={16} />
              </motion.button>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Showcase carousel */}
      <div className="mt-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h3 className="text-2xl font-black text-emerald-800">Project Samples We Build</h3>
          <p className="text-gray-500 text-sm mt-2">Popular websites and systems for students & businesses</p>
        </motion.div>

        <div className="relative overflow-hidden rounded-3xl bg-slate-900 shadow-2xl">
          <motion.div
            key={activeSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative aspect-video md:aspect-[21/9]"
          >
            <img
              src={showcaseProjects[activeSlide].image}
              alt={showcaseProjects[activeSlide].name}
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 flex items-end justify-between">
              <div>
                <p className="text-emerald-300 text-xs font-bold uppercase tracking-wider mb-1">Live Sample</p>
                <h4 className="text-white text-xl md:text-2xl font-black">{showcaseProjects[activeSlide].name}</h4>
              </div>
              <span className="text-white/60 text-sm font-bold">
                {activeSlide + 1} / {showcaseProjects.length}
              </span>
            </div>
          </motion.div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {showcaseProjects.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveSlide(i)}
                className={`h-2 rounded-full transition-all ${i === activeSlide ? "w-8 bg-emerald-400" : "w-2 bg-white/40"}`}
              />
            ))}
          </div>
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-3 sm:grid-cols-6 gap-3 mt-4"
        >
          {showcaseProjects.map((item, index) => (
            <motion.button
              key={item.name}
              variants={fadeUp}
              custom={index}
              onClick={() => setActiveSlide(index)}
              whileHover={{ scale: 1.05 }}
              className={`rounded-xl overflow-hidden border-2 transition-all ${index === activeSlide ? "border-emerald-500 shadow-lg" : "border-transparent opacity-70 hover:opacity-100"}`}
            >
              <img src={item.image} alt={item.name} className="w-full h-16 object-cover object-top" />
            </motion.button>
          ))}
        </motion.div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-10 text-center text-gray-500 text-sm flex items-center justify-center gap-1"
      >
        📩 Contact us to discuss your project with <b>NoteSea</b>
        <ExternalLink size={12} className="text-emerald-600" />
      </motion.p>
    </div>
  );
}
