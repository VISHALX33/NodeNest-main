
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../utils/axios';

export default function ProjectService() {
  const [projects, setProjects] = useState({ easy: [], medium: [], hard: [] });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const [easy, medium, hard] = await Promise.all([
          API.get('/projects?category=easy'),
          API.get('/projects?category=medium'),
          API.get('/projects?category=hard')
        ]);
        setProjects({
          easy: easy.data,
          medium: medium.data,
          hard: hard.data
        });
      } catch (err) {
        console.error('Error fetching projects:', err);
      }
    };
    fetchProjects();
  }, []);

  const projectLevels = [
    {
      level: ' Grab Your Projects',
      description: 'Basic CRUD apps – quick to build & perfect for students.',
      projects: projects.easy,
      link: '/easy-projects'
    },
    {
      level: 'Buy Great Projects',
      description: 'Intermediate apps with authentication, dashboards & real-time features.',
      projects: projects.medium,
      link: '/medium-projects'
    },
    {
      level: 'Discover And Buy',
      description: 'Production-ready SaaS-level apps with payments, scaling & advanced features.',
      projects: projects.hard,
      link: '/hard-projects'
    }
  ];

  const showcaseProjects = [
  {
    name: "Car Rental Website",
    image: "https://res.cloudinary.com/dwq5qifuk/image/upload/v1765369795/Screenshot_2025-12-10_175747_fw58hc.png",
  },
  {
    name: "Hotel Booking Website",
    image: "https://res.cloudinary.com/dwq5qifuk/image/upload/v1766147229/Screenshot_2025-12-19_175403_kxdrhp.png",
  },
  {
    name: "Food Delivery Website",
    image: "https://res.cloudinary.com/dwq5qifuk/image/upload/v1766596623/Screenshot_2025-12-24_224505_tugvg4.png",
  },
  {
    name: "Personal Portfolio Website",
    image: "https://res.cloudinary.com/dwq5qifuk/image/upload/v1765636402/Screenshot_2025-12-13_195704_y2dguv.png",
  },
  {
    name: "Gym and Fitness Website",
    image: "https://res.cloudinary.com/dwq5qifuk/image/upload/v1765996467/Screenshot_2025-12-18_000157_z8hsrd.png",
  },
  {
    name: "Mini Social Media App",
    image: "https://res.cloudinary.com/dwq5qifuk/image/upload/v1766387689/Screenshot_2025-12-22_124212_ms34yv.png",
  },
];


  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Elegant Coupon Announcement */}
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl shadow-lg p-6 mb-8 border-2 border-emerald-200 relative">
        <div className="absolute -top-3 -right-3 bg-emerald-600 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg">
          ✨ New Feature
        </div>
        
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center text-4xl shadow-lg transform hover:scale-110 transition-transform">
            🎁
          </div>
          
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-emerald-800 mb-2">
              Earn Rewards & Get Discounts!
            </h3>
            <p className="text-gray-700 mb-3">
              Play our interactive <span className="font-semibold text-emerald-700">SCard Game</span> daily to collect points and compete for exclusive project discounts.
            </p>
            
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-blue-200">
                <span className="text-2xl">🏆</span>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Weekly Top 3</p>
                  <p className="text-sm font-bold text-blue-600">10% OFF</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-orange-200">
                <span className="text-2xl">🥇</span>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Monthly Top 3</p>
                  <p className="text-sm font-bold text-orange-600">30% OFF</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-purple-200">
                <span className="text-2xl">👑</span>
                <div>
                  <p className="text-xs text-gray-500 font-medium">#1 Lifetime (400+ pts)</p>
                  <p className="text-sm font-bold text-purple-600">FREE Project</p>
                </div>
              </div>
            </div>
          </div>
          
          <a href="/scard" className="flex-shrink-0 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold px-8 py-4 rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all transform hover:scale-105 shadow-lg flex items-center gap-2">
            <span className="text-2xl">🎴</span>
            <span>Start Playing</span>
          </a>
        </div>
      </div>

      <h1 className="text-3xl font-bold text-emerald-700 mb-6 text-center">
         Project Development Services
      </h1>

      <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
        At <b>NoteSea</b>, we don’t just provide notes — we also <b>build full MERN projects</b> for students and businesses.
        Choose your project level and plan:
      </p>

      {/* ✅ New Section: Plan Benefits */}
    


      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {projectLevels.map((category, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition flex flex-col justify-between"
          >
            <div>
              <h2 className="text-xl font-semibold text-black mb-3 text-center">
                {category.level}
              </h2>
              <p className="text-gray-500 text-sm text-center mb-4">
                {category.description}
              </p>
              <ul className="space-y-2 text-gray-700 text-sm mb-6">
                {category.projects.map((project) => (
                  <li key={project._id} className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></span>
                    {project.name}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t pt-4 text-sm">
              <p className="text-gray-600 mb-1">
                <b>🎓 Frontend (Only):</b>{' '}
                <span className="text-emerald-600 font-semibold">
                  ₹{Math.min(...category.projects.map(p => p.studentPrice))} – ₹{Math.max(...category.projects.map(p => p.studentPrice))}
                </span>
              </p>
              <p className="text-gray-600">
                <b>🏢 Full Stack (Full website):</b>{' '}
                <span className="text-emerald-600 font-semibold">
                  ₹{Math.min(...category.projects.map(p => p.businessPrice))} – ₹{Math.max(...category.projects.map(p => p.businessPrice))}
                </span>
              </p>
            </div>

            <Link to={category.link}>
              <button className="mt-4 w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700">
                See All
              </button>
            </Link>
          </div>
        ))}
      </div>

      <p className="mt-12 text-center text-gray-500 text-sm">
        📩 Contact us to discuss your project and get it built with <b>NoteSea</b>.
      </p>


      {/* 🚀 Project Showcase Section */}
<div className="mt-16">
  <h2 className="text-2xl font-bold text-emerald-700 text-center mb-3">
    Project Samples We Build
  </h2>

  <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
    Explore some of the popular websites and systems we develop for students and businesses.
  </p>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
    {showcaseProjects.map((item, index) => (
      <div
        key={index}
        className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden"
      >
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-44 object-cover"
        />

        <div className="p-4 text-center">
          <h3 className="text-lg font-semibold text-gray-800">
            {item.name}
          </h3>
        </div>
      </div>
    ))}
  </div>
</div>

    </div>
    
  );
}
