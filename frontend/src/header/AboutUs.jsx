import React from "react";

const AboutUs = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-emerald-700 mb-6 text-center">
        📖 About NoteNest
      </h1>

      <div className="bg-white shadow-md rounded-2xl p-8">
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          Welcome to <span className="font-semibold text-emerald-600">NoteNest</span> – 
          your one-stop platform for sharing and accessing notes effortlessly.  
          Built with the vision of making learning collaborative, NoteNest allows 
          students to upload, share, and download study material categorized by 
          semester and subject.
        </p>

        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          Beyond notes, we provide features like task management and project 
          bookings to make your academic journey smooth and organized. Whether 
          you are preparing for exams, working on projects, or just looking to 
          explore new knowledge, NoteNest has you covered.
        </p>

        <p className="text-lg text-gray-700 leading-relaxed">
          Our mission is simple: 
          <span className="text-emerald-600 font-semibold">
            make knowledge sharing accessible, reliable, and free for everyone.
          </span>
        </p>
        <p className="mt-6 text-sm text-gray-500">
  💡 <span className="font-semibold">Refund Policy:</span> Payments made for premium projects or services are non-refundable once the work has started. However, if you face any technical issues or accidental double charges, please contact us immediately.
</p>

      </div>
    </div>
  );
};

export default AboutUs;
