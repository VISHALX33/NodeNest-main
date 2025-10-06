import { motion } from "framer-motion";

export default function TermsAndConditions() {
  return (
    <div className="bg-gray-50 min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-10">
        <motion.h1
          className="text-4xl font-bold text-emerald-700 mb-6 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          📄 Terms & Conditions
        </motion.h1>

        <p className="text-sm text-gray-500 text-center mb-8">
          Last Updated: <span className="font-medium">October 2025</span> | Effective Date: <span className="font-medium">October 2025</span>
        </p>

        <div className="space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-emerald-600 mb-2">
              Welcome to NoteSea
            </h2>
            <p>
              By accessing or using our website (the “Platform”), you agree to comply with and be bound by these Terms and Conditions. Please read them carefully before using our services.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-emerald-600 mb-2">1. Purpose of the Platform</h3>
            <p>
              Our platform provides free academic notes and study materials for RTU CSE and AIDS branches, along with custom project booking and development services based on user requirements.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-emerald-600 mb-2">2. Content Ownership & Attribution</h3>
            <p>
              All notes and materials are sourced from publicly available resources, Telegram channels, and community contributions. We do not claim ownership of third-party content unless explicitly stated.
            </p>
            <p className="mt-2">
              If you are the original creator or copyright owner of any material and wish to receive credit or request removal, please contact us at{" "}
              <span className="font-semibold text-emerald-700">support@notesea.xyz</span>.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-emerald-600 mb-2">3. User Responsibilities</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Use the materials only for personal and educational purposes.</li>
              <li>Do not redistribute or resell the content from our platform without permission.</li>
              <li>Ensure downloaded materials comply with your institution’s policies.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-emerald-600 mb-2">4. Disclaimer</h3>
            <p>
              The materials provided are for educational purposes only. We make no guarantees about accuracy or reliability. The platform is provided “as is” without warranty.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-emerald-600 mb-2">5. Intellectual Property</h3>
            <p>
              The platform’s logo, design, and structure are owned by us. Third-party content remains the property of their respective owners. Redistribution without written consent is prohibited.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-emerald-600 mb-2">6. Custom Project Bookings</h3>
            <p>
              Custom project communications and deliverables are confidential between the user and our team. We reserve the right to decline projects violating ethical or legal guidelines.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-emerald-600 mb-2">7. Limitation of Liability</h3>
            <p>
              We are not responsible for any copyright disputes, academic consequences, or damages resulting from misuse of materials or reliance on platform content.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-emerald-600 mb-2">8. Changes to These Terms</h3>
            <p>
              These terms may be updated periodically. Continued use of our platform after updates indicates your acceptance of the revised terms.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-emerald-600 mb-2">9. Contact Information</h3>
            <p>
              For queries or content removal requests, contact us at:{" "}
              <span className="font-semibold text-emerald-700">support@notesea.xyz</span>
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-emerald-600 mb-2">10. Governing Law</h3>
            <p>
              These Terms are governed by the laws of India, and disputes are subject to the jurisdiction of courts in Jaipur, Rajasthan.
            </p>
          </section>
        </div>

        <p className="mt-10 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} NoteSea. All rights reserved.
        </p>
      </div>
    </div>
  );
}
