import { useEffect, useState } from "react";
import API from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { FaLaptopCode, FaRocket } from "react-icons/fa";
import NoteNestLogo from "/NoteNestLogo.png";
import ProjectService from "./projectService";
import hero from "/hero.png";
import NoteSeaStory from "./NoteSeaStory";
import DashboardPopup from "./DashboardPopup";
import ResearchDocumentation from "./ResearchDocumentation";


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
  {
    title: "Episode 8 — Doing SEO in  notesea",
    url: "https://youtu.be/jVTRDA4nhWM?si=1KKAZlU8XzX5BBtd",
  },
  {
    title: "Episode 9 — Contributer section is open for everyone",
    url: "https://youtu.be/sGV7AOVDJ8w?si=KTGcN2M41_2W0EvN",
  },
  {
    title: "Episode 10 — Why students should use notesea",
    url: "https://youtu.be/0rRc_Pa6bwk?si=DsW2RWX91x4K_otK",
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
    },
    {
      title: "API Development & Integration",
      desc: "Custom REST APIs and third-party API integrations for seamless communication between systems."
    },
    {
      title: "Maintenance & Support",
      desc: "Ongoing support, bug fixing, and updates to keep your application running smoothly."
    },
    {
      title: "College Reports",
      desc: "Well-structured academic reports with proper formatting, clear content, and plagiarism-free writing."
    },
    {
      title: "Research Papers",
      desc: "High-quality research papers with proper citations, formatting (IEEE/APA), and original content."
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

function OurAchievements() {
  const achievements = [
    { value: "200+", label: "Active Users" },
    { value: "4.8★", label: "Student Satisfaction" },
    { value: "10+", label: "Projects Delivered" },
    { value: "5+", label: "Research Papers" },
    { value: "98%", label: "Success Rate" },
    { value: "6-8 Hr", label: "Delivery Time" },
  ];

  return (
    <div className="max-w-6xl mx-auto mt-16 px-4">
      <h2 className="text-3xl font-bold text-center text-emerald-700 mb-6">
        Our Achievements
      </h2>
      <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
        Milestones and successes we have achieved through dedication, innovation, and teamwork.
      </p>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">

        {achievements.map((item, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition text-center"
          >
            <h3 className="text-2xl font-bold text-emerald-700">{item.value}</h3>
            <p className="text-gray-600 mt-2 text-sm">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}



// ✅ Custom Projects Section
import customProjectImg from "../assets/custom.png"; // optional illustration

function CustomProjects() {
  return (
    <div className="max-w-6xl mx-auto mt-20 px-4">
      <div className="grid md:grid-cols-2 items-center gap-10 bg-gradient-to-r from-emerald-100 to-emerald-200 p-10 rounded-3xl shadow-lg">
        {/* Text Section */}
        <div>
          <h2 className="text-3xl font-bold text-emerald-700 mb-4">
            Custom Projects
          </h2>
          <p className="text-gray-600 mb-6 max-w-md">
            Didn’t find what you need in Easy, Medium, or Advanced projects?
            We also build <strong>custom full-stack projects</strong> tailored for your requirements.
          </p>

          <div className="flex items-center gap-4 mb-6">
            <FaLaptopCode className="text-emerald-700 text-3xl" />
            <p className="text-gray-700">
              Design & Development: We craft projects tailored to your idea.
            </p>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <FaRocket className="text-emerald-700 text-3xl" />
            <p className="text-gray-700">
              Deployment & Support: Get your project live and fully functional.
            </p>
          </div>

          <a
            href="mailto:notesea.help@gmail.com"
            className="inline-block px-8 py-3 bg-emerald-700 text-white rounded-xl shadow-lg hover:bg-emerald-800 transition transform hover:-translate-y-1"
          >
            Contact Us
          </a>
        </div>

        {/* Illustration/Image */}
        <div className="hidden md:block">
          <img
            src={customProjectImg}
            alt="Custom Project Illustration"
            className="w-full rounded-2xl shadow-md"
          />
        </div>
      </div>
    </div>
  );
}




export default function Dashboard() {
  const [semesters, setSemesters] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/semesters").then((res) => setSemesters(res.data));
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 relative">
      <DashboardPopup />
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

      <br />
      <hr />
      <br />

      {/* Existing Projects */}
      <ProjectService />
      <ResearchDocumentation />

      {/* New Sections */}

      <WhatWeOffer />
      <OurAchievements />
      <NoteSeaStory videos={videos} />
      <CustomProjects />

      <br />
      <br />
      <br />
      <br />
    </div>
  );
}
