import React from "react";
// import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import vishalImg from "../assets/Vishalp.jpg";
import Rishabh from "../assets/Rishabh.jpg";
import Krishna from "../assets/Krishna.jpg";
import Aditya from "../assets/Aditya.jpg";
import Mohit from "../assets/Mohit.jpg";

export default function Team() {
  const teamMembers = [
    {
      name: "Vishal Prajapati",
      role: "Founder & Developer",
      image: vishalImg,
      github: "#",
      linkedin: "#",
      instagram: "#",
    },
    {
      name: "Mohit Dad",
      role: "Developer & Growth",
      image: Mohit,
      github: "#",
      linkedin: "#",
      instagram: "#",
    },
    {
      name: "Rishabh Mishra",
      role: "Documentation Support",
      image: Rishabh,
      github: "#",
      linkedin: "#",
      instagram: "#",
    },
    {
      name: "Krishna Sharma",
      role: "Documentation Support",
      image: Krishna,
      github: "#",
      linkedin: "#",
      instagram: "#",
    },
    {
      name: "Aditya Vaishnav",
      role: "Documentation Support",
      image: Aditya,
      github: "#",
      linkedin: "#",
      instagram: "#",
    },
  ];

  return (
    <div className="bg-gray-50 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-emerald-700 mb-12 text-center">
          Our Contributors
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:-translate-y-2 transition-all duration-300"
            >
              {/* Top Banner */}
              <div className="bg-emerald-600 h-24 relative">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full border-4 border-white absolute left-1/2 transform -translate-x-1/2 bottom-[-2.5rem] object-cover"
                />
              </div>

              {/* Info */}
              <div className="pt-14 pb-6 px-6 text-center">
                <h2 className="text-lg font-semibold text-gray-800">
                  {member.name}
                </h2>
                <p className="text-sm text-gray-500 mb-3">{member.role}</p>

                {/* Social Icons */}
                {/* <div className="flex justify-center space-x-4 text-emerald-600 mb-4">
                  <a href={member.github} className="hover:text-gray-700">
                    <FaGithub size={18} />
                  </a>
                  <a href={member.linkedin} className="hover:text-gray-700">
                    <FaLinkedin size={18} />
                  </a>
                  <a href={member.instagram} className="hover:text-gray-700">
                    <FaInstagram size={18} />
                  </a>
                </div> */}

          

                
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
