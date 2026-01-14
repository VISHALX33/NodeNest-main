import { motion } from "framer-motion";

export default function PartnerPage() {
  const partners = [
    { 
      name: "Khushi Photocopy & Printout", 
      logo: "https://res.cloudinary.com/dwq5qifuk/image/upload/v1763982004/k_qk95m1.webp" 
    },
    { 
      name: "Manglam residency", 
      logo: "https://res.cloudinary.com/dwq5qifuk/image/upload/v1768415621/6287321978473484191_avdbd4.jpg"
    },
    // Add more partners here...
  ];

  return (
    <div className="bg-white">

      {/* 🌟 Hero Section */}
      <section className="py-24 bg-gradient-to-b from-white to-emerald-50 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
          Our Partners
        </h1>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg">
          We collaborate with trusted organizations that help us deliver value,
          resources, and support to students across all domains.
        </p>
      </section>

      {/* 🌟 Partner List */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
            Meet Our Trusted Partners
          </h2>

          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-10">
            {partners.map((partner, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-lg transition text-center"
              >
                <div className="w-full h-32 flex items-center justify-center mb-4">
                  <img 
                    src={partner.logo} 
                    alt={partner.name} 
                    className="h-full object-contain"
                  />
                </div>

                <h3 className="font-semibold text-gray-800 text-lg">
                  {partner.name}
                </h3>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 🌟 Become a Partner */}
      <section className="py-20 bg-emerald-600 text-center text-white mt-10">
        <h2 className="text-3xl font-bold mb-4">
          Want to Partner With Us?
        </h2>
        <p className="text-white/90 mb-8 max-w-2xl mx-auto">
          Join NoteSea and help thousands of students with valuable resources,
          services, and educational support.
        </p>
        <a
          href="/contact"
          className="bg-white text-emerald-700 px-8 py-3 rounded-xl font-semibold shadow hover:bg-gray-100 transition"
        >
          Become a Partner
        </a>
      </section>

    </div>
  );
}
