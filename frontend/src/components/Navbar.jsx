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
  FaDownload,
  FaBriefcase,
  FaComments,
  FaUsers,
  FaIdCardAlt
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

  // Fetch user info
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
      localStorage.removeItem("token"); // remove invalid token
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser();

    // Listen for login event from Login component
    const handleLoginEvent = () => fetchUser();
    window.addEventListener("login", handleLoginEvent);
    return () => window.removeEventListener("login", handleLoginEvent);
  }, []);

  // PWA install
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
    await deferredPrompt.userChoice;
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
        <h1
          className="text-2xl font-extrabold tracking-wide cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
          NoteSea
        </h1>

        {/* Desktop Menu */}
        {user ? (
          <div className="hidden md:flex relative items-center gap-6 px-6 py-2 bg-white/80 backdrop-blur-md rounded-full shadow-sm border border-emerald-100">
            <Link to="/soon" className="text-emerald-700 font-medium hover:text-emerald-500 transition duration-200">Notification</Link>
            <Link to="/project-services" className="text-emerald-700 font-medium hover:text-emerald-500 transition duration-200">Services</Link>
            <Link to="/how-it-works" className="text-emerald-700 font-medium hover:text-emerald-500 transition duration-200">How It Works</Link>
            <Link to="/tasks" className="text-emerald-700 font-medium hover:text-emerald-500 transition duration-200">My Tasks</Link>
            <Link to="/chat" className="text-emerald-700 font-medium hover:text-emerald-500 transition duration-200">Global Chat</Link>
            <Link to="/chatbot" className="text-emerald-700 font-medium hover:text-emerald-500 transition duration-200">Chatbot</Link>
            <Link to="/about-home" className="text-emerald-700 font-medium hover:text-emerald-500 transition duration-200">About</Link>
            <Link to="/contact" className="text-emerald-700 font-medium hover:text-emerald-500 transition duration-200">Contact</Link>
            <Link to="/my-bookings" className="text-emerald-700 font-medium hover:text-emerald-500 transition duration-200">My Orders</Link>
            <Link to="/careers" className="text-emerald-700 font-medium hover:text-emerald-500 transition duration-200">Careers</Link>
            <Link to="/team" className="text-emerald-700 font-medium hover:text-emerald-500 transition duration-200">Partners</Link>
            <Link to="/scard" className="relative bg-gradient-to-r from-green-400 to-green-500 text-white font-bold px-4 py-2 rounded-full hover:from-green-500 hover:to-green-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-110 ">
              SCard
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-1 ">NEW!</span>
            </Link>
            <FaCog
              size={26}
              className="ml-2 text-emerald-600 cursor-pointer hover:text-emerald-700 transition-transform duration-300 hover:rotate-90"
              onClick={() => setShowDropdown(!showDropdown)}
            />

            {showDropdown && (
              <div className="absolute top-14 right-0 bg-white text-gray-800 rounded-md shadow-lg w-40 py-2 z-50">
                <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100 text-sm" onClick={() => setShowDropdown(false)}>Profile</Link>
                <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-red-100 text-sm text-red-600">Logout</button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/" className="hidden md:block bg-white text-emerald-600 text-sm font-medium px-4 py-1.5 rounded-full hover:bg-emerald-50 transition">Login</Link>
        )}

        {/* Mobile Hamburger */}
        <button className="md:hidden text-white" onClick={() => setIsSidebarOpen(true)}>
          <FaBars size={24} />
        </button>
      </nav>

      {/* Sidebar (Mobile) */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 z-50`}>
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-xl font-bold text-emerald-600">Menu</h2>
          <button className="text-gray-600" onClick={() => setIsSidebarOpen(false)}><FaTimes size={22} /></button>
        </div>

        <div className="flex flex-col p-6 gap-6 text-gray-800">
          <Link to="/soon" onClick={() => setIsSidebarOpen(false)}><FaBell className="inline mr-2" /> Notifications</Link>
          <Link to="/project-services" onClick={() => setIsSidebarOpen(false)}><FaStore className="inline mr-2" /> Project Services</Link>
          <Link to="/how-it-works" onClick={() => setIsSidebarOpen(false)}><FaQuestionCircle className="inline mr-2" /> How It Works</Link>
          <Link to="/tasks" onClick={() => setIsSidebarOpen(false)}><FaTasks className="inline mr-2" /> My Tasks</Link>
          <Link to="/chat" onClick={() => setIsSidebarOpen(false)}><FaComments className="inline mr-2" /> Global Chat</Link>
          <Link to="/chatbot" onClick={() => setIsSidebarOpen(false)}><FaRobot className="inline mr-2" /> Chatbot</Link>
          <Link to="/my-bookings" onClick={() => setIsSidebarOpen(false)}><FaShoppingCart className="inline mr-2" /> My Orders</Link>
          <Link to="/Careers" onClick={() => setIsSidebarOpen(false)}><FaBriefcase className="inline mr-2" /> Careers</Link>
          <Link to="/team" onClick={() => setIsSidebarOpen(false)}><FaUsers className="inline mr-2" /> Partners</Link>
           <Link to="/scard" className="relative  font-bold px-4 py-2 rounded-full hover:from-green-500 hover:to-green-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-110 " onClick={() => setIsSidebarOpen(false)}><FaIdCardAlt className="inline mr-2 " /> SCard
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-1 ">NEW!</span>
          </Link>
          <Link to="/about-home" onClick={() => setIsSidebarOpen(false)}><FaInfoCircle className="inline mr-2" /> About</Link>
          <Link to="/contact" onClick={() => setIsSidebarOpen(false)}><FaEnvelope className="inline mr-2" /> Contact</Link>


          {user ? (
            <>
              <Link to="/profile" onClick={() => setIsSidebarOpen(false)}><FaCog className="inline mr-2" /> Profile</Link>
              <button onClick={() => { handleLogout(); setIsSidebarOpen(false); }} className="flex items-center gap-2 text-red-600 hover:text-red-700">
                <FaTimes /> Logout
              </button>
            </>
          ) : (
            <Link to="/" className="bg-emerald-600 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-emerald-700 transition" onClick={() => setIsSidebarOpen(false)}>Login</Link>
          )}

          {isInstallVisible && (
            <button onClick={() => { handleInstall(); setIsSidebarOpen(false); }} className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition">
              <FaDownload /> Download App
            </button>
          )}
        </div>
      </div>

      {isSidebarOpen && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/20 z-40 transition-opacity" onClick={() => setIsSidebarOpen(false)} />
      )}
    </>
  );
}
