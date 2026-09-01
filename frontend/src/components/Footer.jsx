import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  MessageCircle,
  Briefcase,
  FileText,
  Users,
  Youtube,
  Instagram,
  Linkedin,
  Send,
  Phone,
  Mail,
  ExternalLink,
} from "lucide-react";

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false
  );

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [breakpoint]);

  return isMobile;
}

const EXPLORE_LINKS = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/tasks", label: "My Tasks" },
  { to: "/mypdf", label: "Notes Library" },
  { to: "/chat", label: "Global Chat" },
  { to: "/gallery", label: "Gallery" },
  { to: "/scard", label: "SCard", badge: "NEW" },
];

const SERVICE_LINKS = [
  { to: "/project-services", label: "Projects" },
  { to: "/research-services", label: "Research & Docs" },
  { to: "/resume-builder", label: "Resume Builder", badge: "NEW" },
  { to: "/pyq", label: "PYQ Papers" },
  { to: "/my-bookings", label: "My Orders" },
  { to: "/channel", label: "YouTube Channel" },
  { to: "/chatbot", label: "AI Chatbot" },
];

const SUPPORT_LINKS = [
  { to: "/about-home", label: "About Us" },
  { to: "/contact", label: "Contact Us" },
  { to: "/careers", label: "Careers" },
  { to: "/terms", label: "Terms & Conditions" },
  { to: "/privacy", label: "Privacy Policy" },
  { to: "/how-it-works", label: "Help Center" },
];

const SOCIAL_LINKS = [
  { href: "https://www.youtube.com/@Vishalprajapati-q7l", icon: Youtube, label: "YouTube" },
  { href: "https://www.instagram.com/notesea.xyz/", icon: Instagram, label: "Instagram" },
  { href: "https://www.whatsapp.com/channel/0029VbBPPUN8V0tsVVPSek0f", icon: Send, label: "WhatsApp" },
  { href: "https://t.me/noteseaxyz", icon: Send, label: "Telegram" },
  { href: "https://www.linkedin.com/company/notesea/", icon: Linkedin, label: "LinkedIn" },
];

const MOBILE_NAV = [
  { to: "/dashboard", label: "Home", icon: Home, match: (p) => p === "/dashboard" },
  { to: "/chat", label: "Chat", icon: MessageCircle, match: (p) => p === "/chat" },
  {
    to: "/project-services",
    label: "Projects",
    icon: Briefcase,
    match: (p) =>
      p === "/project-services" ||
      p.startsWith("/easy-projects") ||
      p.startsWith("/medium-projects") ||
      p.startsWith("/hard-projects"),
  },
  {
    to: "/research-services",
    label: "Research",
    icon: FileText,
    match: (p) => p.startsWith("/research-services"),
  },
  { to: "/team", label: "Team", icon: Users, match: (p) => p === "/team" || p === "/partners" },
];

function FooterLink({ to, label, badge, external }) {
  const className = "hover:text-emerald-700 transition-colors inline-flex items-center gap-2";

  if (external) {
    return (
      <a href={to} target="_blank" rel="noopener noreferrer" className={className}>
        {label}
        <ExternalLink size={12} className="opacity-60" />
      </a>
    );
  }

  return (
    <Link to={to} className={className}>
      {label}
      {badge && (
        <span className="bg-emerald-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full">
          {badge}
        </span>
      )}
    </Link>
  );
}

function LinkColumn({ title, links }) {
  return (
    <div>
      <h3 className="font-bold text-emerald-800 mb-4 text-sm uppercase tracking-wider">{title}</h3>
      <ul className="space-y-2.5 text-sm text-gray-600">
        {links.map((link) => (
          <li key={link.to + link.label}>
            <FooterLink {...link} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const { pathname } = useLocation();
  const isMobile = useIsMobile();

  return (
    <>
      {/* Desktop footer */}
      {!isMobile && (
        <footer className="mt-auto bg-white border-t border-emerald-100">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
              {/* Brand */}
              <div className="lg:col-span-2">
                <div className="flex items-center gap-2.5 mb-4">
                  <img
                    src="/NoteNestLogo.png"
                    alt="NoteSea"
                    className="h-9 w-9 rounded-lg object-contain"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                  <span className="text-xl font-black text-emerald-800">NoteSea</span>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
                  All-in-one platform for students — download notes, manage tasks, book projects,
                  and connect with peers.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {SOCIAL_LINKS.map(({ href, icon: Icon, label }) => (
                    <a
                      key={href}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-colors"
                    >
                      <Icon size={16} />
                    </a>
                  ))}
                </div>
              </div>

              <LinkColumn title="Explore" links={EXPLORE_LINKS} />

              <LinkColumn title="Services" links={SERVICE_LINKS} />

              <div>
                <LinkColumn title="Support" links={SUPPORT_LINKS} />
                <div className="mt-6 p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                  <p className="text-[10px] font-black uppercase tracking-widest text-emerald-700 mb-3 flex items-center gap-1.5">
                    <Phone size={12} /> Connect
                  </p>
                  <div className="space-y-2">
                    <a
                      href="tel:+919001509419"
                      className="flex items-center gap-2 text-xs font-semibold text-emerald-800 hover:text-emerald-600"
                    >
                      +91 9001509419
                    </a>
                    <a
                      href="tel:+918003310994"
                      className="flex items-center gap-2 text-xs font-semibold text-emerald-800 hover:text-emerald-600"
                    >
                      +91 8003310994
                    </a>
                    <a
                      href="mailto:notesea.help@gmail.com"
                      className="flex items-center gap-2 text-xs font-semibold text-emerald-800 hover:text-emerald-600"
                    >
                      <Mail size={12} /> notesea.help@gmail.com
                    </a>
                  </div>
                </div>
                <p className="mt-4">
                  <a
                    href="https://calculator.notesea.xyz/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-600 hover:text-emerald-700 inline-flex items-center gap-1.5 transition-colors"
                  >
                    CGPA Calculator <ExternalLink size={12} className="opacity-60" />
                  </a>
                </p>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-emerald-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-gray-400">
              <p>&copy; {new Date().getFullYear()} NoteSea. All rights reserved.</p>
              <div className="flex flex-wrap gap-4">
                <Link to="/terms" className="hover:text-emerald-700 transition-colors">
                  Terms
                </Link>
                <Link to="/contact" className="hover:text-emerald-700 transition-colors">
                  Contact
                </Link>
                <Link to="/team" className="hover:text-emerald-700 transition-colors">
                  Team
                </Link>
              </div>
            </div>
          </div>
        </footer>
      )}

      {/* Mobile bottom nav */}
      {isMobile && (
        <>
          <div className="h-16" aria-hidden />
          <nav className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-emerald-100 flex justify-around items-center py-2 px-1 shadow-[0_-4px_20px_rgba(16,185,129,0.08)] z-50 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
            {MOBILE_NAV.map(({ to, label, icon: Icon, match }) => {
              const active = match(pathname);
              return (
                <Link
                  key={to}
                  to={to}
                  className={`flex flex-col items-center gap-0.5 min-w-0 px-2 py-1 rounded-xl transition-colors ${
                    active ? "text-emerald-700" : "text-gray-400"
                  }`}
                >
                  <Icon size={20} strokeWidth={active ? 2.5 : 2} />
                  <span className={`text-[10px] font-bold truncate ${active ? "text-emerald-700" : ""}`}>
                    {label}
                  </span>
                </Link>
              );
            })}
          </nav>
        </>
      )}
    </>
  );
}
