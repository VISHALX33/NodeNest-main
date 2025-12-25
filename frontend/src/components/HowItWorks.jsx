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
  FaProjectDiagram,
  FaVideo,
  FaMoneyBillWave,
  FaInstagram
} from "react-icons/fa";

export default function HowItWorks() {
  /* General Steps */
  const steps = [
    {
      icon: <FaUserGraduate size={28} className="text-emerald-600" />,
      title: "Create Account",
      description: "Sign up or log in to access notes, tools, and project services."
    },
    {
      icon: <FaBookOpen size={28} className="text-emerald-600" />,
      title: "Choose What You Need",
      description:
        "Select semester notes, explore ready-made projects, or request custom MERN development."
    },
    {
      icon: <FaDownload size={28} className="text-emerald-600" />,
      title: "Access & Use",
      description:
        "Download notes, buy projects, or get your custom project built by NoteSea."
    }
  ];

  /* Features */
  const features = [
    {
      icon: <FaRegCommentDots size={28} className="text-emerald-600" />,
      title: "Global Chat Room",
      description: "Connect and chat with students from different colleges."
    },
    {
      icon: <FaTasks size={28} className="text-emerald-600" />,
      title: "To-Do Task Manager",
      description: "Manage your daily study tasks efficiently."
    },
    {
      icon: <FaHandsHelping size={28} className="text-emerald-600" />,
      title: "Contribute With Us",
      description:
        "Upload and share notes to help others and grow with the NoteSea community."
    },
    {
      icon: <FaRobot size={28} className="text-emerald-600" />,
      title: "Assignment Chatbot",
      description:
        "Get instant AI-powered help for assignments and study doubts."
    },
    {
      icon: <FaProjectDiagram size={28} className="text-emerald-600" />,
      title: "Project Marketplace",
      description:
        "Buy ready-made or custom Easy, Medium, and Advanced MERN projects."
    }
  ];

  /* Project Purchase Flow */
  const projectFlow = [
    {
      icon: <FaProjectDiagram size={26} className="text-emerald-600" />,
      title: "Select Project",
      description:
        "Choose a project based on your requirement (Easy, Medium, or Advanced)."
    },
    {
      icon: <FaVideo size={26} className="text-emerald-600" />,
      title: "Watch Demo & Preview",
      description:
        "View demo videos and project screenshots to understand features clearly."
    },
    {
      icon: <FaBookOpen size={26} className="text-emerald-600" />,
      title: "Fill Project Form",
      description:
        "Submit required details like name, college, technology, and customization needs."
    },
    {
      icon: <FaMoneyBillWave size={26} className="text-emerald-600" />,
      title: "Make Payment",
      description:
        "Complete secure payment to confirm your project order."
    },
    {
      icon: <FaDownload size={26} className="text-emerald-600" />,
      title: "Project Delivery",
      description:
        "Your project will be delivered to your NoteSea account within 6–8 working hours (Sunday excluded)."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      {/* Title */}
      <h1 className="text-3xl font-bold text-center text-emerald-700 mb-6">
        How NoteSea Works
      </h1>

      <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
        NoteSea helps students with study materials, smart tools, and professional
        project development — all in one platform.
      </p>

      {/* General Steps */}
      <div className="max-w-5xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
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

      {/* Features */}
      <div className="max-w-5xl mx-auto mt-20">
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

      {/* Project Flow */}
      <div className="max-w-6xl mx-auto mt-24">
        <h2 className="text-2xl font-bold text-center text-emerald-700 mb-4">
          How Project Purchase Works
        </h2>

        <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          Simple and transparent process to get your project delivered quickly.
        </p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projectFlow.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-6 text-center border border-gray-200"
            >
              <div className="flex justify-center mb-4">{item.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800">
                {item.title}
              </h3>
              <p className="text-gray-600 mt-2">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Support Note */}
        {/* Support Card */}
<div className="bg-white rounded-2xl shadow-md p-6 text-center border border-emerald-200 mt-8">
  <div className="flex justify-center mb-4">
    <FaInstagram size={28} className="text-emerald-600" />
  </div>
  <h3 className="text-lg font-semibold text-gray-800 mb-2">
    Need Help?
  </h3>
  <p className="text-gray-700 mb-3">
    ⚠️ If you face any issues during project setup or execution, feel free to message us for quick support.
  </p>
  <a
    href="https://www.instagram.com/notesea.xyz/"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 text-emerald-700 font-semibold hover:text-emerald-800"
  >
    Message us on Instagram
  </a>
</div>

      </div>

      {/* LinkedIn */}
      <div className="text-center mt-24">
        <a
          href="https://www.linkedin.com/in/noteseadotxyz/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-emerald-700 font-medium hover:text-emerald-800 transition"
        >
          <FaLinkedin size={22} />
          Connect with me on LinkedIn
        </a>
      </div>
    </div>
  );
}
