import React from "react";

export default function Soon() {
  const projectLevels = [
    {
      level: "🟢 Easy Projects",
      description: "Basic CRUD apps – quick to build & perfect for students.",
      examples: ["Todo App", "Notes App","URL Shortener", "Weather App", "Contact Manager", "Blog CMS (Basic)", "Portfolio Website", "Recipe App", "Quiz App"],
      pricing: {
        student: "₹500 – ₹1,500",
        business: "₹2,000 – ₹5,000",
      },
    },
    {
      level: "🟡 Medium Projects",
      description:
        "Intermediate apps with authentication, dashboards & real-time features.",
      examples: [
        "Auth System",
        "Expense Tracker",
        "Chat App",
        "Blog CMS (Advanced)",
        "Basic E-commerce",
        "Event Booking System",
        "Fitness Tracker",
        "Job Board",
        "Forum/Discussion Board",
      ],
      pricing: {
        student: "₹2,000 – ₹5,000",
        business: "₹8,000 – ₹20,000",
      },
    },
    {
      level: "🔴 Hard Projects",
      description:
        "Production-ready SaaS-level apps with payments, scaling & advanced features.",
      examples: [
        "Full E-commerce Store",
        "Social Media Platform",
        "LMS (Learning Management System)",
        "Project Management Tool",
        "AI-Integrated App",
        "Real-Time Collaboration Tool",
        "Multi-Tenant SaaS",
        "Subscription Service",
        "Analytics Dashboard",
        

      ],
      pricing: {
        student: "₹7,000 – ₹15,000",
        business: "₹25,000 – ₹80,000+",
      },
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
        🚀 Coming Soon: Project Development Services
      </h1>
      <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
        At <b>NoteNest</b>, we don’t just provide notes — we also <b>build full
        MERN projects</b> for students and businesses.  
        Choose your project level and plan:
      </p>

      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {projectLevels.map((category, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition flex flex-col justify-between"
          >
            <div>
              <h2 className="text-xl font-semibold text-green-600 mb-3 text-center">
                {category.level}
              </h2>
              <p className="text-gray-500 text-sm text-center mb-4">
                {category.description}
              </p>
              <ul className="space-y-2 text-gray-700 text-sm mb-6">
                {category.examples.map((project, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2"></span>
                    {project}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t pt-4 text-sm">
              <p className="text-gray-600 mb-1">
                <b>🎓 Student Plan:</b>{" "}
                <span className="text-green-600 font-semibold">
                  {category.pricing.student}
                </span>
              </p>
              <p className="text-gray-600">
                <b>🏢 Business Plan:</b>{" "}
                <span className="text-green-600 font-semibold">
                  {category.pricing.business}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-12 text-center text-gray-500 text-sm">
        📩 Contact us to discuss your project and get it built with{" "}
        <b>NoteNest</b>.
      </p> */}
    </div>
  );
}
