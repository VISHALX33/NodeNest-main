import { motion } from "framer-motion";
import { FaCode, FaPenNib, FaUsers, FaLaptopCode, FaHeart } from "react-icons/fa";
import founderImg from "../assets/vishalp.png";

export default function CareerPage() {
  const roles = [
    {
      title: "Frontend Developer Intern",
      desc: "Work with React and Tailwind CSS to build elegant and responsive UI for NoteSea.",
      type: "Internship",
      icon: <FaLaptopCode className="text-emerald-500 text-4xl" />,
    },
    {
      title: "Content Writer (Notes / Blogs)",
      desc: "Create engaging and easy-to-understand educational content for students.",
      type: "Remote",
      icon: <FaPenNib className="text-emerald-500 text-4xl" />,
    },
    {
      title: "Community Manager",
      desc: "Help manage NoteSea’s student community and handle collaborations.",
      type: "Part-Time",
      icon: <FaUsers className="text-emerald-500 text-4xl" />,
    },
  ];

  const perks = [
    "Flexible Remote Work",
    "Certificate & Letter of Recommendation",
    "Work with an active dev team",
    "Learn new skills in real projects",
    "Be featured on NoteSea Contributors page",
  ];


  
  return (
    <>
    
    <div className="font-sans bg-gradient-to-br from-emerald-50 via-white to-emerald-100 text-gray-800 overflow-hidden">

        
      {/* 🌟 Hero Section */}
      <section className="relative text-center py-28 px-6 bg-gradient-to-tr from-emerald-700 to-emerald-500 text-white shadow-lg">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl md:text-6xl font-extrabold mb-4"
        >
          Join the <span className="text-yellow-200">NoteSea</span> Team
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-100 max-w-2xl mx-auto text-lg"
        >
          Build, create, and innovate with us — making learning simple, free, and accessible to all.
        </motion.p>
        <div className="absolute inset-0 bg-[url('/waves.svg')] bg-bottom bg-no-repeat opacity-20"></div>
      </section>

      {/* 💼 Why Join Section */}
      <section className="py-20 px-6 max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-emerald-700 mb-6"
        >
          Why Join <span className="text-emerald-500">NoteSea?</span>
        </motion.h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-14 text-lg">
          We believe in learning through collaboration. Whether you’re a developer, designer, or writer —
          you’ll grow your skills while helping thousands of students.
        </p>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[
            { icon: <FaCode />, title: "Real Project Work", text: "Work on a live platform and gain hands-on development experience." },
            { icon: <FaHeart />, title: "Impact Students", text: "Build tools that empower learners and create educational impact." },
            { icon: <FaUsers />, title: "Collaborate & Grow", text: "Be part of a passionate, knowledge-sharing student community." },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="bg-white/70 backdrop-blur-md shadow-lg rounded-2xl p-8 border border-emerald-100 hover:shadow-2xl transition"
            >
              <div className="text-emerald-600 text-4xl mb-4 mx-auto">{item.icon}</div>
              <h3 className="font-semibold text-xl mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🧩 Open Roles */}
      <section className="bg-gradient-to-br from-emerald-50 to-white py-24 px-6">
        <h2 className="text-4xl font-bold text-center text-emerald-700 mb-12">
          Open Positions
        </h2>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {roles.map((role, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
              className="bg-white rounded-2xl shadow-lg p-8 text-center border border-emerald-100 hover:border-emerald-400 transition"
            >
              <div className="flex justify-center mb-4">{role.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{role.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{role.desc}</p>
              <span className="inline-block bg-emerald-100 text-emerald-700 px-4 py-1 rounded-full text-sm font-medium">
                {role.type}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🌿 Perks Section */}
      <section className="py-24 px-6 bg-white">
        <h2 className="text-4xl font-bold text-center text-emerald-700 mb-10">
          Perks & Benefits
        </h2>
        <ul className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-6 text-gray-700">
          {perks.map((perk, i) => (
            <li
              key={i}
              className="flex items-center bg-gradient-to-r from-emerald-50 to-white rounded-xl shadow-sm border border-emerald-100 p-5 hover:shadow-lg transition"
            >
              <span className="text-emerald-500 text-xl mr-3">✔</span> {perk}
            </li>
          ))}
        </ul>
      </section>

      {/* 👨‍💻 Founder Section */}
      <section className="bg-gradient-to-r from-emerald-50 via-white to-emerald-50 py-24 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            src={founderImg}
            alt="Founder"
            className="w-64 h-64 object-cover rounded-3xl shadow-2xl border-4 border-emerald-200"
          />
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Meet Our Founder</h2>
            <p className="text-emerald-700 font-semibold mb-2">
              Vishal Prajapati — Creator of NoteSea
            </p>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Vishal started NoteSea with a mission to make education more accessible and collaborative.
              From providing free RTU notes to building affordable project templates, his vision is to
              empower every student to learn and grow without barriers.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Join NoteSea and be part of this journey — where learning meets innovation and passion meets opportunity.
            </p>
          </div>
        </div>
      </section>

      {/* 📩 Call to Action */}
      <section className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white text-center py-20 px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-4"
        >
          Ready to Start Your Journey?
        </motion.h2>
        <p className="mb-6 text-gray-100 text-lg">
          Send your resume or portfolio to{" "}
          <span className="font-semibold">notesea.team@gmail.com</span>
        </p>
        <a
          href="mailto:notesea.team@gmail.com"
          className="inline-block bg-white text-emerald-700 font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-gray-100 transition"
        >
          Apply Now
        </a>
      </section>
    </div></>
    
  );
}
