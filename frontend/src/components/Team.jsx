import React from "react";
// import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import vishalImg from "../assets/Vishalp.jpg";
import Rishabh from "../assets/Rishabh.jpg";
import Krishna from "../assets/Krishna.jpg";
import Aditya from "../assets/Aditya.jpg";
import Mohit from "../assets/Mohit.jpg";
import Primetheorist from "../assets/Primetheorist.jpg";

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
      name: "Primetheorist",
      role: "Full Stack Developer",
      image: Primetheorist,
    },
    {
      name: "Rishabh Mishra",
      role: "Full Stack Developer",
      image: Rishabh,
      github: "#",
      linkedin: "#",
      instagram: "#",
    },
    {
      name: "Krishna Sharma",
      role: "Frontend Developer",
      image: Krishna,
      github: "#",
      linkedin: "#",
      instagram: "#",
    },
    {
      name: "Aditya Vaishnav",
      role: "Frontend Developer",
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
      {/* 🌟 Our Partners */}
<div className="bg-white py-16 px-6 mt-20">
  <div className="max-w-6xl mx-auto">
    <h1 className="text-4xl font-bold text-emerald-700 mb-12 text-center">
      Our Partners
    </h1>

    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-10">
      {[
        {
          name: "Khushi Photocopy & Printout",
          logo:
            "https://res.cloudinary.com/dwq5qifuk/image/upload/v1763982004/k_qk95m1.webp",
        },
        // {
        //   name: "BookMart Jaipur",
        //   logo:
        //     "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Books-aj.svg/2048px-Books-aj.svg.png",
        // },
        // {
        //   name: "TechFix Laptop Service",
        //   logo:
        //     "https://cdn-icons-png.flaticon.com/512/907/907717.png",
        // },
        // {
        //   name: "PrintZone Digital Lab",
        //   logo:
        //     "https://cdn-icons-png.flaticon.com/512/3039/3039387.png",
        // },
      ].map((partner, index) => (
        <div
          key={index}
          className="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-center"
        >
          {/* Partner Logo */}
          <div className="w-full h-28 flex items-center justify-center mb-4">
            <img
              src={partner.logo}
              alt={partner.name}
              className="h-full object-contain"
            />
          </div>

          {/* Partner Name */}
          <h3 className="font-semibold text-gray-800 text-lg">
            {partner.name}
          </h3>
        </div>
      ))}
    </div>
  </div>
</div>

    </div>
  );
}
