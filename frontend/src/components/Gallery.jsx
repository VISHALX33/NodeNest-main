import { useState } from "react";
import { FaYoutube, FaImage, FaTimes } from "react-icons/fa";

export default function Gallery() {
  // Sample gallery items - You can replace this with API calls to fetch from backend
  const [galleryItems] = useState([
  {
    id: 1,
    type: "image",
    url: "https://res.cloudinary.com/dwq5qifuk/image/upload/v1768723669/958823a3-c16c-4e56-a1f1-c90564130fb6.png",
    title: "Personal Portfolio",
    description: "Full stack portfolio with authentication, project showcase, and contact form"
  },
  {
    id: 2,
    type: "image",
    url: "https://res.cloudinary.com/dwq5qifuk/image/upload/v1766147229/Screenshot_2025-12-19_175403_kxdrhp.png",
    title: "Hotel Booking System",
    description: "Hotel booking platform with room listings, reservations, and admin management"
  },
  {
    id: 3,
    type: "image",
    url: "https://res.cloudinary.com/dwq5qifuk/image/upload/v1766388834/Screenshot_2025-12-22_130201_pbfqga.png",
    title: "Online Course Learning Platform (LMS)",
    description: "Learning management system with courses, progress tracking, and admin dashboard"
  },
  {
    id: 4,
    type: "image",
    url: "https://res.cloudinary.com/dwq5qifuk/image/upload/v1765996467/Screenshot_2025-12-18_000157_z8hsrd.png",
    title: "Gym & Fitness Website",
    description: "Fitness platform with membership plans, workouts, trainers, and user accounts"
  },
  {
    id: 5,
    type: "image",
    url: "YOUR_IMAGE_URL_HERE",
    title: "E-Commerce Clothing Store",
    description: "Full stack e-commerce site with products, cart, orders, and online payments"
  },
  {
    id: 6,
    type: "image",
    url: "YOUR_IMAGE_URL_HERE",
    title: "Real Estate Platform",
    description: "Property listing system with search filters, inquiries, and admin panel"
  },
  {
    id: 7,
    type: "image",
    url: "https://res.cloudinary.com/dwq5qifuk/image/upload/v1766387689/Screenshot_2025-12-22_124212_ms34yv.png",
    title: "Social Media Mini Platform",
    description: "Social networking app with posts, likes, comments, and user follow system"
  },
  {
    id: 8,
    type: "image",
    url: "YOUR_IMAGE_URL_HERE",
    title: "Blogging Platform + Admin Panel",
    description: "Blog platform with content management, analytics, and role-based access"
  },
  {
    id: 9,
    type: "image",
    url: "https://res.cloudinary.com/dwq5qifuk/image/upload/v1766596622/Screenshot_2025-12-24_224526_fwvx5x.png",
    title: "Food Delivery Website",
    description: "Online food ordering system with cart, order tracking, and payment integration"
  },
  {
    id: 10,
    type: "image",
    url: "YOUR_IMAGE_URL_HERE",
    title: "OTT Streaming Website",
    description: "Video streaming platform with subscriptions, watchlist, and secure login"
  },
  {
    id: 11,
    type: "image",
    url: "https://res.cloudinary.com/dwq5qifuk/image/upload/v1765369795/Screenshot_2025-12-10_175747_fw58hc.png",
    title: "Car Rental Website",
    description: "Car rental system with booking, pricing plans, and user dashboard"
  },
  {
    id: 12,
    type: "image",
    url: "https://res.cloudinary.com/dwq5qifuk/image/upload/v1765193061/Screenshot_2025-12-08_164751_rn3uxl.png",
    title: "Mess Management System",
    description: "Mess management platform with meal planning, attendance, and billing system"
  },
{
  id: 13,
  type: "youtube",
  videoId: "eStNXTXcXSU",
  title: "Hotel Landing Page | React & Tailwind CSS",
  description: "Modern hotel landing page built using React and Tailwind CSS with responsive design and clean UI"
},
  {
  id: 14,
  type: "youtube",
  videoId: "YLtPlUflisI",
  title: "Personal Portfolio Website + Tips | React",
  description: "Personal portfolio website built with React along with useful tips to improve design, layout, and user experience"
},
 {
  id: 15,
  type: "youtube",
  videoId: "WrUyiARUjRI",
  title: "Dental Care Website | Modern UI Design",
  description: "Modern dental care website showcasing services, appointments, and responsive user-friendly design"
},
  {
  id: 16,
  type: "youtube",
  videoId: "pTEgD_B5SuA",
  title: "Online Learning Platform | Full Stack Project",
  description: "Full stack online learning platform with courses, user authentication, progress tracking, and admin features"
},
  {
  id: 17,
  type: "youtube",
  videoId: "g8o9HLbmgYc",
  title: "Scard Update | Notesea Feature Demo",
  description: "Latest Scard feature update in Notesea showcasing improvements, new functionality, and user experience enhancements"
},
  {
  id: 18,
  type: "youtube",
  videoId: "fkHJ-mKhybE",
  title: "Social Media Platform | Full Stack Project",
  description: "Full stack social media application with user authentication, posts, likes, comments, and real-time interaction"
}
,
  {
  id: 19,
  type: "youtube",
  videoId: "qKFvFxe8smo",
  title: "Food Delivery App | Full Stack Project",
  description: "Full stack food delivery application with restaurant listings, cart system, order management, and online payments"
},
  {
  id: 20,
  type: "youtube",
  videoId: "HjScTbGkoyY",
  title: "Gym & Fitness Website | Full Stack Project",
  description: "Full stack gym and fitness website with membership plans, workout programs, trainer profiles, and user dashboard"
},
  {
  id: 21,
  type: "youtube",
  videoId: "otggTr4saaU",
  title: "Car Rental Website | Full Stack Project",
  description: "Full stack car rental platform with vehicle listings, booking system, pricing plans, and user management"
},
  {
  id: 22,
  type: "youtube",
  videoId: "wCPYe9_XO-0",
  title: "E-Commerce Website | Full Stack Project",
  description: "Full stack e-commerce website with product management, shopping cart, secure checkout, and order tracking"
}

]);


  const [selectedItem, setSelectedItem] = useState(null);
  const [filter, setFilter] = useState("all"); // all, images, videos

  const filteredItems = galleryItems.filter(item => {
    if (filter === "all") return true;
    if (filter === "images") return item.type === "image";
    if (filter === "videos") return item.type === "youtube";
    return true;
  });

  const openModal = (item) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-emerald-700 mb-4">
            Gallery
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Explore our collection of images and videos showcasing our journey, projects, and achievements
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-4 mb-8 flex-wrap">
          <button
            onClick={() => setFilter("all")}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
              filter === "all"
                ? "bg-emerald-600 text-white shadow-lg scale-105"
                : "bg-white text-emerald-600 hover:bg-emerald-50 border border-emerald-200"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("images")}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-200 flex items-center gap-2 ${
              filter === "images"
                ? "bg-emerald-600 text-white shadow-lg scale-105"
                : "bg-white text-emerald-600 hover:bg-emerald-50 border border-emerald-200"
            }`}
          >
            <FaImage /> Images
          </button>
          <button
            onClick={() => setFilter("videos")}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-200 flex items-center gap-2 ${
              filter === "videos"
                ? "bg-emerald-600 text-white shadow-lg scale-105"
                : "bg-white text-emerald-600 hover:bg-emerald-50 border border-emerald-200"
            }`}
          >
            <FaYoutube /> Videos
          </button>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => openModal(item)}
              className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2"
            >
              {/* Image Thumbnail or Video Thumbnail */}
              <div className="relative aspect-video overflow-hidden bg-gray-100">
                {item.type === "image" ? (
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <div className="relative w-full h-full">
                    <img
                      src={`https://img.youtube.com/vi/${item.videoId}/maxresdefault.jpg`}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                      <FaYoutube className="text-red-600 text-6xl drop-shadow-lg" />
                    </div>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800 mb-1">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
                <div className="mt-2 flex items-center gap-2 text-emerald-600">
                  {item.type === "image" ? <FaImage /> : <FaYoutube />}
                  <span className="text-xs font-medium uppercase">
                    {item.type}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-xl">No items found in this category</p>
          </div>
        )}
      </div>

      {/* Modal for full view */}
      {selectedItem && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div
            className="relative bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors shadow-lg"
            >
              <FaTimes size={20} />
            </button>

            {/* Content */}
            <div className="p-6">
              {selectedItem.type === "image" ? (
                <img
                  src={selectedItem.url}
                  alt={selectedItem.title}
                  className="w-full h-auto rounded-lg"
                />
              ) : (
                <div className="aspect-video w-full">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${selectedItem.videoId}`}
                    title={selectedItem.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-lg"
                  ></iframe>
                </div>
              )}

              <div className="mt-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  {selectedItem.title}
                </h2>
                <p className="text-gray-600 text-lg">
                  {selectedItem.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
