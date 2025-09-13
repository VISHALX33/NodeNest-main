import React, { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you! We will get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
        📩 Contact Us
      </h1>

      <div className="bg-white shadow-md rounded-2xl p-8">
        <p className="text-gray-700 mb-6 text-center">
          Have questions, feedback, or suggestions?  
          We’d love to hear from you! Fill out the form below or reach us at{" "}
          <span className="text-green-600 font-semibold">support@notenest.com</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            type="text"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-green-200 rounded-lg"
          />

          <input
            name="email"
            type="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-green-200 rounded-lg"
          />

          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-green-200 rounded-lg"
            rows="4"
          />

          <button
            type="submit"
            className="w-full py-2 rounded-lg text-white font-semibold bg-green-600 hover:bg-green-700"
          >
            Send Message
          </button>
        </form>
        <p className="mt-6 text-sm text-gray-500 text-center">
  🔒 <span className="font-semibold">Refunds & Support:</span> For billing issues or refund requests, write to us at <span className="text-green-600">notesea.help@gmail.com</span> with your Order ID. We aim to resolve payment-related queries within 5–7 working days.
</p>

      </div>
    </div>
  );
};

export default ContactUs;
