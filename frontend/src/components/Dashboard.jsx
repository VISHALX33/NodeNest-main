import { useEffect, useState } from "react";
import API from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import {
  FaLaptopCode,
  FaRocket,
  FaBookOpen,
  FaFileAlt,
  FaComments,
  FaIdCardAlt,
  FaTasks,
  FaGraduationCap,
  FaMobileAlt,
  FaPaintBrush,
  FaCloudUploadAlt,
  FaPlug,
  FaTools,
  FaFileInvoice,
  FaSearch,
} from "react-icons/fa";
import {
  Sparkles,
  ArrowRight,
  ChevronRight,
  Search,
  ArrowUp,
  Star,
  Bot,
  ShoppingBag,
  HelpCircle,
  Users,
  Image,
  LayoutGrid,
  List,
  Zap,
  TrendingUp,
  Plus,
  Mail,
  MessageCircle,
  Clock,
  Smartphone,
  Banknote,
  BookOpenCheck,
  ArrowUpRight,
} from "lucide-react";
import hero from "/hero.png";
import customProjectImg from "../assets/custom.png";
import ProjectService from "./projectService";
import NoteSeaStory from "./NoteSeaStory";
import DashboardPopup from "./DashboardPopup";
import ResearchDocumentation from "./ResearchDocumentation";
import FaqIllustration from "./FaqIllustration";
import { getStoredUser } from "../utils/auth";

const videos = [
  { title: "Episode 1 — Project Announcement", url: "https://youtu.be/ZIcG812Gs3A?si=oYQo2ujfWL5_opxE" },
  { title: "Episode 2 — Email Verification & Auth", url: "https://youtu.be/lQa35-ERCQ4?si=mRbadWvXt1bPyNIu" },
  { title: "Episode 3 — Chatbot Integration", url: "https://youtu.be/qvVQtmvfZOU?si=dKAQaaTd7twbyVN_" },
  { title: "Episode 4 — Payment Gateway Integration", url: "https://youtu.be/LMJsl80XPK4?si=F1emfResKuihtlu7" },
  { title: "Episode 5 — install button and UI Improvements", url: "https://youtu.be/66BbL364094?si=s461MD1CV5jxhxZr" },
  { title: "Episode 6 — NoteNest to NoteSea Rebranding", url: "https://youtu.be/01nL7qOWzLU?si=tZDS4-zsuZ2-RNEJ" },
  { title: "Episode 7 — buying domain for notesea", url: "https://youtu.be/aYSamUbFhxk?si=0u54nF0QkD3ucXIo" },
  { title: "Episode 8 — Doing SEO in  notesea", url: "https://youtu.be/jVTRDA4nhWM?si=1KKAZlU8XzX5BBtd" },
  { title: "Episode 9 — Contributer section is open for everyone", url: "https://youtu.be/sGV7AOVDJ8w?si=KTGcN2M41_2W0EvN" },
  { title: "Episode 10 — Why students should use notesea", url: "https://youtu.be/0rRc_Pa6bwk?si=DsW2RWX91x4K_otK" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

function SectionHeader({ badge, title, subtitle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
      className="text-center mb-10"
    >
      {badge && (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-3">
          <Sparkles size={12} /> {badge}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-black text-emerald-800 tracking-tight">{title}</h2>
      {subtitle && (
        <p className="text-gray-500 mt-3 max-w-2xl mx-auto text-sm md:text-base">{subtitle}</p>
      )}
    </motion.div>
  );
}

function SectionShell({ children, className = "", id }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className={`rounded-3xl border border-emerald-100/80 bg-white/60 backdrop-blur-sm shadow-sm p-5 sm:p-7 ${className}`}
    >
      {children}
    </motion.section>
  );
}

function SectionDivider({ label }) {
  return (
    <div className="flex items-center gap-4 my-12">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent to-emerald-200" />
      {label && (
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500 px-3">
          {label}
        </span>
      )}
      <div className="flex-1 h-px bg-gradient-to-l from-transparent to-emerald-200" />
    </div>
  );
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const height = el.scrollHeight - el.clientHeight;
      setProgress(height > 0 ? (scrolled / height) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-[60] bg-emerald-100/50">
      <motion.div
        className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600"
        style={{ width: `${progress}%` }}
        transition={{ duration: 0.1 }}
      />
    </div>
  );
}

function AnnouncementMarquee() {
  const items = [
    "🎓 Free RTU notes for all semesters",
    "🚀 MERN projects delivered in 1–2 days",
    "🎴 Play SCard daily — win project discounts",
    "📝 New Resume Builder with 6 templates",
    "💰 Earn money by selling PYQ papers",
    "👥 400+ students already on NoteSea",
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-600 rounded-2xl mb-8 py-3 shadow-lg shadow-emerald-900/10">
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-emerald-700 to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-teal-600 to-transparent z-10" />
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        className="flex whitespace-nowrap gap-12 px-6"
      >
        {[...items, ...items].map((item, i) => (
          <span key={i} className="text-white/95 text-sm font-semibold flex items-center gap-2">
            <Sparkles size={12} className="text-emerald-200" /> {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function UserStatsBar({ user }) {
  if (!user) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.55 }}
      className="flex flex-wrap gap-3 mb-8"
    >
      {user.user_uni_id && (
        <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur border border-emerald-100 rounded-xl text-xs font-bold text-slate-600 shadow-sm">
          🆔 {user.user_uni_id}
        </span>
      )}
      {user.isVerified && (
        <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-700">
          ✓ Verified Student
        </span>
      )}
      <span className="inline-flex items-center gap-2 px-4 py-2 bg-violet-50 border border-violet-100 rounded-xl text-xs font-bold text-violet-700">
        <Star size={12} className="fill-violet-500 text-violet-500" /> NoteSea Member
      </span>
    </motion.div>
  );
}

function PromoBanners({ navigate }) {
  const promos = [
    {
      title: "SCard Game",
      desc: "Scratch daily & climb the leaderboard for discounts",
      icon: "🎴",
      path: "/scard",
      gradient: "from-rose-500 to-pink-600",
    },
    {
      title: "Earn with PYQ",
      desc: "Upload papers & get paid via UPI",
      icon: "💰",
      path: "/sell-paper",
      gradient: "from-amber-500 to-orange-600",
    },
    {
      title: "Latest Updates",
      desc: "Announcements, features & what's coming next",
      icon: "🔔",
      path: "/soon",
      gradient: "from-sky-500 to-blue-600",
    },
  ];

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid sm:grid-cols-3 gap-4 mb-14"
    >
      {promos.map((p, i) => (
        <motion.button
          key={p.path}
          variants={fadeUp}
          custom={i}
          whileHover={{ y: -5, scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate(p.path)}
          className={`relative overflow-hidden text-left p-5 rounded-2xl bg-gradient-to-br ${p.gradient} text-white shadow-lg hover:shadow-xl transition-shadow group`}
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
          <span className="text-3xl mb-3 block">{p.icon}</span>
          <h3 className="font-black text-lg">{p.title}</h3>
          <p className="text-white/80 text-xs mt-1 leading-relaxed">{p.desc}</p>
          <span className="inline-flex items-center gap-1 mt-3 text-xs font-bold text-white/90 group-hover:gap-2 transition-all">
            Explore <ArrowRight size={12} />
          </span>
        </motion.button>
      ))}
    </motion.div>
  );
}

function TestimonialCarousel() {
  const testimonials = [
    { name: "Aarav Mehta", text: "Free RTU notes are a lifesaver during exams!", avatar: "https://i.pravatar.cc/80?img=12" },
    { name: "Simran Kaur", text: "Tasks, notes, and chat — all in one place. Love it!", avatar: "https://i.pravatar.cc/80?img=5" },
    { name: "Rohit Sharma", text: "Got my MERN project in 2 days. Highly recommend!", avatar: "https://i.pravatar.cc/80?img=33" },
    { name: "Priya Singh", text: "The resume builder helped me land an internship.", avatar: "https://i.pravatar.cc/80?img=9" },
  ];
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((p) => (p + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, [testimonials.length]);

  return (
    <div className="max-w-6xl mx-auto mt-20 px-4">
      <SectionHeader badge="Community" title="What Students Say" subtitle="Real feedback from students using NoteSea every day." />

      <div className="hidden lg:grid lg:grid-cols-3 gap-5">
        {testimonials.slice(0, 3).map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -4 }}
            className="bg-white rounded-2xl p-6 shadow-md border border-emerald-50 hover:border-emerald-200 transition-colors"
          >
            <div className="flex gap-1 mb-3">
              {[...Array(5)].map((_, j) => (
                <Star key={j} size={14} className="fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-slate-600 text-sm italic leading-relaxed">&ldquo;{t.text}&rdquo;</p>
            <div className="flex items-center gap-3 mt-5 pt-4 border-t border-emerald-50">
              <img src={t.avatar} alt={t.name} className="w-9 h-9 rounded-full ring-2 ring-emerald-100" />
              <div>
                <p className="font-bold text-emerald-800 text-sm">{t.name}</p>
                <p className="text-[10px] text-slate-400">RTU Student</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="lg:hidden relative max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          {(() => {
            const t = testimonials[idx];
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                className="bg-white rounded-3xl p-8 shadow-xl border border-emerald-50 text-center"
              >
                <div className="flex justify-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-600 italic">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center justify-center gap-3 mt-6">
                  <img src={t.avatar} alt={t.name} className="w-11 h-11 rounded-full ring-2 ring-emerald-200" />
                  <div className="text-left">
                    <p className="font-bold text-emerald-800">{t.name}</p>
                    <p className="text-xs text-slate-400">RTU Student</p>
                  </div>
                </div>
              </motion.div>
            );
          })()}
        </AnimatePresence>
        <div className="flex justify-center gap-2 mt-4">
          {testimonials.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)} className={`h-2 rounded-full transition-all ${i === idx ? "w-6 bg-emerald-500" : "w-2 bg-emerald-200"}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

function DashboardFAQ({ navigate }) {
  const [open, setOpen] = useState(0);
  const faqs = [
    {
      q: "Are RTU notes really free?",
      a: "Yes! All semester notes are completely free after you sign up and verify your email. Browse any semester, pick a subject, and download PDFs instantly.",
      icon: BookOpenCheck,
    },
    {
      q: "How fast are projects delivered?",
      a: "Most MERN projects are delivered within 1–2 working days after payment confirmation. You'll receive the full source code in your account.",
      icon: Clock,
    },
    {
      q: "Can I earn money on NoteSea?",
      a: "Yes — upload PYQ papers through the Earn Program and get paid via UPI after admin approval. It's a simple way to monetize your old question papers.",
      icon: Banknote,
    },
    {
      q: "Is there a mobile app?",
      a: "NoteSea works as a PWA — install it from the dashboard for an app-like experience on your phone. No Play Store needed.",
      icon: Smartphone,
    },
    {
      q: "How do I get help with assignments?",
      a: "Use our AI Chatbot for quick doubts, join Global Chat to discuss with peers, or contact us for research papers and documentation services.",
      icon: MessageCircle,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto mt-20 px-4">
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-emerald-50 via-white to-teal-50/80 border border-emerald-100/80 p-6 md:p-10 lg:p-14 shadow-xl shadow-emerald-900/5">
        {/* Decorative background */}
        <div className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 bg-emerald-200/30 rounded-full blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-16 w-56 h-56 bg-teal-200/25 rounded-full blur-3xl" />
        <div
          className="pointer-events-none absolute bottom-12 right-12 text-[6rem] font-black text-emerald-100/40 leading-none select-none hidden xl:block"
          aria-hidden
        >
          ?
        </div>

        <div className="relative grid md:grid-cols-[1fr_1.35fr] gap-10 lg:gap-16 items-start">
          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:sticky md:top-24"
          >
            <FaqIllustration className="mb-8 md:mb-10" />

            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/90 text-emerald-700 text-xs font-bold uppercase tracking-widest mb-5 border border-emerald-200/60">
              <Sparkles size={12} /> FAQ
            </span>

            <h2 className="text-3xl md:text-4xl lg:text-[2.65rem] font-black text-emerald-950 leading-[1.15] tracking-tight">
              Frequently asked{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                questions
              </span>
            </h2>

            <p className="mt-5 text-slate-500 text-base leading-relaxed max-w-sm">
              Quick answers to the most common questions about notes, projects, and student services on NoteSea.
            </p>

            {/* Mini trust row */}
            <div className="mt-6 flex flex-wrap gap-2">
              {["400+ Students", "Free Notes", "1–2 Day Delivery"].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-lg bg-white/80 border border-emerald-100 text-[11px] font-bold text-emerald-700"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/contact")}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-900/25 transition-colors"
              >
                <Mail size={16} />
                Ask an Expert
                <ArrowUpRight size={14} className="opacity-70" />
              </motion.button>
              <motion.a
                href="mailto:notesea.help@gmail.com"
                whileHover={{ scale: 1.02 }}
                className="inline-flex items-center gap-2 px-5 py-3.5 bg-white border border-emerald-200 text-emerald-800 rounded-xl font-bold text-sm hover:bg-emerald-50 transition-colors"
              >
                Email us
              </motion.a>
            </div>
          </motion.div>

          {/* Right column — accordion */}
          <div className="space-y-3">
            {faqs.map((faq, i) => {
              const isOpen = open === i;
              const Icon = faq.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  layout
                  className={`relative overflow-hidden rounded-2xl border transition-all duration-300 ${
                    isOpen
                      ? "bg-white border-emerald-300 shadow-lg shadow-emerald-900/8 ring-1 ring-emerald-100"
                      : "bg-white/90 border-slate-200/90 shadow-sm hover:border-emerald-200 hover:shadow-md hover:bg-white"
                  }`}
                >
                  {/* Active accent bar */}
                  <motion.div
                    animate={{ scaleY: isOpen ? 1 : 0, opacity: isOpen ? 1 : 0 }}
                    className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-400 to-teal-500 origin-top"
                  />

                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-center gap-4 p-5 md:p-6 text-left group"
                  >
                    <div
                      className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        isOpen
                          ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                          : "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100"
                      }`}
                    >
                      <Icon size={18} />
                    </div>

                    <span
                      className={`flex-1 text-base md:text-[1.05rem] font-bold leading-snug transition-colors ${
                        isOpen ? "text-emerald-900" : "text-emerald-950"
                      }`}
                    >
                      {faq.q}
                    </span>

                    <motion.div
                      animate={{
                        rotate: isOpen ? 45 : 0,
                        backgroundColor: isOpen ? "rgb(5 150 105)" : "rgb(236 253 245)",
                      }}
                      transition={{ duration: 0.25 }}
                      className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center"
                    >
                      <Plus
                        size={18}
                        strokeWidth={2.5}
                        className={isOpen ? "text-white" : "text-emerald-600"}
                      />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 md:px-6 pb-5 md:pb-6 pl-[4.5rem] md:pl-[5.5rem] text-slate-500 text-sm md:text-[0.95rem] leading-relaxed">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function ExploreMore({ navigate }) {
  const links = [
    { label: "How It Works", icon: HelpCircle, path: "/how-it-works" },
    { label: "Our Team", icon: Users, path: "/team" },
    { label: "Gallery", icon: Image, path: "/gallery" },
    { label: "Contact Us", icon: FaComments, path: "/contact" },
  ];

  return (
    <SectionShell className="mt-20 !bg-emerald-50/30">
      <h3 className="text-sm font-black text-emerald-800 uppercase tracking-wider mb-4">Discover More</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {links.map((link) => (
          <motion.button
            key={link.path}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(link.path)}
            className="flex items-center gap-3 p-4 bg-white rounded-xl border border-emerald-100 hover:border-emerald-300 hover:shadow-md transition-all text-left"
          >
            <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <link.icon size={16} />
            </div>
            <span className="text-sm font-bold text-slate-700">{link.label}</span>
          </motion.button>
        ))}
      </div>
    </SectionShell>
  );
}

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-emerald-600 text-white rounded-full shadow-lg shadow-emerald-600/30 flex items-center justify-center hover:bg-emerald-700"
        >
          <ArrowUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

function FloatingOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-20 -right-20 w-72 h-72 bg-emerald-300/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ x: [0, -25, 0], y: [0, 25, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 -left-16 w-56 h-56 bg-teal-300/15 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 right-1/4 w-40 h-40 bg-emerald-400/10 rounded-full blur-2xl"
      />
    </div>
  );
}

function QuickActions({ navigate }) {
  const actions = [
    { label: "PYQ Papers", icon: FaBookOpen, path: "/pyq", color: "from-emerald-500 to-teal-600" },
    { label: "Resume Builder", icon: FaFileAlt, path: "/resume-builder", color: "from-violet-500 to-purple-600", badge: "NEW" },
    { label: "AI Chatbot", icon: Bot, path: "/chatbot", color: "from-cyan-500 to-blue-600" },
    { label: "Global Chat", icon: FaComments, path: "/chat", color: "from-sky-500 to-blue-600" },
    { label: "Projects", icon: FaRocket, path: "/project-services", color: "from-orange-500 to-amber-600" },
    { label: "My Orders", icon: ShoppingBag, path: "/my-bookings", color: "from-amber-600 to-yellow-700" },
    { label: "SCard", icon: FaIdCardAlt, path: "/scard", color: "from-rose-500 to-pink-600" },
    { label: "My Tasks", icon: FaTasks, path: "/tasks", color: "from-indigo-500 to-blue-700" },
  ];

  return (
    <SectionShell id="explore" className="mb-8 !bg-gradient-to-br from-white to-emerald-50/50">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-lg font-black text-emerald-800 flex items-center gap-2">
            <Sparkles size={18} className="text-emerald-500" /> Explore NoteSea
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">Jump to any feature instantly</p>
        </div>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide sm:grid sm:grid-cols-4 lg:grid-cols-8 sm:overflow-visible">
        {actions.map((action, i) => (
          <motion.button
            key={action.path}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ y: -4, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate(action.path)}
            className="relative flex-shrink-0 w-[88px] sm:w-auto snap-start group flex flex-col items-center gap-2 p-3 sm:p-4 rounded-2xl bg-white border border-emerald-100 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all"
          >
            {action.badge && (
              <span className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-violet-600 text-white text-[8px] font-black rounded-full z-10">
                {action.badge}
              </span>
            )}
            <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center text-white shadow-md group-hover:rotate-3 transition-transform`}>
              <action.icon size={action.icon === Bot || action.icon === ShoppingBag ? 18 : 16} />
            </div>
            <span className="text-[10px] sm:text-xs font-bold text-slate-700 text-center leading-tight">{action.label}</span>
          </motion.button>
        ))}
      </div>
    </SectionShell>
  );
}

function SemesterSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
          className="h-28 rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-50"
        />
      ))}
    </div>
  );
}

function extractSemesterNum(title) {
  const match = String(title).match(/(\d+)/);
  return match ? match[1] : "?";
}

function SemestersSection({ semesters, loading, search, setSearch, filteredSemesters, navigate }) {
  const [view, setView] = useState("grid");

  return (
    <SectionShell id="notes" className="mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-black text-emerald-800 flex items-center gap-2">
            <FaBookOpen className="text-emerald-600" /> RTU Notes Library
          </h2>
          <p className="text-sm text-slate-500 mt-1">Free notes for every semester — tap to browse subjects</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative flex-1 sm:flex-none">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-400" />
            <input
              type="text"
              placeholder="Search semester..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2.5 w-full sm:w-52 bg-white border border-emerald-100 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-400 outline-none"
            />
          </div>
          <div className="flex bg-emerald-50 rounded-xl p-1 border border-emerald-100">
            <button
              onClick={() => setView("grid")}
              className={`p-2 rounded-lg transition-all ${view === "grid" ? "bg-white shadow text-emerald-700" : "text-slate-400"}`}
            >
              <LayoutGrid size={16} />
            </button>
            <button
              onClick={() => setView("list")}
              className={`p-2 rounded-lg transition-all ${view === "list" ? "bg-white shadow text-emerald-700" : "text-slate-400"}`}
            >
              <List size={16} />
            </button>
          </div>
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-2 rounded-full border border-emerald-100">
            {filteredSemesters.length} semesters
          </span>
        </div>
      </div>

      {loading ? (
        <SemesterSkeleton />
      ) : filteredSemesters.length === 0 ? (
        <div className="text-center py-14 bg-emerald-50/50 rounded-2xl border border-dashed border-emerald-200">
          <p className="text-slate-500 font-medium">No semester matches &ldquo;{search}&rdquo;</p>
        </div>
      ) : view === "grid" ? (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
        >
          {filteredSemesters.map((s, i) => (
            <motion.div
              key={s._id}
              variants={fadeUp}
              custom={i}
              whileHover={{ y: -8 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate(`/semesters/${s._id}`)}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 p-[2px] shadow-md group-hover:shadow-xl transition-shadow">
                <div className="bg-white rounded-[14px] p-5 text-center h-full">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center text-lg font-black shadow-lg group-hover:scale-110 transition-transform">
                    {extractSemesterNum(s.title)}
                  </div>
                  <span className="text-sm font-bold text-slate-800 block">{s.title}</span>
                  <span className="text-[10px] text-emerald-600 font-bold mt-2 inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Open notes <ChevronRight size={10} />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="space-y-2">
          {filteredSemesters.map((s, i) => (
            <motion.div
              key={s._id}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              whileHover={{ x: 4 }}
              onClick={() => navigate(`/semesters/${s._id}`)}
              className="flex items-center gap-4 p-4 bg-white rounded-xl border border-emerald-50 hover:border-emerald-200 hover:shadow-md cursor-pointer group transition-all"
            >
              <div className="w-11 h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black shrink-0">
                {extractSemesterNum(s.title)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-slate-800">{s.title}</p>
                <p className="text-xs text-slate-400">Tap to view subjects & PDFs</p>
              </div>
              <ChevronRight size={18} className="text-emerald-300 group-hover:text-emerald-600 shrink-0" />
            </motion.div>
          ))}
        </div>
      )}
    </SectionShell>
  );
}

function WhatWeOffer() {
  const offers = [
    { title: "Web Development", desc: "Responsive websites and web apps for college projects.", icon: FaLaptopCode, featured: true },
    { title: "Mobile Apps", desc: "Cross-platform React Native for iOS and Android.", icon: FaMobileAlt },
    { title: "UI/UX Design", desc: "Beautiful designs that enhance user experience.", icon: FaPaintBrush },
    { title: "Deployment", desc: "Domain setup and hosting configuration.", icon: FaCloudUploadAlt },
    { title: "API Development", desc: "Custom REST APIs and third-party integrations.", icon: FaPlug },
    { title: "Support", desc: "Bug fixes and updates to keep your app running.", icon: FaTools },
    { title: "College Reports", desc: "Plagiarism-free academic reports.", icon: FaFileInvoice },
    { title: "Research Papers", desc: "IEEE/APA formatted original papers.", icon: FaSearch },
  ];

  return (
    <div className="max-w-6xl mx-auto mt-20 px-4">
      <SectionHeader
        badge="For Students"
        title="Services For Students"
        subtitle="Web and mobile solutions designed for student needs and budgets."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 auto-rows-fr">
        {offers.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ y: -6 }}
            className={`group relative overflow-hidden rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm hover:shadow-lg hover:border-emerald-200 transition-all ${
              item.featured ? "sm:col-span-2 lg:row-span-2 bg-gradient-to-br from-emerald-600 to-teal-700 border-0 text-white" : ""
            }`}
          >
            {item.featured && (
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full" />
            )}
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${
              item.featured ? "bg-white/20 text-white" : "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors"
            }`}>
              <item.icon size={20} />
            </div>
            <h3 className={`text-base font-black ${item.featured ? "text-white text-xl" : "text-emerald-800"}`}>{item.title}</h3>
            <p className={`mt-2 text-sm leading-relaxed ${item.featured ? "text-emerald-100" : "text-gray-500"}`}>{item.desc}</p>
            {item.featured && (
              <a href="mailto:notesea.help@gmail.com" className="inline-flex items-center gap-1 mt-4 text-sm font-bold text-white/90 hover:text-white">
                Get a quote <ArrowRight size={14} />
              </a>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function CountUpStat({ end, suffix = "", label, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  const numericEnd = parseInt(end, 10);

  useEffect(() => {
    if (!inView || isNaN(numericEnd)) return;
    let start = 0;
    const duration = 1500;
    const step = Math.ceil(numericEnd / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= numericEnd) {
        setCount(numericEnd);
        clearInterval(timer);
      } else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, numericEnd]);

  const display = isNaN(numericEnd) ? end : `${count}${suffix}`;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08 }}
      whileHover={{ scale: 1.05 }}
      className="text-center p-4"
    >
      <p className="text-3xl md:text-4xl font-black text-white">{display}</p>
      <p className="text-emerald-200/80 text-xs font-bold uppercase tracking-wider mt-2">{label}</p>
    </motion.div>
  );
}

function OurAchievements() {
  const stats = [
    { value: 400, suffix: "+", label: "Active Users", animate: true },
    { value: "4.8★", label: "Satisfaction", animate: false },
    { value: "10+", label: "Projects Delivered", animate: false },
    { value: "98%", label: "Success Rate", animate: false },
  ];

  return (
    <div className="max-w-6xl mx-auto mt-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-800 via-emerald-900 to-teal-900 p-8 md:p-12 shadow-2xl"
      >
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "24px 24px" }} />
        <div className="relative z-10">
          <div className="text-center mb-8">
            <span className="text-emerald-300 text-xs font-black uppercase tracking-widest">Milestones</span>
            <h2 className="text-2xl md:text-3xl font-black text-white mt-2">Our Achievements</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((item, i) =>
              item.animate ? (
                <CountUpStat key={item.label} end={item.value} suffix={item.suffix} label={item.label} index={i} />
              ) : (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="text-center p-4"
                >
                  <p className="text-3xl md:text-4xl font-black text-white">{item.value}</p>
                  <p className="text-emerald-200/80 text-xs font-bold uppercase tracking-wider mt-2">{item.label}</p>
                </motion.div>
              )
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function CustomProjects() {
  return (
    <div className="max-w-6xl mx-auto mt-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="grid md:grid-cols-2 items-center gap-10 bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 p-8 md:p-12 rounded-3xl shadow-2xl shadow-emerald-900/20 overflow-hidden relative"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10 text-white">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-emerald-100 text-xs font-bold uppercase tracking-wider mb-4">
            <Zap size={12} /> Tailored For You
          </span>
          <h2 className="text-3xl md:text-4xl font-black mb-4">Custom Projects</h2>
          <p className="text-emerald-100/90 mb-6 max-w-md leading-relaxed">
            Didn&apos;t find what you need? We build <strong className="text-white">custom full-stack projects</strong> tailored to your requirements.
          </p>

          <div className="space-y-4 mb-8">
            {[
              { icon: FaLaptopCode, text: "Design & Development tailored to your idea." },
              { icon: FaRocket, text: "Deployment & Support — get your project live and functional." },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
                  <Icon className="text-emerald-200" size={16} />
                </div>
                <p className="text-emerald-50 text-sm">{text}</p>
              </div>
            ))}
          </div>

          <motion.a
            href="mailto:notesea.help@gmail.com"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-emerald-700 rounded-xl font-bold shadow-lg hover:shadow-xl transition-shadow"
          >
            Contact Us <ArrowRight size={18} />
          </motion.a>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hidden md:block relative z-10"
        >
          <img
            src={customProjectImg}
            alt="Custom Project Illustration"
            className="w-full rounded-2xl shadow-2xl ring-4 ring-white/10"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export default function Dashboard() {
  const [semesters, setSemesters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const user = getStoredUser();
  const firstName = user?.name?.split(" ")[0] || "Student";

  const filteredSemesters = semesters.filter((s) =>
    s.title.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    API.get("/semesters")
      .then((res) => setSemesters(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-emerald-50/80 via-white to-emerald-50/40 overflow-hidden">
      <ScrollProgress />
      <FloatingOrbs />
      <DashboardPopup />
      <ScrollToTop />

      <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 relative z-10">
        {/* Hero Banner — unchanged */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative bg-white/70 backdrop-blur-md rounded-3xl p-6 md:p-10 flex flex-col md:flex-row justify-between items-center gap-8 mb-6 shadow-xl shadow-emerald-900/5 border border-emerald-100/80 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-transparent pointer-events-none" />

          <div className="flex-1 relative z-10">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold mb-4"
            >
              <TrendingUp size={14} /> 400+ students already learning
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="text-3xl md:text-4xl lg:text-5xl font-black text-emerald-900 leading-tight tracking-tight"
            >
              {getGreeting()}, {firstName}! 👋
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="mt-3 text-slate-600 text-base max-w-lg leading-relaxed"
            >
              One platform to download notes, manage tasks, chat with peers, and book services — all in one place.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="mt-6 flex flex-wrap gap-3"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-xl text-sm font-bold shadow-md shadow-emerald-600/25">
                <FaGraduationCap size={14} /> Free RTU Notes — All Semesters
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-emerald-200 text-emerald-700 rounded-xl text-sm font-bold">
                <Sparkles size={14} /> Pick a semester below
              </span>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 120 }}
            className="flex-1 relative z-10"
          >
            <motion.img
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              src={hero}
              alt="Study Illustration"
              className="hidden md:block w-full max-w-xs md:max-w-sm mx-auto drop-shadow-xl"
            />
          </motion.div>
        </motion.div>

        <AnnouncementMarquee />
        <UserStatsBar user={user} />
        <QuickActions navigate={navigate} />

        <SemestersSection
          semesters={semesters}
          loading={loading}
          search={search}
          setSearch={setSearch}
          filteredSemesters={filteredSemesters}
          navigate={navigate}
        />

        <SectionDivider label="Services & More" />

        <PromoBanners navigate={navigate} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
        >
          <ProjectService />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <ResearchDocumentation />
        </motion.div>

        <WhatWeOffer />
        <OurAchievements />
        <TestimonialCarousel />
        <NoteSeaStory videos={videos} />
        <DashboardFAQ navigate={navigate} />
        <ExploreMore navigate={navigate} />
        <CustomProjects />

        <div className="h-16" />
      </div>
    </div>
  );
}
