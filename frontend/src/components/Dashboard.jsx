import { useEffect, useState } from "react";
import API from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { FaRobot } from "react-icons/fa";
import NoteNestLogo from "/NoteNestLogo.png";
import Chatbot from "./chatbot"; // ✅ import your chatbot
import ProjectService from "./projectService";
import hero from "/hero.png";
import NoteSeaStory from "./NoteSeaStory";


const videos = [
  {
    title: "Episode 1 — Project Announcement",
    url: "https://youtu.be/ZIcG812Gs3A?si=oYQo2ujfWL5_opxE",
  },
  {
    title: "Episode 2 — Email Verification & Auth",
    url: "https://youtu.be/lQa35-ERCQ4?si=mRbadWvXt1bPyNIu",
  },
  {
    title: "Episode 3 — Chatbot Integration",
    url: "https://youtu.be/qvVQtmvfZOU?si=dKAQaaTd7twbyVN_",
  },
  {
    title: "Episode 4 — Payment Gateway Integration",
    url: "https://youtu.be/LMJsl80XPK4?si=F1emfResKuihtlu7",
  },
  {
    title: "Episode 5 — install button and UI Improvements",
    url: "https://youtu.be/66BbL364094?si=s461MD1CV5jxhxZr",
  },
  {
    title: "Episode 6 — NoteNest to NoteSea Rebranding",
    url: "https://youtu.be/01nL7qOWzLU?si=tZDS4-zsuZ2-RNEJ",
  },
  {
    title: "Episode 7 — buying domain for notesea",
    url: "https://youtu.be/aYSamUbFhxk?si=0u54nF0QkD3ucXIo",
  },
];


// ✅ What We Offer Section
function WhatWeOffer() {
  const offers = [
    {
      title: "Web Development",
      desc: "Responsive websites and web applications tailored for students and college projects."
    },
    {
      title: "Mobile Apps",
      desc: "Cross-platform mobile applications using React Native for iOS and Android."
    },
    {
      title: "UI/UX Design",
      desc: "Beautiful and intuitive designs that enhance user experience and engagement."
    },
    {
      title: "Project Deployment",
      desc: "Complete deployment solutions with domain setup and hosting configuration."
    }
    
  ];

  return (
    <div className="max-w-6xl mx-auto mt-16 px-4">
      <h2 className="text-3xl font-bold text-center text-emerald-700 mb-6">
        Services For Students
      </h2>
      <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
        Comprehensive web and mobile solutions designed specifically for student needs and budgets.
      </p>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {offers.map((item, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold text-emerald-700">{item.title}</h3>
            <p className="text-gray-600 mt-3 text-sm">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ✅ Custom Projects Section
function CustomProjects() {
  return (
    <div className="max-w-6xl mx-auto mt-20 px-4">
      <h2 className="text-3xl font-bold text-center text-emerald-700 mb-6">
        Custom Projects
      </h2>
      <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
        Didn’t find what you need in Easy, Medium, or Advanced projects?  
        We also build <strong>custom full-stack projects</strong> tailored for your requirements.
      </p>

      <div className="bg-gradient-to-r from-emerald-100 to-emerald-200 p-8 rounded-3xl shadow-lg text-center">
        <h3 className="text-xl font-semibold text-emerald-800 mb-3">
          Get Your Own Project Built
        </h3>
        <p className="text-gray-700 mb-6">
          Share your project idea and we’ll help you design, develop, and deploy it 
          within your budget and timeline.
        </p>
        <button className="px-6 py-3 bg-emerald-700 text-white rounded-xl shadow hover:bg-emerald-800 transition">
          Contact Mail :- notesea.help@gmail.com
        </button>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [semesters, setSemesters] = useState([]);
  const [showChatbot, setShowChatbot] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/semesters").then((res) => setSemesters(res.data));
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 relative">
      {/* Banner */}
      <div className="bg-white rounded-3xl p-6 md:p-10 flex flex-col md:flex-row justify-between items-center gap-6 mb-10 shadow-lg border border-emerald-200">
        <div className="flex-1">
          <h2 className="text-3xl md:text-4xl font-bold text-emerald-800 leading-snug">
            Discover Smart Study & Services with{" "}
            <span className="text-emerald-900">NoteSea</span>
          </h2>
          <p className="mt-3 text-emerald-700 text-sm max-w-md">
            One platform to download notes, manage tasks, chat with peers, and
            book services — all in one place.
          </p>
          <br />
          <br />
          <h2 className="text-xl md:text-xl font-bold text-emerald-800 leading-snug">
            Free RTU notes of all semester !!  
          </h2>
          <h2 className="text-xl md:text-xl font-bold text-emerald-800 leading-snug">
            Select your semester to get free notes!
          </h2>
        </div>
        <div className="flex-1">
          <img
            src={hero}
            alt="Study Illustration"
            className="hidden md:block w-full max-w-xs md:max-w-sm mx-auto"
          />
        </div>
      </div>

      {/* Semester Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
        {semesters.map((s) => (
          <div
            key={s._id}
            onClick={() => navigate(`/semesters/${s._id}`)}
            className="bg-emerald-100 rounded-xl shadow-md border border-emerald-100 hover:bg-emerald-50 hover:shadow-lg transition-all duration-200 cursor-pointer p-6 text-center"
          >
            <span className="text-lg font-semibold text-black">{s.title}</span>
          </div>
        ))}
      </div>
    
    {/* Semester Section with Image */}
{/* <div className="flex flex-col md:flex-row items-center gap-10 mt-10">
  <div className="flex-1 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-5">
    {semesters.map((s) => (
      <div
        key={s._id}
        onClick={() => navigate(`/semesters/${s._id}`)}
        className="bg-emerald-100 rounded-xl shadow-md border border-emerald-100 hover:bg-emerald-50 hover:shadow-lg transition-all duration-200 cursor-pointer p-6 text-center"
      >
        <span className="text-lg font-semibold text-black">{s.title}</span>
      </div>
    ))}
  </div>

  <div className="flex-1 flex justify-center">
    <img
      src={NoteNestLogo} 
      alt="Semester Illustration"
      className="w-full max-w-sm rounded-2xl shadow-lg"
    />
  </div>
</div> */}


      

      <br />
      <hr />
      <br />

      {/* Existing Projects */}
      <ProjectService />

      {/* New Sections */}
      <WhatWeOffer />
      <NoteSeaStory videos={videos}/> 
      <CustomProjects />

      {/* Floating Chatbot Icon */}
      <div
        className="fixed bottom-28 right-6 w-16 h-16 bg-emerald-600 rounded-full shadow-lg flex items-center justify-center cursor-pointer z-50 hover:scale-110 transition-transform"
        onClick={() => setShowChatbot(!showChatbot)}
        title="Solve your problems"
      >
        <FaRobot className="text-white text-xl" />
      </div>

      {/* Chatbot Popup */}
      {showChatbot && (
        <div className="fixed bottom-20 right-6 w-80 h-[28rem] bg-white border border-gray-200 rounded-2xl shadow-lg flex flex-col overflow-hidden">
          <div className="bg-emerald-600 text-white px-4 py-2 flex justify-between items-center">
            <span className="font-semibold">Solve your problems 🤖</span>
            <button
              onClick={() => setShowChatbot(false)}
              className="text-white hover:text-gray-200"
            >
              ✖
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <Chatbot />
          </div>
        </div>
      )}

      <br />
      <br />
      <br />
      <br />
    </div>
  );
}
