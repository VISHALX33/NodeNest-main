
// import { useState } from 'react';
// import API from '../utils/axios';
// import { useNavigate, Link } from 'react-router-dom'; // 🆕 added Link
// import { Eye, EyeOff } from "lucide-react";
// import NoteNestLogo from "/NoteNestLogo.png";

// export default function LoginForm() {
//   const [data, setData] = useState({ email: '', password: '' });
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) =>
//     setData({ ...data, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (loading) return;
//     setLoading(true);

//     try {
//       const res = await API.post('/users/login', data);
//       localStorage.setItem('token', res.data.token);
//       navigate('/dashboard');
//     } catch (err) {
//       alert(err.response?.data?.message || 'Login failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       {/* Hero Section */}
//       <div className="bg-emerald-100 rounded-3xl p-6 md:p-10 flex flex-col md:flex-row justify-between items-center gap-6 mb-10 shadow-lg border border-emerald-200">
//         <div className="flex-1">
//           <h2 className="text-3xl md:text-4xl font-bold text-emerald-800 leading-snug">
//             Discover Smart Study & Services with{" "}
//             <span className="text-emerald-900">NoteNest</span>
//           </h2>
//           <p className="mt-3 text-emerald-700 text-sm max-w-md">
//             One platform to download notes, manage tasks, chat with peers, and
//             book services — all in one place.
//           </p>
//           <br />
//           <br />
//           <h2 className="text-xl md:text-xl font-bold text-emerald-800 leading-snug">
//             Free RTU notes of all semester!!
//           </h2>
//           <h2 className="text-xl md:text-xl font-bold text-emerald-800 leading-snug">
//             Select your semester to get free notes!!
//           </h2>
//         </div>
//         <div className="flex-1">
//           <img
//             src={NoteNestLogo}
//             alt="Study Illustration"
//             className="hidden md:block w-66 max-w-xs md:max-w-sm mx-auto"
//           />
//         </div>
//       </div>

//       {/* Login Form */}
//       <form onSubmit={handleSubmit} className="space-y-5">
//         <div className="text-center mb-2">
//           <h2 className="text-2xl font-bold text-emerald-700">Welcome Back</h2>
//           <p className="text-sm text-gray-600 mt-1">Please login</p>
//         </div>

//         <input
//           type="email"
//           name="email"
//           placeholder="Enter your email"
//           onChange={handleChange}
//           required
//           className="w-full px-4 py-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
//         />

//         {/* 👁️ Password with toggle */}
//         <div className="relative">
//           <input
//             type={showPassword ? "text" : "password"}
//             name="password"
//             placeholder="Enter your password"
//             onChange={handleChange}
//             required
//             className="w-full px-4 py-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 pr-10"
//           />
//           <button
//             type="button"
//             onClick={() => setShowPassword(!showPassword)}
//             className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
//           >
//             {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//           </button>
//         </div>

//         {/* Forgot password link (just under password field) */}
//         <div className="text-right">
//           <Link to="/forgot-password" className="text-sm text-emerald-600 hover:underline">
//             Forgot Password?
//           </Link>
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           className={`w-full py-2 rounded-lg font-semibold transition ${
//             loading
//               ? "bg-gray-400 cursor-not-allowed"
//               : "bg-emerald-600 hover:bg-emerald-700 text-white"
//           }`}
//         >
//           {loading ? "Logging in..." : "Login"}
//         </button>
//       </form>
//     </>
//   );
// }



import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, ArrowRight, ChevronDown } from "lucide-react";
import API from "../utils/axios";
import NoteNestLogo from "/NoteNestLogo.png";
import { motion } from "framer-motion";
import { FaUserGraduate, FaBookOpen, FaDownload } from "react-icons/fa";

export default function LandingPage() {
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
    { name: "Aarav Mehta", text: "NoteNest has been a game changer for my semester exams. Free RTU notes are a lifesaver!", avatar: "https://i.pravatar.cc/100?img=1" },
    { name: "Simran Kaur", text: "I love how I can manage tasks and access notes all in one platform. Makes studying easier!", avatar: "https://i.pravatar.cc/100?img=2" },
    { name: "Rohit Sharma", text: "The best part is the simple login and smooth dashboard. Highly recommend it to students.", avatar: "https://i.pravatar.cc/100?img=3" },
  ];

  const faqs = [
    { q: "Is NoteNest free to use?", a: "Yes! All RTU notes are completely free for students." },
    { q: "Can I access notes for any semester?", a: "Yes, you can select your semester and download notes easily." },
    { q: "Is there a task manager inside NoteNest?", a: "Yes, you can manage assignments, tasks, and reminders inside." },
    { q: "Do I need to create an account?", a: "Yes, you need to login to access dashboard and save progress." },
  ];

  return (
    <div className="font-sans">
      {/* 🌟 Navbar */}
      <nav className="fixed top-0 w-full bg-white shadow z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src={NoteNestLogo} alt="logo" className="h-8 w-8" />
            <span className="font-bold text-emerald-700 text-xl">NoteNest</span>
          </div>
          <div className="hidden md:flex gap-8 text-gray-700 font-medium">
            <a href="#home" className="hover:text-emerald-600">Home</a>
            <a href="#how" className="hover:text-emerald-600">How it Works</a>
            <a href="#login" className="hover:text-emerald-600">Login</a>
            <a href="#testimonials" className="hover:text-emerald-600">Testimonials</a>
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
            <a href="#about" className="bg-gray-100 text-gray-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition">Learn More</a>
          </div>
        </div>
        <div className="flex-1">
          <img src={NoteNestLogo} alt="Hero illustration" className="w-full max-w-md mx-auto" />
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
<section id="login" className="py-20">
  <div className="max-w-6xl mx-auto px-6">
    <div className="flex flex-col md:flex-row items-center gap-10">
      
      {/* Login Form */}
      <div className="flex-1">
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="text-right">
            <Link to="/forgot-password" className="text-sm text-emerald-600 hover:underline">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg font-semibold transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-emerald-600 hover:bg-emerald-700 text-white"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>

      {/* Image on Right */}
      <div className="flex-1">
        <img
          src={NoteNestLogo} // replace with your desired image
          alt="Login Illustration"
          className="w-full max-w-md mx-auto"
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
          src={NoteNestLogo} // replace with your desired image
          alt="FAQ Illustration"
          className="w-full max-w-md mx-auto"
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
                  className={`w-5 h-5 transform transition ${
                    openFAQ === i ? "rotate-180" : ""
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
      <footer className="bg-emerald-700 text-white py-10">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-xl">NoteNest</h3>
            <p className="mt-2 text-sm text-gray-200">One platform to manage notes, tasks, and study resources for students.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-gray-200 text-sm">
              <li><a href="#home" className="hover:underline">Home</a></li>
              <li><a href="#how" className="hover:underline">How it Works</a></li>
              <li><a href="#faq" className="hover:underline">FAQ</a></li>
              <li><a href="#contact" className="hover:underline">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Contact</h4>
            <p className="text-sm text-gray-200">Email: support@notenest.com</p>
            <p className="text-sm text-gray-200">Phone: +91 98765 43210</p>
          </div>
        </div>
        <div className="text-center text-sm text-gray-300 mt-6">© {new Date().getFullYear()} NoteNest. All rights reserved.</div>
      </footer>
    </div>
  );
}
