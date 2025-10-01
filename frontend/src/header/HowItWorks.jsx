import React from "react";
import {
  FaUserGraduate,
  FaBookOpen,
  FaDownload,
  FaRegCommentDots,
  FaTasks,
  FaHandsHelping,
  FaLinkedin,
  FaRobot,
  FaProjectDiagram
} from "react-icons/fa";

export default function HowItWorks() {
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

  const features = [
    {
      icon: <FaRegCommentDots size={28} className="text-emerald-600" />,
      title: "Global Chat Room",
      description: "Chat and connect with students worldwide."
    },
    {
      icon: <FaTasks size={28} className="text-emerald-600" />,
      title: "To-Do Task Manager",
      description: "Organize your tasks and stay on top of your studies."
    },
    {
      icon: <FaHandsHelping size={28} className="text-emerald-600" />,
      title: "Contribute With Us",
      description: "Be a part of NoteNest. Share your notes and contribute to the project."
    },
    {
      icon: <FaRobot size={28} className="text-emerald-600" />,
      title: "Assignment Chatbot",
      description: "Get instant help from our AI-powered chatbot for your assignments."
    },
    {
      icon: <FaProjectDiagram size={28} className="text-emerald-600" />,
      title: "Project Marketplace",
      description: "Explore and purchase Easy, Medium, and Advanced level projects."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <h1 className="text-3xl font-bold text-center text-emerald-700 mb-12">
        How It Works
      </h1>

      {/* Steps Section */}
      <div className="max-w-4xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md p-6 text-center border-t-4 border-emerald-500"
          >
            <div className="flex justify-center mb-4">{step.icon}</div>
            <h2 className="text-lg font-semibold text-gray-800">
              Step {index + 1}: {step.title}
            </h2>
            <p className="text-gray-600 mt-2">{step.description}</p>
          </div>
        ))}
      </div>

      {/* Features Section */}
      <div className="max-w-5xl mx-auto mt-16">
        <h2 className="text-2xl font-bold text-center text-emerald-700 mb-8">
          Features for You
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl shadow-md p-6 text-center border ${
                feature.title.includes("Contribute")
                  ? "border-emerald-600 shadow-lg scale-105"
                  : "border-gray-200"
              }`}
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800">
                {feature.title}
              </h3>
              <p className="text-gray-600 mt-2">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Project Section */}
      <div className="max-w-5xl mx-auto mt-20">
        <h2 className="text-2xl font-bold text-center text-emerald-700 mb-8">
          Project Levels
        </h2>
        <div className="grid gap-8 sm:grid-cols-3">
          {["Easy", "Medium", "Advanced"].map((level, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-6 text-center border border-gray-200 hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-gray-800">{level} Projects</h3>
              <p className="text-gray-600 mt-2">
                Download {level.toLowerCase()} level full-stack projects.
              </p>
              
            </div>
          ))}
        </div>
      </div>

      {/* LinkedIn Section */}
      <div className="text-center mt-16">
        <a
          href="https://www.linkedin.com/in/vishal-prajapati-445799289/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-emerald-700 font-medium hover:text-emerald-800 transition"
        >
          <FaLinkedin size={22} />
          Connect with me on LinkedIn
        </a>
        <br />
        <br />
        <br />
      </div>
    </div>
  );
}
