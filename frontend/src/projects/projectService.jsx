
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
      level: '🟢 Easy Projects',
      description: 'Basic CRUD apps – quick to build & perfect for students.',
      projects: projects.easy,
      link: '/easy-projects'
    },
    {
      level: '🟡 Medium Projects',
      description: 'Intermediate apps with authentication, dashboards & real-time features.',
      projects: projects.medium,
      link: '/medium-projects'
    },
    {
      level: '🔴 Advance Projects',
      description: 'Production-ready SaaS-level apps with payments, scaling & advanced features.',
      projects: projects.hard,
      link: '/hard-projects'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-emerald-700 mb-6 text-center">
         Project Development Services
      </h1>

      <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
        At <b>NoteSea</b>, we don’t just provide notes — we also <b>build full MERN projects</b> for students and businesses.
        Choose your project level and plan:
      </p>

      {/* ✅ New Section: Plan Benefits */}
      <div className="bg-emerald-50 p-6 rounded-2xl mb-10 shadow-md">
        <h2 className="text-2xl font-semibold text-emerald-700 mb-4 text-center">Why Choose Our Plans?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-white rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold text-emerald-600 mb-2">🎓 Student Plan</h3>
            <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
              <li>Affordable pricing for learners.</li>
              <li>Focus on learning & building hands-on projects.</li>
              <li>Quick turnaround & simple project requirements.</li>
              <li>Ideal for practice, college assignments & portfolio building.</li>
            </ul>
          </div>
          <div className="p-4 bg-white rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold text-emerald-600 mb-2">🏢 Business Plan</h3>
            <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
              <li>Designed for startups & companies.</li>
              <li>Advanced features with scalable architecture.</li>
              <li>Includes project consultation & customization.</li>
              <li>Priority delivery with professional support.</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {projectLevels.map((category, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition flex flex-col justify-between"
          >
            <div>
              <h2 className="text-xl font-semibold text-emerald-600 mb-3 text-center">
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
                <b>🎓 Student Plan:</b>{' '}
                <span className="text-emerald-600 font-semibold">
                  ₹{Math.min(...category.projects.map(p => p.studentPrice))} – ₹{Math.max(...category.projects.map(p => p.studentPrice))}
                </span>
              </p>
              <p className="text-gray-600">
                <b>🏢 Business Plan:</b>{' '}
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
    </div>
  );
}
