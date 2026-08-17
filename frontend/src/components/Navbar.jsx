import { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Settings,
  LogOut,
  User,
  Phone,
  MessageCircle,
  Download,
  ChevronDown,
  Bell,
  Briefcase,
  FileText,
  BookOpen,
  ShoppingBag,
  CreditCard,
  Youtube,
  Instagram,
  Linkedin,
  Send,
} from "lucide-react";
import API from "../utils/axios";
import { clearAuthSession } from "../utils/auth";

const NAV_LINKS = [
  { to: "/soon", label: "Updates", icon: Bell },
  { to: "/project-services", label: "Projects", icon: Briefcase },
  { to: "/research-services", label: "Research", icon: FileText },
  { to: "/resume-builder", label: "Resume", badge: "NEW", icon: FileText },
  { to: "/pyq", label: "PYQ", icon: BookOpen },
  { to: "/chat", label: "Chat", icon: MessageCircle },
  { to: "/my-bookings", label: "Orders", icon: ShoppingBag },
];

const MOBILE_EXTRA = [
  { to: "/scard", label: "SCard", badge: "NEW", icon: CreditCard },
];

const SOCIAL_LINKS = [
  { href: "https://www.youtube.com/@Vishalprajapati-q7l", icon: Youtube, label: "YouTube", className: "text-red-600 hover:bg-red-50" },
  { href: "https://www.instagram.com/notesea.xyz/", icon: Instagram, label: "Instagram", className: "text-pink-600 hover:bg-pink-50" },
  { href: "https://www.whatsapp.com/channel/0029VbBPPUN8V0tsVVPSek0f", icon: Send, label: "WhatsApp", className: "text-emerald-600 hover:bg-emerald-50" },
  { href: "https://t.me/noteseaxyz", icon: Send, label: "Telegram", className: "text-sky-600 hover:bg-sky-50" },
  { href: "https://www.linkedin.com/company/notesea/", icon: Linkedin, label: "LinkedIn", className: "text-blue-700 hover:bg-blue-50" },
];

function getInitials(name) {
  return (name || "U")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showSupport, setShowSupport] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallVisible, setIsInstallVisible] = useState(false);
  const userMenuRef = useRef(null);
  const supportRef = useRef(null);

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      return;
    }
    try {
      const res = await API.get("/users/");
      setUser(res.data);
    } catch (err) {
      console.error("Unauthorized:", err.response?.data);
      clearAuthSession();
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser();
    const handleLoginEvent = () => fetchUser();
    window.addEventListener("login", handleLoginEvent);
    return () => window.removeEventListener("login", handleLoginEvent);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallVisible(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  useEffect(() => {
    setIsSidebarOpen(false);
    setShowUserMenu(false);
    setShowSupport(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSidebarOpen]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
      if (supportRef.current && !supportRef.current.contains(e.target)) {
        setShowSupport(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    setIsInstallVisible(false);
  };

  const handleLogout = () => {
    clearAuthSession();
    setUser(null);
    setShowUserMenu(false);
    navigate("/");
  };

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(`${path}/`);

  const NavLink = ({ to, label, badge, icon: Icon, onClick, mobile }) => {
    const active = isActive(to);
    const base = mobile
      ? `flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-colors ${
          active ? "bg-emerald-600 text-white" : "text-gray-700 hover:bg-emerald-50 hover:text-emerald-800"
        }`
      : `relative inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
          active
            ? "bg-emerald-600 text-white shadow-sm shadow-emerald-600/25"
            : "text-emerald-800 hover:bg-emerald-50"
        }`;

    return (
      <Link to={to} onClick={onClick} className={base}>
        {Icon && <Icon size={mobile ? 18 : 14} className={active && !mobile ? "opacity-90" : ""} />}
        {label}
        {badge && (
          <span
            className={`text-[9px] font-black px-1.5 py-0.5 rounded-full ${
              active && !mobile
                ? "bg-white/25 text-white"
                : "bg-emerald-500 text-white animate-pulse"
            }`}
          >
            {badge}
          </span>
        )}
      </Link>
    );
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-sm">
        <nav className="max-w-[1600px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <button
            type="button"
            onClick={() => navigate(user ? "/dashboard" : "/")}
            className="flex items-center gap-2.5 shrink-0 group"
          >
            <img
              src="/NoteNestLogo.png"
              alt="NoteSea"
              className="h-9 w-9 object-contain rounded-lg"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
            <span className="text-xl font-black tracking-tight text-emerald-800 group-hover:text-emerald-600 transition-colors">
              NoteSea
            </span>
          </button>

          {/* Desktop nav */}
          {user ? (
            <div className="hidden xl:flex items-center gap-1 flex-1 justify-center min-w-0 overflow-x-auto scrollbar-hide px-2">
              {NAV_LINKS.map((link) => (
                <NavLink key={link.to} {...link} />
              ))}
            </div>
          ) : null}

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            {user ? (
              <>
                <div className="relative" ref={supportRef}>
                  <button
                    type="button"
                    onClick={() => setShowSupport((v) => !v)}
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-emerald-800 border border-emerald-200 bg-emerald-50/80 hover:bg-emerald-100 transition-colors"
                  >
                    <Phone size={14} />
                    Connect
                    <ChevronDown size={14} className={`transition-transform ${showSupport ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {showSupport && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        className="absolute top-full right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-emerald-100 p-4 z-50"
                      >
                        <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-3">
                          Contact us
                        </p>
                        <div className="space-y-2">
                          <a
                            href="tel:+919001509419"
                            className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-emerald-50 text-gray-700 hover:text-emerald-800 transition-colors text-sm font-medium"
                          >
                            <span className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">
                              WA
                            </span>
                            +91 9001509419
                          </a>
                          <a
                            href="tel:+918003310994"
                            className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-emerald-50 text-gray-700 hover:text-emerald-800 transition-colors text-sm font-medium"
                          >
                            <span className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                              <Phone size={14} />
                            </span>
                            +91 8003310994
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {isInstallVisible && (
                  <button
                    type="button"
                    onClick={handleInstall}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
                  >
                    <Download size={14} /> App
                  </button>
                )}

                <div className="relative" ref={userMenuRef}>
                  <button
                    type="button"
                    onClick={() => setShowUserMenu((v) => !v)}
                    className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-xl border border-emerald-100 hover:bg-emerald-50 transition-colors"
                  >
                    <span className="w-8 h-8 rounded-lg bg-emerald-600 text-white text-xs font-black flex items-center justify-center">
                      {getInitials(user.name)}
                    </span>
                    <ChevronDown size={14} className="text-emerald-700" />
                  </button>
                  <AnimatePresence>
                    {showUserMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        className="absolute top-full right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-emerald-100 py-2 z-50 overflow-hidden"
                      >
                        <div className="px-4 py-2 border-b border-emerald-50 mb-1">
                          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Signed in</p>
                          <p className="text-sm font-bold text-emerald-900 truncate">{user.name}</p>
                        </div>
                        <Link
                          to="/profile"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-emerald-50 hover:text-emerald-800"
                        >
                          <User size={16} /> Profile
                        </Link>
                        <Link
                          to="/scard"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-emerald-50 hover:text-emerald-800"
                        >
                          <CreditCard size={16} /> SCard
                        </Link>
                        <button
                          type="button"
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50"
                        >
                          <LogOut size={16} /> Logout
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-md shadow-emerald-600/20 transition-colors"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2 rounded-xl text-emerald-800 hover:bg-emerald-50 transition-colors"
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </nav>

        {/* Tablet nav strip (md to xl) */}
        {user && (
          <div className="hidden md:flex xl:hidden border-t border-emerald-50 px-4 py-2 gap-1 overflow-x-auto scrollbar-hide">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.to} {...link} />
            ))}
          </div>
        )}
      </header>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-emerald-950/40 backdrop-blur-sm z-[60] md:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              className="fixed top-0 left-0 h-full w-[min(100vw-3rem,20rem)] bg-white shadow-2xl z-[70] flex flex-col md:hidden"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-emerald-100 bg-emerald-50/50">
                <div className="flex items-center gap-2">
                  <img src="/NoteNestLogo.png" alt="" className="h-8 w-8 rounded-lg object-contain" />
                  <span className="font-black text-emerald-800">NoteSea</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-2 rounded-xl text-gray-500 hover:bg-white transition-colors"
                  aria-label="Close menu"
                >
                  <X size={22} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {user ? (
                  <>
                    <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-2xl border border-emerald-100">
                      <span className="w-10 h-10 rounded-xl bg-emerald-600 text-white text-sm font-black flex items-center justify-center">
                        {getInitials(user.name)}
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-gray-400 uppercase">Welcome</p>
                        <p className="font-bold text-emerald-900 truncate">{user.name}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-2 mb-2">
                        Navigation
                      </p>
                      <div className="space-y-1">
                        {NAV_LINKS.map((link) => (
                          <NavLink
                            key={link.to}
                            {...link}
                            mobile
                            onClick={() => setIsSidebarOpen(false)}
                          />
                        ))}
                        {MOBILE_EXTRA.map((link) => (
                          <NavLink
                            key={link.to}
                            {...link}
                            mobile
                            onClick={() => setIsSidebarOpen(false)}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                      <p className="text-[10px] font-black uppercase tracking-widest text-emerald-700 mb-3">
                        Connect
                      </p>
                      <div className="space-y-2">
                        <a
                          href="tel:+919001509419"
                          onClick={() => setIsSidebarOpen(false)}
                          className="flex items-center gap-3 text-sm font-semibold text-emerald-900 hover:text-emerald-600"
                        >
                          <Phone size={16} /> +91 9001509419
                        </a>
                        <a
                          href="tel:+918003310994"
                          onClick={() => setIsSidebarOpen(false)}
                          className="flex items-center gap-3 text-sm font-semibold text-emerald-900 hover:text-emerald-600"
                        >
                          <Phone size={16} /> +91 8003310994
                        </a>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <Link
                        to="/profile"
                        onClick={() => setIsSidebarOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-gray-700 hover:bg-emerald-50"
                      >
                        <Settings size={18} /> Profile & Settings
                      </Link>
                      <button
                        type="button"
                        onClick={() => {
                          handleLogout();
                          setIsSidebarOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50"
                      >
                        <LogOut size={18} /> Logout
                      </button>
                    </div>
                  </>
                ) : (
                  <Link
                    to="/"
                    onClick={() => setIsSidebarOpen(false)}
                    className="block text-center py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-colors"
                  >
                    Login
                  </Link>
                )}

                {isInstallVisible && (
                  <button
                    type="button"
                    onClick={() => {
                      handleInstall();
                      setIsSidebarOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-colors"
                  >
                    <Download size={18} /> Download App
                  </button>
                )}

                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-2 mb-3">
                    Follow us
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {SOCIAL_LINKS.map(({ href, icon: Icon, label, className }) => (
                      <a
                        key={href}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${className}`}
                      >
                        <Icon size={18} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
