import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaTasks,
  FaCog,
  FaQuestionCircle,
  FaBell,
  FaRobot,
  FaBars,
  FaTimes,
  FaInfoCircle,
  FaEnvelope,
  FaShoppingCart,
  FaStore,
  FaDownload
} from "react-icons/fa";
import API from "../utils/axios";

export default function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // PWA install prompt
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallVisible, setIsInstallVisible] = useState(false);

  useEffect(() => {
    API.get("/users")
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
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

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log("User choice:", outcome);
    setDeferredPrompt(null);
    setIsInstallVisible(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  return (
    <>
      {/* Navbar */}
<nav className="bg-gradient-to-r from-emerald-600 to-emerald-500 px-6 py-4 shadow-md text-white flex justify-between items-center">
        {/* Logo */}
        <h1
          className="text-2xl font-extrabold tracking-wide cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
          NoteSea
        </h1>

        {/* Desktop Menu */}
        {user ? (
          <div className="hidden md:flex relative items-center gap-5">
            <Link to="/soon" title="Coming Soon">
              <FaBell size={22} />
            </Link>
            <Link to="/project-services" title="Project Services">
              <FaStore size={22} />
            </Link>
            <Link to="/how-it-works" title="How It Works">
              <FaQuestionCircle size={22} />
            </Link>
            <Link to="/tasks" title="My Tasks">
              <FaTasks size={22} />
            </Link>
            <Link to="/chatbot" title="Chatbot">
              <FaRobot size={22} />
            </Link>
            <Link to="/about" title="About Us">
              <FaInfoCircle size={22} />
            </Link>
            <Link to="/contact" title="Contact Us">
              <FaEnvelope size={22} />
            </Link>
            <Link to="/my-bookings" title="Coming Soon">
              <FaShoppingCart size={22} />
            </Link>

            {/* Download App button (Desktop) */}
            {isInstallVisible && (
              <button
                onClick={handleInstall}
                className="bg-white text-emerald-600 text-sm px-3 py-1.5 rounded-full flex items-center gap-2 hover:bg-emerald-50 transition"
              >
                <FaDownload /> Download App
              </button>
            )}

            {/* Avatar */}
            <FaCog
              size={28}
              className="cursor-pointer transition duration-200 hover:rotate-90"
              onClick={() => setShowDropdown(!showDropdown)}
            />

            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="absolute top-14 right-0 bg-white text-gray-800 rounded-md shadow-lg w-40 py-2 z-50">
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-100 text-sm"
                  onClick={() => setShowDropdown(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-red-100 text-sm text-red-600"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/"
            className="hidden md:block bg-white text-emerald-600 text-sm font-medium px-4 py-1.5 rounded-full hover:bg-emerald-50 transition"
          >
            Login
          </Link>
        )}

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsSidebarOpen(true)}
        >
          <FaBars size={24} />
        </button>
      </nav>

      {/* Sidebar (Mobile) */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 z-50`}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-xl font-bold text-emerald-600">Menu</h2>
          <button
            className="text-gray-600"
            onClick={() => setIsSidebarOpen(false)}
          >
            <FaTimes size={22} />
          </button>
        </div>

        {/* Menu Items */}
        <div className="flex flex-col p-6 gap-6 text-gray-800">
          <Link to="/soon" onClick={() => setIsSidebarOpen(false)}>
            <FaBell className="inline mr-2" /> Notifications
          </Link>
          <Link to="/project-services" onClick={() => setIsSidebarOpen(false)}>
            <FaStore className="inline mr-2" /> Project Services
          </Link>
          <Link to="/how-it-works" onClick={() => setIsSidebarOpen(false)}>
            <FaQuestionCircle className="inline mr-2" /> How It Works
          </Link>
          <Link to="/tasks" onClick={() => setIsSidebarOpen(false)}>
            <FaTasks className="inline mr-2" /> My Tasks
          </Link>
          <Link to="/chatbot" onClick={() => setIsSidebarOpen(false)}>
            <FaRobot className="inline mr-2" /> Chatbot
          </Link>
          <Link to="/about" onClick={() => setIsSidebarOpen(false)}>
            <FaInfoCircle className="inline mr-2" /> About
          </Link>
          <Link to="/contact" onClick={() => setIsSidebarOpen(false)}>
            <FaEnvelope className="inline mr-2" /> Contact
          </Link>
          <Link to="/my-bookings" onClick={() => setIsSidebarOpen(false)}>
            <FaShoppingCart className="inline mr-2" /> My Orders
          </Link>

          

          {user ? (
            <>
              <Link to="/profile" onClick={() => setIsSidebarOpen(false)}>
                <FaCog className="inline mr-2" /> Profile
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setIsSidebarOpen(false);
                }}
                className="flex items-center gap-2 text-red-600 hover:text-red-700"
              >
                <FaTimes /> Logout
              </button>
            </>
          ) : (
            <Link
              to="/"
              className="bg-emerald-600 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-emerald-700 transition"
              onClick={() => setIsSidebarOpen(false)}
            >
              Login
            </Link>
          )}

          {/* Download App button (Mobile) */}
          {isInstallVisible && (
            <button
              onClick={() => {
                handleInstall();
                setIsSidebarOpen(false);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition"
            >
              <FaDownload /> Download App
            </button>
          )}
        </div>
        
      </div>
      

      {/* Overlay when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 backdrop-blur-sm bg-black/20 z-40 transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </>
  );
}
