import React from "react";
import vishalImg from '../assets/Vishalp.png';
import Rishabh from '../assets/Rishabh.jpg';
import Krishna from '../assets/Krishna.jpg';
import Aditya from '../assets/Aditya.jpg';
import Mohit from '../assets/Mohit.jpg';
export default function Team() {
  const teamMembers = [
    {
      name: "Vishal Prajapati",
      role: "Founder & Developer",
      image: vishalImg, 
    },
    {
      name: "Mohit Dad",
      role: "Growth & Marketing",
      image: Mohit, 
    },
    {
      name: "Rishabh Mishra ",
      role: "Documentation Support",
      image: Rishabh, 
    },
    {
      name: "Krishna Sharma",
      role: "Documentation Support",
      image: Krishna, 
    },
    {
      name: "Aditya Vaishnav ",
      role: "Documentation Support",
      image: Aditya, 
    },
    // Add more members here later if needed
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-emerald-700 mb-6 text-center">
        Contributors 
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-lg transition"
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-24 h-24 rounded-full border-4 border-emerald-500 mb-4"
            />
            <h2 className="text-lg font-semibold text-gray-800">
              {member.name}
            </h2>
            <p className="text-sm text-gray-500">{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
/////////////12346 password////////////////////