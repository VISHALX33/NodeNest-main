import React from "react";
import { FaBriefcase, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import Navbar from "./Navbar";

export default function Career() {
  const jobs = [
    {
      id: 1,
      title: "Frontend Developer (React)",
      location: "Remote / India",
      type: "Full-time",
      description:
        "We’re looking for a React developer who can build beautiful and responsive UI components. You’ll work closely with the design and backend teams to deliver high-quality web experiences.",
    },
    {
      id: 2,
      title: "Backend Developer (Node.js)",
      location: "Remote / India",
      type: "Full-time",
      description:
        "Join our backend team to design scalable APIs, manage databases, and integrate new features into NoteSea’s ecosystem. Prior experience with MongoDB and Express is a plus.",
    },
    {
      id: 3,
      title: "AI Engineer / Intern",
      location: "Hybrid / Remote",
      type: "Internship",
      description:
        "Work on AI-based note recommendations and chatbot improvements. Ideal for someone passionate about machine learning, NLP, and building real-world AI tools.",
    },
  ];

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-emerald-50 flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Join the NoteSea Team
        </h1>
        <p className="max-w-2xl mx-auto text-lg opacity-90">
          We’re on a mission to make learning smarter, simpler, and more
          collaborative. Come grow with us!
        </p>
      </header>

      {/* Job Listings */}
      <section className="flex-1 py-12 px-6 md:px-12 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-emerald-700 mb-8 text-center">
          Current Openings
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-2xl shadow-sm border border-emerald-100 p-6 hover:shadow-md transition"
            >
              <h3 className="text-xl font-semibold text-emerald-700 flex items-center gap-2 mb-2">
                <FaBriefcase className="text-emerald-500" /> {job.title}
              </h3>
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                <span className="flex items-center gap-1">
                  <FaMapMarkerAlt className="text-emerald-500" /> {job.location}
                </span>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
                  {job.type}
                </span>
              </div>
              <p className="text-gray-700 text-sm mb-6 leading-relaxed">
                {job.description}
              </p>
              <a
                href="mailto:careers@notesea.xyz"
                className="inline-flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-emerald-700 transition"
              >
                <FaEnvelope /> Apply Now
              </a>
            </div>
          ))}
        </div>

        {/* No Jobs? */}
        {jobs.length === 0 && (
          <p className="text-center text-gray-600 mt-12">
            No openings right now — but we’d still love to hear from you!  
            Send your resume to{" "}
            <a
              href="mailto:careers@notesea.xyz"
              className="text-emerald-600 underline"
            >
              careers@notesea.xyz
            </a>
          </p>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-emerald-600 text-white py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Build the Future of Learning 🚀</h2>
        <p className="mb-6 opacity-90">
          Whether you’re an engineer, designer, or creator — NoteSea has a place for you.
        </p>
        <a
          href="mailto:careers@notesea.xyz"
          className="bg-white text-emerald-600 px-6 py-3 rounded-full font-semibold hover:bg-emerald-50 transition"
        >
          Send Your Resume
        </a>
      </section>
    </div>
    </>
  );
}
