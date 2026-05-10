import { Link, useLocation } from 'react-router-dom';
import {
  FaHome,
  FaRegCommentDots,
  FaFileAlt,
  FaUser,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaUsers,
  FaShoppingBag,
  FaBookOpen,
  FaInfoCircle,
  FaEnvelope,
  FaQuestionCircle,
  FaStore,
  FaInstagram,
  FaWhatsapp,
  FaTelegram,
  FaYoutube,
  FaPhoneAlt
} from 'react-icons/fa';

export default function Footer() {
  const { pathname } = useLocation();
  const isMobile = window.innerWidth < 768;

  return (
    <>
      {/* Desktop Footer */}
      {!isMobile && (
        <footer className="bg-white border-t border-emerald-200 mt-8">
          <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-5 gap-8 text-sm text-gray-600">
            <div className="col-span-2">
              <h2 className="text-2xl font-bold text-emerald-700 mb-3">NoteSea</h2>
              <p className="text-gray-500 leading-relaxed">
                All-in-one solution for students and users to download notes, manage tasks,
                explore blogs, book services, and connect via global chat.
              </p>
              <div className="mt-4 flex space-x-4 text-emerald-600">
                <a href="https://www.youtube.com/@Vishalprajapati-q7l" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-800 transition-colors">
                  <FaYoutube size={20} />
                </a>
                <a href="https://www.instagram.com/notesea.xyz/" className="hover:text-emerald-800 transition-colors">
                  <FaInstagram size={20} />
                </a>
                <a href="https://www.whatsapp.com/channel/0029VbBPPUN8V0tsVVPSek0f" className="hover:text-emerald-800 transition-colors">
                  <FaWhatsapp size={20} />
                </a>
                <a href="https://t.me/noteseaxyz" className="hover:text-emerald-800 transition-colors">
                  <FaTelegram size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/company/notesea/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-800 transition-colors"
                >
                  <FaLinkedin size={20} />
                </a>
              </div>
              <p className="mt-6 text-xs text-gray-400">
                &copy; {new Date().getFullYear()} NoteSea | All rights reserved.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-emerald-700 mb-4 text-lg flex items-center">
                <FaHome className="mr-2" size={16} />
                Explore
              </h3>
              <ul className="space-y-2">
                <li><Link to="/dashboard" className="hover:text-emerald-600 transition-colors">Dashboard</Link></li>
                <li><Link to="/how-it-works" className="hover:text-emerald-600 transition-colors">How It Works</Link></li>
                <li><Link to="/tasks" className="hover:text-emerald-600 transition-colors">My Tasks</Link></li>
                <li><Link to="/mypdf" className="hover:text-emerald-600 transition-colors">Notes Library</Link></li>
                <li><Link to="https://calculator.notesea.xyz/" className="hover:text-emerald-600 transition-colors">CGPA Calculator</Link></li>
                <li><Link to="/chat" className="hover:text-emerald-600 transition-colors">Global Chat</Link></li>
                <li><Link to="/team" className="hover:text-emerald-600 transition-colors">Partners</Link></li>
                <li><Link to="/gallery" className="hover:text-emerald-600 transition-colors">Gallery</Link></li>
                <li><Link to="/scard" className="hover:text-emerald-600 transition-colors flex items-center">
                  SCard <span className="ml-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">NEW!</span>
                </Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-emerald-700 mb-4 text-lg flex items-center">
                <FaShoppingBag className="mr-2" size={16} />
                Services
              </h3>
              <ul className="space-y-2">
                <li><Link to="/easy-projects" className="hover:text-emerald-600 transition-colors">Browse Services</Link></li>
                <li><Link to="/research-services" className="hover:text-emerald-600 transition-colors">Research & Docs</Link></li>
                <li><Link to="/resume-builder" className="hover:text-emerald-600 transition-colors flex items-center">
                  Resume Builder <span className="ml-2 bg-emerald-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">NEW</span>
                </Link></li>
                <li><Link to="/pyq" className="hover:text-emerald-600 transition-colors">PYQ Papers</Link></li>
                <li><Link to="/my-bookings" className="hover:text-emerald-600 transition-colors">My Orders</Link></li>
                <li><Link to="/channel" className="hover:text-emerald-600 transition-colors">YouTube Channel</Link></li>
                <li><Link to="/chatbot" className="hover:text-emerald-600 transition-colors">AI Chatbot</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-emerald-700 mb-4 text-lg flex items-center">
                <FaQuestionCircle className="mr-2" size={16} />
                Support
              </h3>
              <ul className="space-y-2">
                <li><Link to="/about-home" className="hover:text-emerald-600 transition-colors flex items-center">
                  {/* <FaInfoCircle className="mr-2" size={14} /> */}
                  About Us
                </Link></li>
                <li><Link to="/contact" className="hover:text-emerald-600 transition-colors flex items-center">
                  {/* <FaEnvelope className="mr-2" size={14} /> */}
                  Contact Us
                </Link></li>
                <li><a href="/careers" className="hover:text-emerald-600 transition-colors">Careers</a></li>

                <li><a href="#" className="hover:text-emerald-600 transition-colors">Help Center</a></li>
                <div className="mt-4 p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                  <h4 className="text-xs font-bold text-emerald-800 uppercase mb-3 flex items-center gap-2">
                    <FaPhoneAlt size={12} className="text-emerald-600" /> Connect With Us
                  </h4>
                  <div className="space-y-3">
                    <a href="tel:+919001509419" className="flex items-center gap-2 text-emerald-700 hover:text-emerald-500 transition-colors group">
                      <span className="bg-emerald-100 p-1.5 rounded-md text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors"><FaWhatsapp size={12} /></span>
                      <span className="text-xs font-medium">+91 9001509419</span>
                    </a>
                    <a href="tel:+918003310994" className="flex items-center gap-2 text-emerald-700 hover:text-emerald-500 transition-colors group">
                      <span className="bg-emerald-100 p-1.5 rounded-md text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors"><FaPhoneAlt size={12} /></span>
                      <span className="text-xs font-medium">+91 8003310994</span>
                    </a>
                  </div>
                </div>
              </ul>
            </div>
          </div>
        </footer>
      )}

      {/* Mobile Footer Navigation */}


      {isMobile && (
        <div className="fixed bottom-0 w-full bg-white border-t border-emerald-200 flex justify-around items-center py-3 shadow-lg z-50">
          <Link
            to="/dashboard"
            className={`flex flex-col items-center text-xs ${pathname === '/dashboard' ? 'text-emerald-600 font-semibold' : 'text-gray-500'} transition-colors`}
          >
            <FaHome size={20} />
            <span className="mt-1">Home</span>
          </Link>
          <Link
            to="/chat"
            className={`flex flex-col items-center text-xs ${pathname === '/chat' ? 'text-emerald-600 font-semibold' : 'text-gray-500'} transition-colors`}
          >
            <FaRegCommentDots size={20} />
            <span className="mt-1">Chat</span>
          </Link>

          <Link
            to="/project-services"
            className={`flex flex-col items-center text-xs ${pathname === '/mypdf' ? 'text-emerald-600 font-semibold' : 'text-gray-500'} transition-colors`}
          >
            <FaStore size={20} />
            <span className="mt-1">Projects</span>
          </Link>
          <Link
            to="/research-services"
            className={`flex flex-col items-center text-xs ${pathname === '/research-services' ? 'text-emerald-600 font-semibold' : 'text-gray-500'} transition-colors`}
          >
            <FaFileAlt size={20} />
            <span className="mt-1">Research</span>
          </Link>

          <Link
            to="/team"
            className={`flex flex-col items-center text-xs ${pathname === '/team' ? 'text-emerald-600 font-semibold' : 'text-gray-500'} transition-colors`}
          >
            <FaUsers size={20} />
            <span className="mt-1">Partners</span>
          </Link>
          
        </div>
      )}
    </>
  );
}