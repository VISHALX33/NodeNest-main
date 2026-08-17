import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Sparkles,
  GraduationCap,
  BookOpen,
  Download,
  MessageCircle,
  ListTodo,
  HandHeart,
  Bot,
  Network,
  Video,
  IndianRupee,
  UserPlus,
  Search,
  Upload,
  Wallet,
  Trophy,
  BarChart3,
  Instagram,
  Linkedin,
  ArrowRight,
  Clock,
  HelpCircle,
} from "lucide-react";
import API from "../utils/axios";

const STEP_ICONS = [GraduationCap, BookOpen, Download];

const DEFAULT_STEPS = [
  {
    title: "Create Account",
    description: "Sign up or log in to access notes, tools, and project services.",
  },
  {
    title: "Choose What You Need",
    description:
      "Select semester notes, explore ready-made projects, or request custom MERN development.",
  },
  {
    title: "Access & Use",
    description:
      "Download notes, buy projects, or get your custom project built by NoteSea.",
  },
];

const FEATURES = [
  {
    Icon: MessageCircle,
    title: "Global Chat Room",
    description: "Connect and chat with students from different colleges.",
    link: "/chat",
  },
  {
    Icon: ListTodo,
    title: "To-Do Task Manager",
    description: "Manage your daily study tasks efficiently.",
    link: "/tasks",
  },
  {
    Icon: HandHeart,
    title: "Contribute With Us",
    description: "Upload and share notes to help others and grow with the NoteSea community.",
    highlight: true,
  },
  {
    Icon: Bot,
    title: "Assignment Chatbot",
    description: "Get instant AI-powered help for assignments and study doubts.",
    link: "/chatbot",
  },
  {
    Icon: Network,
    title: "Project Marketplace",
    description: "Buy ready-made or custom Easy, Medium, and Advanced MERN projects.",
    link: "/easy-projects",
  },
];

const SELL_PAPER_STEPS = [
  { Icon: Search, title: "Visit PYQ", desc: "Go to the PYQ section on NoteSea" },
  { Icon: ArrowRight, title: "Sell Now", desc: "Click the 'Sell Now' button on the page" },
  { Icon: Upload, title: "Upload", desc: "Fill the form and upload clear images" },
  { Icon: Wallet, title: "Earn", desc: "Get ₹20 per paper via UPI instantly" },
];

const SCARD_POINTS = [
  { Icon: BookOpen, title: "Daily Cards", description: "2 scratch cards daily, return each day." },
  { Icon: Sparkles, title: "Scratch & Win", description: "Click cards to reveal points (0–10)." },
  { Icon: ListTodo, title: "Earn Points", description: "Points add to daily, weekly, monthly, lifetime totals." },
  { Icon: Trophy, title: "Unlock Badges", description: "Collect points to unlock Bronze → Master badges." },
  { Icon: GraduationCap, title: "Compete", description: "Leaderboards for weekly/monthly competition." },
  { Icon: BarChart3, title: "Track Progress", description: "Profile shows stats, badges, achievements." },
];

const PROJECT_FLOW = [
  {
    Icon: Network,
    title: "Select Project",
    description: "Choose a project based on your requirement (Easy, Medium, or Advanced).",
  },
  {
    Icon: Video,
    title: "Watch Demo & Preview",
    description: "View demo videos and project screenshots to understand features clearly.",
  },
  {
    Icon: BookOpen,
    title: "Fill Project Form",
    description: "Submit required details like name, college, technology, and customization needs.",
  },
  {
    Icon: IndianRupee,
    title: "Make Payment",
    description: "Complete secure payment to confirm your project order.",
  },
  {
    Icon: Download,
    title: "Project Delivery",
    description:
      "Your project will be delivered to your NoteSea account within 1–2 working days (Sunday excluded).",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.45 },
  }),
};

function SectionHeader({ badge, title, subtitle }) {
  return (
    <div className="text-center mb-10">
      {badge && (
        <span className="inline-block text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-2">
          {badge}
        </span>
      )}
      <h2 className="text-2xl sm:text-3xl font-black text-emerald-900 tracking-tight">{title}</h2>
      {subtitle && (
        <p className="text-gray-500 text-sm sm:text-base mt-3 max-w-2xl mx-auto">{subtitle}</p>
      )}
      <div className="h-1 w-16 bg-gradient-to-r from-emerald-400 to-teal-500 mx-auto rounded-full mt-4" />
    </div>
  );
}

function IconCard({ Icon, title, description, index, highlight, link, stepNum }) {
  const Wrapper = link ? Link : "div";
  const wrapperProps = link ? { to: link } : {};

  return (
    <motion.div custom={index} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
      <Wrapper
        {...wrapperProps}
        className={`group h-full bg-white rounded-2xl p-6 border transition-all duration-300 ${
          highlight
            ? "border-emerald-400 shadow-lg ring-2 ring-emerald-100"
            : "border-emerald-100 shadow-sm hover:shadow-md hover:border-emerald-300"
        } ${link ? "cursor-pointer hover:-translate-y-1" : ""}`}
      >
        <div className="flex items-start gap-4">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
              highlight ? "bg-emerald-600 text-white" : "bg-emerald-100 text-emerald-700"
            }`}
          >
            <Icon size={22} />
          </div>
          <div className="min-w-0 flex-1">
            {stepNum != null && (
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">
                Step {stepNum}
              </span>
            )}
            <h3 className="font-bold text-emerald-900 text-base leading-snug">{title}</h3>
            <p className="text-gray-500 text-sm mt-1.5 leading-relaxed">{description}</p>
            {link && (
              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 mt-3 group-hover:gap-2 transition-all">
                Explore <ArrowRight size={12} />
              </span>
            )}
          </div>
        </div>
      </Wrapper>
    </motion.div>
  );
}

export default function HowItWorks() {
  const [steps, setSteps] = useState(DEFAULT_STEPS);

  useEffect(() => {
    API.get("/cms/content/how_it_works")
      .then((res) => {
        if (res.data?.steps?.length) {
          setSteps(res.data.steps);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-emerald-50/50 via-white to-white overflow-hidden">
      <div className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 bg-emerald-200/25 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 -left-20 w-64 h-64 bg-teal-200/20 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 relative z-10">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-700 via-emerald-800 to-teal-900 p-8 md:p-10 mb-14 text-white shadow-xl"
        >
          <div className="relative text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-emerald-100 text-xs font-bold uppercase tracking-wider mb-4 border border-white/20">
              <Sparkles size={12} /> Guide
            </span>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">
              How NoteSea Works
            </h1>
            <p className="mt-4 text-emerald-50/90 text-sm md:text-base leading-relaxed">
              Study materials, smart tools, and professional project development — everything you need
              as a student, in one platform.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 px-4 py-2 bg-white/15 rounded-xl text-xs font-bold">
              <Clock size={14} /> Projects delivered in 1–2 days
            </div>
          </div>
        </motion.div>

        {/* General steps */}
        <SectionHeader
          badge="Getting started"
          title="Three simple steps"
          subtitle="From signup to using notes, projects, and services on NoteSea."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-20">
          {steps.map((step, index) => {
            const Icon = STEP_ICONS[index % STEP_ICONS.length];
            return (
              <IconCard
                key={index}
                Icon={Icon}
                title={step.title}
                description={step.description}
                index={index}
                stepNum={index + 1}
              />
            );
          })}
        </div>

        {/* Features */}
        <SectionHeader
          badge="Platform"
          title="Features for you"
          subtitle="Tools built to help you study smarter and collaborate with peers."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-20">
          {FEATURES.map((feature, index) => (
            <IconCard key={feature.title} {...feature} index={index} />
          ))}
        </div>

        {/* Sell paper */}
        <SectionHeader
          badge="Earn money"
          title="How to earn ₹20 per paper"
          subtitle="Share your exam papers with the community and get paid via UPI."
        />
        <div className="grid gap-8 lg:grid-cols-2 items-center mb-20">
          <div className="grid gap-4 sm:grid-cols-2">
            {SELL_PAPER_STEPS.map((item, i) => (
              <motion.div
                key={item.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-white border border-emerald-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
                  <item.Icon size={18} />
                </div>
                <h3 className="font-bold text-emerald-800 text-sm">{item.title}</h3>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-3xl overflow-hidden shadow-xl border-4 border-emerald-100"
          >
            <img src="/sellpaper.png" alt="Earn ₹20 per paper guide" className="w-full h-auto" />
          </motion.div>
        </div>

        {/* Scratch cards */}
        <SectionHeader
          badge="Gamification"
          title="How scratch cards work"
          subtitle="Daily rewards, badges, and leaderboards on NoteSea."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-20">
          {SCARD_POINTS.map((point, index) => (
            <IconCard key={point.title} {...point} index={index} />
          ))}
        </div>

        {/* Project flow */}
        <SectionHeader
          badge="Projects"
          title="How project purchase works"
          subtitle="Simple and transparent — from selection to delivery."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8">
          {PROJECT_FLOW.map((item, index) => (
            <IconCard key={item.title} {...item} index={index} stepNum={index + 1} />
          ))}
        </div>

        {/* Support card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white border border-emerald-200 rounded-3xl p-8 text-center shadow-sm mb-16"
        >
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <HelpCircle size={26} />
          </div>
          <h3 className="text-lg font-black text-emerald-900 mb-2">Need help?</h3>
          <p className="text-gray-600 text-sm max-w-lg mx-auto mb-5">
            If you face any issues during project setup or execution, message us on Instagram for
            quick support.
          </p>
          <a
            href="https://www.instagram.com/notesea.xyz/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm transition-colors shadow-md shadow-emerald-600/20"
          >
            <Instagram size={18} /> Message us on Instagram
          </a>
        </motion.div>

        {/* LinkedIn */}
        <div className="text-center pb-8">
          <a
            href="https://www.linkedin.com/in/noteseadotxyz/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-emerald-700 font-bold hover:text-emerald-800 transition-colors"
          >
            <Linkedin size={20} />
            Connect with us on LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}
