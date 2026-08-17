import React, { useState, useEffect } from "react";
import API from "../utils/axios";
import { FaGithub, FaLinkedin, FaInstagram, FaGlobe, FaMapMarkerAlt, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import vishalImg from "../assets/Vishalp.jpeg";
import Rishabh from "../assets/Rishabh.jpg";
import Krishna from "../assets/Krishna.jpg";
import Aditya from "../assets/Aditya.jpg";
import Mohit from "../assets/Mohit.jpg";
import Primetheorist from "../assets/Primetheorist.jpg";
import Prashant from "../assets/Prashant.png";
import Harshul from "../assets/Harshul.jpeg";
import Lavish from "../assets/Lavish.jpeg";

const FALLBACK_CONTRIBUTORS = [
  {
    name: "Vishal Prajapati",
    role: "Founder & Developer",
    image: vishalImg,
    location: "Jaipur, Rajasthan",
    skills: "MERN Stack, Product, Community",
    bio: "Founder of NoteSea. Engineering student and full-stack developer building notes, projects, and student tools so quality resources stay accessible without barriers.",
    linkedin: "https://www.linkedin.com/in/vishal-prajapati-445799289/",
    github: "https://github.com/VISHALX33/",
    website: "https://vishal.notesea.xyz/",
    instagram: "https://www.instagram.com/vishal_20_03/",
  },
  {
    name: "Mohit Dad",
    role: "CEO (Chief Evangelist Officer)",
    image: Mohit,
    location: "Jaipur, Rajasthan",
    skills: "Web3, Solidity, Full Stack, Growth",
    bio: "Full-stack blockchain developer and Chief Evangelist at NoteSea. Builds practical Web3 products (dApps, smart contracts) and helps grow the student community through partnerships and outreach.",
    linkedin: "https://www.linkedin.com/in/0xmohitxyz/",
    github: "https://github.com/0xmohitxyz",
    website: "https://0xmohit.xyz/",
    instagram: "https://www.instagram.com/moh1t_maheshwari/",
  },
  {
    name: "Harshul Dev Prajapati",
    role: "Innovation Manager",
    image: Harshul,
    location: "Jaipur, Rajasthan",
    skills: "Product, Strategy, Innovation",
    bio: "Drives new ideas and product experiments at NoteSea. Helps turn student needs into useful features and keep the platform moving forward.",
  },
  {
    name: "Lavish Singhvi",
    role: "Data Analyst and Documentation Specialist",
    image: Lavish,
    location: "Jaipur, Rajasthan",
    skills: "Documentation, Data, Operations",
    bio: "Handles documentation and data workflows so NoteSea stays organised, clear, and easy for students and the team to use.",
  },
  {
    name: "Primetheorist",
    role: "Full Stack Developer",
    image: Primetheorist,
    location: "India",
    skills: "React, Node.js, Full Stack",
    bio: "Full stack developer contributing to NoteSea’s product and engineering. Builds features that help students learn and ship projects faster.",
  },
  {
    name: "Rishabh Mishra",
    role: "Full Stack Developer",
    image: Rishabh,
    location: "India",
    skills: "MERN, APIs, Frontend",
    bio: "Works across frontend and backend to ship reliable student-facing features for notes, projects, and platform tools.",
  },
  {
    name: "Prashant Jain",
    role: "Full Stack Developer",
    image: Prashant,
    location: "India",
    skills: "JavaScript, Node.js, React",
    bio: "Full stack contributor focused on clean, practical features that make NoteSea easier for students to use every day.",
  },
  {
    name: "Krishna Sharma",
    role: "Frontend Developer",
    image: Krishna,
    location: "India",
    skills: "React, UI, Tailwind CSS",
    bio: "Frontend developer crafting clean, responsive interfaces so students can browse notes, projects, and tools without friction.",
  },
  {
    name: "Aditya Vaishnav",
    role: "Frontend Developer",
    image: Aditya,
    location: "India",
    skills: "React, CSS, UX",
    bio: "Builds polished frontend experiences for NoteSea, with a focus on usability and a consistent student-friendly design.",
  },
];

const FALLBACK_PARTNERS = [
  {
    name: "Khushi Photocopy & Printout",
    role: "Print & Stationery Partner",
    image: "https://res.cloudinary.com/dwq5qifuk/image/upload/v1763982004/k_qk95m1.webp",
    location: "Jaipur",
    bio: "Trusted photocopy and print partner supporting students with notes, printouts, and everyday campus stationery needs.",
  },
  {
    name: "Manglam residency",
    role: "Hospitality Partner",
    image: "https://res.cloudinary.com/dwq5qifuk/image/upload/v1768415621/6287321978473484191_avdbd4.jpg",
    location: "Jaipur",
    bio: "Hospitality partner of NoteSea, supporting students and events with stay and campus-area services.",
  },
  {
    name: "Gupta Store",
    role: "Campus Store Partner",
    image: "https://res.cloudinary.com/dwq5qifuk/image/upload/q_auto/f_auto/v1776185917/6bfeef9d-ec20-45eb-8956-c43e7b4889b6_sxg50y.jpg",
    location: "Jaipur",
    bio: "Local store partner helping students with daily supplies and campus essentials.",
  },
];

function cleanLink(v) {
  if (!v || v === "#") return "";
  return v;
}

function mergeWithFallback(list, fallback) {
  return list.map((item) => {
    const extra = fallback.find(
      (f) => f.name.trim().toLowerCase() === (item.name || "").trim().toLowerCase()
    );
    if (!extra) return item;
    return {
      ...extra,
      ...item,
      bio: item.bio || extra.bio,
      location: item.location || extra.location,
      skills: item.skills || extra.skills,
      github: cleanLink(item.github) || extra.github || "",
      linkedin: cleanLink(item.linkedin) || extra.linkedin || "",
      instagram: cleanLink(item.instagram) || extra.instagram || "",
      website: cleanLink(item.website) || extra.website || "",
      image: item.image || extra.image,
      role: item.role || extra.role,
    };
  });
}

export default function Team() {
  const [contributors, setContributors] = useState([]);
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const [contribRes, partnerRes] = await Promise.all([
          API.get("/team/public?type=contributor"),
          API.get("/team/public?type=partner"),
        ]);
        setContributors(
          contribRes.data?.length > 0
            ? mergeWithFallback(contribRes.data, FALLBACK_CONTRIBUTORS)
            : FALLBACK_CONTRIBUTORS
        );
        setPartners(
          partnerRes.data?.length > 0
            ? mergeWithFallback(partnerRes.data, FALLBACK_PARTNERS)
            : FALLBACK_PARTNERS
        );
      } catch {
        setContributors(FALLBACK_CONTRIBUTORS);
        setPartners(FALLBACK_PARTNERS);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e) => {
      if (e.key === "Escape") setSelected(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [selected]);

  if (loading) {
    return (
      <div className="bg-gray-50 py-24 px-6 text-center">
        <div className="inline-block w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        <p className="mt-4 text-slate-500 font-medium">Loading team...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-emerald-700 mb-3 text-center">
          Our Contributors
        </h1>
        <p className="text-center text-slate-500 mb-12 text-sm">
          Click a card to view full details
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {contributors.map((member, index) => (
            <button
              type="button"
              key={member._id || index}
              onClick={() => setSelected({ ...member, kind: "contributor" })}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:-translate-y-2 transition-all duration-300 text-left cursor-pointer group"
            >
              <div className="bg-emerald-600 h-24 relative">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full border-4 border-white absolute left-1/2 transform -translate-x-1/2 bottom-[-2.5rem] object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="pt-14 pb-6 px-6 text-center">
                <h2 className="text-lg font-semibold text-gray-800">{member.name}</h2>
                <p className="text-sm text-gray-500 mb-2">{member.role}</p>
                <span className="text-[11px] font-semibold text-emerald-600">View profile →</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white py-16 px-6 mt-20">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-emerald-700 mb-3 text-center">
            Our Partners
          </h1>
          <p className="text-center text-slate-500 mb-12 text-sm">
            Click a partner to learn more
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-10">
            {partners.map((partner, index) => (
              <button
                type="button"
                key={partner._id || index}
                onClick={() => setSelected({ ...partner, kind: "partner" })}
                className="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-center cursor-pointer"
              >
                <div className="w-full h-28 flex items-center justify-center mb-4">
                  <img
                    src={partner.image}
                    alt={partner.name}
                    className="h-full object-contain"
                  />
                </div>
                <h3 className="font-semibold text-gray-800 text-lg">{partner.name}</h3>
                <span className="text-[11px] font-semibold text-emerald-600 mt-2 inline-block">View details →</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <MemberDrawer member={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}

function MemberDrawer({ member, onClose }) {
  const isPartner = member.kind === "partner" || member.type === "partner";
  const skills = (member.skills || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const links = [
    { href: member.github, icon: <FaGithub />, label: "GitHub" },
    { href: member.linkedin, icon: <FaLinkedin />, label: "LinkedIn" },
    { href: member.instagram, icon: <FaInstagram />, label: "Instagram" },
    { href: member.website, icon: <FaGlobe />, label: "Portfolio" },
  ].filter((l) => l.href && l.href !== "#");

  return (
    <>
      <motion.div
        className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-[2px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      <motion.aside
        role="dialog"
        aria-modal="true"
        aria-label={`${member.name} profile`}
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 28, stiffness: 280 }}
        className="fixed top-0 right-0 z-50 h-full w-full sm:w-[420px] md:w-[460px] bg-white shadow-[-20px_0_50px_rgba(15,23,42,0.18)] flex flex-col"
      >
        <div className="relative h-36 bg-gradient-to-br from-emerald-600 to-emerald-500 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/15 text-white hover:bg-white hover:text-emerald-700 flex items-center justify-center transition"
            aria-label="Close"
          >
            <FaTimes />
          </button>
          <p className="absolute top-5 left-6 text-[11px] font-bold uppercase tracking-[0.2em] text-white/80">
            {isPartner ? "Partner" : "Team member"}
          </p>
        </div>

        <div className="px-7 -mt-12 relative z-10 flex items-end gap-4">
          {isPartner ? (
            <div className="h-24 w-28 bg-white rounded-2xl shadow-lg border border-slate-100 p-2 flex items-center justify-center shrink-0">
              <img src={member.image} alt="" className="max-h-full max-w-full object-contain" />
            </div>
          ) : (
            <img
              src={member.image}
              alt={member.name}
              className="w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-lg shrink-0"
            />
          )}
          <div className="pb-1 min-w-0">
            <h2 className="text-xl font-bold text-slate-900 leading-tight truncate">{member.name}</h2>
            {member.role && <p className="text-sm text-emerald-600 font-semibold mt-0.5">{member.role}</p>}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-7 py-6 space-y-6">
          {member.location && (
            <p className="text-sm text-slate-500 flex items-center gap-2">
              <FaMapMarkerAlt className="text-emerald-500 shrink-0" /> {member.location}
            </p>
          )}

          {member.bio && (
            <section>
              <h3 className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400 mb-2">About</h3>
              <p className="text-slate-600 leading-relaxed text-sm">{member.bio}</p>
            </section>
          )}

          {skills.length > 0 && (
            <section>
              <h3 className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400 mb-3">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((s) => (
                  <span
                    key={s}
                    className="px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </section>
          )}

          {links.length > 0 && (
            <section>
              <h3 className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400 mb-3">Connect</h3>
              <div className="space-y-2">
                {links.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 transition group"
                  >
                    <span className="w-9 h-9 rounded-xl bg-white shadow-sm flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition">
                      {l.icon}
                    </span>
                    <span className="text-sm font-semibold">{l.label}</span>
                    <span className="ml-auto text-xs text-slate-400 group-hover:text-emerald-600">Open →</span>
                  </a>
                ))}
              </div>
            </section>
          )}

          {!member.bio && skills.length === 0 && links.length === 0 && (
            <p className="text-sm text-slate-400">More details coming soon.</p>
          )}
        </div>
      </motion.aside>
    </>
  );
}
