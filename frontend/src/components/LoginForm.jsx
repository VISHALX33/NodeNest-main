import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, ArrowRight, ChevronDown } from "lucide-react";
import API from "../utils/axios";
import NoteNestLogo from "/NoteNestLogo.png";
import login1 from "/login1.png";
import login2 from "/login2.png";
import FAQ from "/FAQ.png";
import { motion } from "framer-motion";
import { FaUserGraduate, FaBookOpen,FaLaptopCode,FaUsers, FaDownload, FaInstagram } from "react-icons/fa";
import { FaLinkedin, FaTwitter } from "react-icons/fa";


export default function LandingPage({ switchToSignUp }) {
  const [data, setData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [openFAQ, setOpenFAQ] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      const res = await API.post("/users/login", data);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    {
      icon: <FaUserGraduate size={28} className="text-emerald-600" />,
      title: "Sign Up & Login",
      description: "Create your account or log in to access all features."
    },
    {
      icon: <FaBookOpen size={28} className="text-emerald-600" />,
      title: "Select Semester",
      description: "Choose your semester to see relevant study materials."
    },
    {
      icon: <FaDownload size={28} className="text-emerald-600" />,
      title: "Select Subject & Download",
      description: "Pick your subject and download the notes instantly. Enjoy your studies!"
    }
  ];

  const testimonials = [
    { name: "Aarav Mehta", text: "NoteSea has been a game changer for my semester exams. Free RTU notes are a lifesaver!", avatar: "https://i.pravatar.cc/100?img=1" },
    { name: "Simran Kaur", text: "I love how I can manage tasks and access notes all in one platform. Makes studying easier!", avatar: "https://i.pravatar.cc/100?img=2" },
    { name: "Rohit Sharma", text: "The best part is the simple login and smooth dashboard. Highly recommend it to students.", avatar: "https://i.pravatar.cc/100?img=3" },
  ];

  const faqs = [
    { q: "Is NoteSea free to use?", a: "Yes! All RTU notes are completely free for students." },
    { q: "Can I access notes for any semester?", a: "Yes, you can select your semester and download notes easily." },
    { q: "Do I need to create an account?", a: "Yes, you need to login to access dashboard and save progress." },
    { q: "Can I chat with other students?", a: "Absolutely! You can join our global chat room to connect with students worldwide." },
    { q: "Does NoteSea provide projects?", a: "Yes, we offer Easy, Medium, and Advanced level full-stack projects that you can download and learn from." },
    { q: "What is the Assignment Chatbot?", a: "Our AI-powered chatbot helps you with assignments, doubts, and quick explanations in seconds." },
    { q: "Is my data safe?", a: "Yes, we use secure authentication and protect your personal details." },
  ];


  return (
    <div className="font-sans">
      {/* 🌟 Navbar */}
      <nav className="fixed top-0 w-full bg-white shadow z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src={NoteNestLogo} alt="logo" className="h-8 w-8" />
            <span className="font-bold text-emerald-700 text-xl">NoteSea</span>
          </div>
          <div className="hidden md:flex gap-8 text-gray-700 font-medium">
            <a href="#home" className="hover:text-emerald-600">Home</a>
            <a href="#how" className="hover:text-emerald-600">How it Works</a>
            <a href="#login" className="hover:text-emerald-600">Login</a>
            <a href="#testimonials" className="hover:text-emerald-600">Testimonials</a>
            <a href="/terms" className="hover:text-emerald-600">Terms & Conditions</a>
            <a href="#faq" className="hover:text-emerald-600">FAQ</a>
          </div>
          <a href="#login" className="bg-emerald-600 text-white px-5 py-2 rounded-lg hover:bg-emerald-700 transition">
            Get Started
          </a>
        </div>
      </nav>

      {/* 🌟 Hero */}
      <section id="home" className="pt-32 md:pt-40 px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1 text-center md:text-left">
          <p className="text-emerald-600 font-semibold">Smart Study Platform</p>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
            Free Notes & Services for <br /> <span className="text-emerald-700">Every Semester</span>
          </h1>
          <p className="mt-4 text-gray-600 text-lg max-w-lg">
            Download notes, manage tasks, chat with peers, and access services — everything you need to excel.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a href="#login" className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-emerald-700 transition">Get Notes</a>
            <a href="/about-home" className="bg-gray-100 text-gray-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition">Learn More</a>
          </div>
        </div>
        <div className="flex-1">
          <img src={login1} alt="Hero illustration" className="w-full max-w-md mx-auto" />
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

      {/* 🌟 How It Works */}

      <section id="how" className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-emerald-100 mb-4">
                  {step.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>




      {/* 🌟 Login Section */}
      <section id="login" className="">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-3xl font-bold text-center text-emerald-700 mb-12">
            Login to Your Account
          </h1>

          <div className="flex flex-col md:flex-row items-center gap-10  ">

            {/* Login Form */}
            <div className="flex-1 w-full">
              <form onSubmit={handleSubmit} className="space-y-5">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-emerald-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                />

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-emerald-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 transition pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-emerald-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                <div className="text-right">
                  <Link
                    to="/forgot-password"
                    className="text-sm text-emerald-600 hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3 rounded-lg font-semibold shadow-md transition ${loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-emerald-600 hover:bg-emerald-700 text-white"
                    }`}
                >
                  {loading ? "Logging in..." : "Login"}
                </button>

               
                <p className="text-sm text-center text-gray-600 mt-4">
                  Don’t have an account?{" "}
                  <button
                    type="button"
                    onClick={switchToSignUp}
                    className="text-emerald-600 font-medium hover:underline"
                  >
                    Sign up
                  </button>
                </p>

              </form>
            </div>

            

            {/* Image on Right */}
            <div className="flex-1">
              <img
                src={login2} // replace with your desired image
                alt="Login Illustration"
                className="w-full max-w-sm mx-auto "
              />
            </div>
          </div>
        </div>
      </section>



      {/* 🌟 Testimonials */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">What Students Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div key={i} className="bg-gray-50 rounded-xl p-6 shadow hover:shadow-lg transition"
                whileHover={{ scale: 1.05 }}>
                <img src={t.avatar} alt={t.name} className="w-16 h-16 rounded-full mx-auto mb-4" />
                <p className="text-gray-600 italic mb-3">"{t.text}"</p>
                <h4 className="font-semibold text-gray-800">{t.name}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      


      {/* 🌟 FAQ */}
      <section id="faq" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-10">

            {/* Image on Left */}
            <div className="flex-1">
              <img
                src={FAQ} // replace with your desired image
                alt="FAQ Illustration"
                className="w-full  max-w-md mx-auto"
              />
            </div>

            {/* FAQ Questions */}
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {faqs.map((faq, i) => (
                  <div key={i} className="bg-white shadow rounded-lg">
                    <button
                      onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                      className="w-full flex justify-between items-center p-4 text-left font-medium text-gray-800"
                    >
                      {faq.q}
                      <ChevronDown
                        className={`w-5 h-5 transform transition ${openFAQ === i ? "rotate-180" : ""
                          }`}
                      />
                    </button>
                    {openFAQ === i && (
                      <p className="px-4 pb-4 text-gray-600">{faq.a}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>




      {/* 🌟 Footer */}
      <footer className="bg-emerald-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-5 gap-8">

          {/* Brand & Social */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="font-bold text-xl">NoteSea</h3>
            <p className="mt-2 text-sm text-gray-200">
              One platform to manage notes, tasks, projects, and connect with peers worldwide.
            </p>
            <div className="mt-4 flex space-x-4 text-gray-200">
              <a href="#" className="hover:text-gray-100 transition-colors"><FaInstagram size={20} /></a>
              <a href="#" className="hover:text-gray-100 transition-colors"><FaTwitter size={20} /></a>
              <a href="https://www.linkedin.com/in/vishal-prajapati-445799289/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-100 transition-colors"><FaLinkedin size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-gray-200 text-sm">
              <li><a href="#home" className="hover:underline">Home</a></li>
              <li><a href="#how" className="hover:underline">How it Works</a></li>
              <li><a href="#faq" className="hover:underline">FAQ</a></li>
              <li><a href="#contact" className="hover:underline">Contact</a></li>
            </ul>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-semibold mb-3">Explore</h4>
            <ul className="space-y-2 text-gray-200 text-sm">
              <li><a href="/dashboard" className="hover:underline">Dashboard</a></li>
              <li><a href="/mypdf" className="hover:underline">Notes</a></li>
              <li><a href="/chat" className="hover:underline">Chat</a></li>
              <li><a href="/team" className="hover:underline">Contributors</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-3">Services</h4>
            <ul className="space-y-2 text-gray-200 text-sm">
              <li><a href="/easy-projects" className="hover:underline">Browse Projects</a></li>
              <li><a href="/my-bookings" className="hover:underline">My Bookings</a></li>
              <li><a href="/blogs" className="hover:underline">Read Blogs</a></li>
            </ul>
          </div>

          {/* Support & Newsletter */}
          <div>
            <h4 className="font-semibold mb-3">Support</h4>
            <ul className="space-y-2 text-gray-200 text-sm mb-4">
              <li><a href="/about-home" className="hover:underline">About Us</a></li>
              <li><a href="/contact" className="hover:underline">Contact Us</a></li>
              <li><a href="/terms" className="hover:underline">Terms & Conditions</a></li>
              <li><a href="#" className="hover:underline">Help Center</a></li>
              <li><a href="/Career" className="hover:underline">Careers</a></li>
            </ul>

          </div>

        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-gray-300 mt-8">
          © {new Date().getFullYear()} NoteSea. All rights reserved.
        </div>
      </footer>




    </div>
  );
}
