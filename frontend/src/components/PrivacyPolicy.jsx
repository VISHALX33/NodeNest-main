import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function PrivacyPolicy() {
  return (
    <div className="bg-gray-50 min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-10">
        <motion.h1
          className="text-4xl font-bold text-emerald-700 mb-6 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          🔒 Privacy Policy
        </motion.h1>

        <p className="text-sm text-gray-500 text-center mb-8">
          Last Updated: <span className="font-medium">September 2026</span> | Effective Date:{" "}
          <span className="font-medium">September 2026</span>
        </p>

        <div className="space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-emerald-600 mb-2">Welcome to NoteSea</h2>
            <p>
              NoteSea ("we", "our", or "us") operates the website{" "}
              <a href="https://www.notesea.xyz" className="text-emerald-700 font-medium hover:underline">
                notesea.xyz
              </a>
              . This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you
              visit or use our platform.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-emerald-600 mb-2">1. Information We Collect</h3>
            <p className="mb-2">We may collect the following types of information:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <strong>Account information:</strong> name, email address, and password when you register.
              </li>
              <li>
                <strong>Usage data:</strong> pages visited, features used, and interaction with our services.
              </li>
              <li>
                <strong>Contact information:</strong> name, email, and message content when you submit our contact
                form.
              </li>
              <li>
                <strong>Payment-related data:</strong> transaction details processed through third-party payment
                providers (we do not store full card details).
              </li>
              <li>
                <strong>Device &amp; log data:</strong> browser type, IP address, and cookies for site functionality
                and analytics.
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-emerald-600 mb-2">2. How We Use Your Information</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>To provide, operate, and maintain our platform and services.</li>
              <li>To create and manage your account.</li>
              <li>To process project bookings and service requests.</li>
              <li>To respond to your inquiries and support requests.</li>
              <li>To send important updates about our services (not spam).</li>
              <li>To improve our website, content, and user experience.</li>
              <li>To detect, prevent, and address technical or security issues.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-emerald-600 mb-2">3. Cookies &amp; Analytics</h3>
            <p>
              We use cookies and similar technologies to keep you logged in, remember preferences, and understand how
              visitors use our site. You can control cookies through your browser settings. Disabling cookies may limit
              some features of the platform.
            </p>
            <p className="mt-2">
              We may use third-party analytics services (such as Google Analytics) to measure traffic and usage
              patterns. These services may collect information sent by your browser as part of a web page request.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-emerald-600 mb-2">4. Third-Party Services</h3>
            <p>
              We use trusted third-party services to operate NoteSea, including payment processors (e.g. Razorpay),
              email delivery, and hosting providers. These services have their own privacy policies and we encourage you
              to review them. We only share the minimum data required for them to perform their services.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-emerald-600 mb-2">5. Data Sharing &amp; Disclosure</h3>
            <p>We do not sell your personal information. We may share data only when:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Required by law or legal process.</li>
              <li>Necessary to protect our rights, users, or the public.</li>
              <li>Working with service providers who assist in operating our platform (under confidentiality).</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-emerald-600 mb-2">6. Data Security</h3>
            <p>
              We implement reasonable technical and organizational measures to protect your personal information.
              However, no method of transmission over the Internet is 100% secure. While we strive to protect your data,
              we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-emerald-600 mb-2">7. Data Retention</h3>
            <p>
              We retain your personal information only as long as necessary to provide our services, comply with legal
              obligations, resolve disputes, and enforce our agreements. You may request deletion of your account data by
              contacting us.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-emerald-600 mb-2">8. Your Rights</h3>
            <p>Depending on applicable law, you may have the right to:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Access the personal data we hold about you.</li>
              <li>Request correction of inaccurate information.</li>
              <li>Request deletion of your personal data.</li>
              <li>Withdraw consent where processing is based on consent.</li>
            </ul>
            <p className="mt-2">
              To exercise these rights, email us at{" "}
              <span className="font-semibold text-emerald-700">notesea.help@gmail.com</span>.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-emerald-600 mb-2">9. Children&apos;s Privacy</h3>
            <p>
              NoteSea is intended for students and users aged 13 and above. We do not knowingly collect personal
              information from children under 13. If you believe we have collected such information, please contact us
              and we will delete it promptly.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-emerald-600 mb-2">10. Changes to This Policy</h3>
            <p>
              We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated
              effective date. Continued use of NoteSea after changes constitutes acceptance of the revised policy.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-emerald-600 mb-2">11. Contact Us</h3>
            <p>
              For privacy-related questions or requests, contact us at:
            </p>
            <ul className="list-none mt-2 space-y-1">
              <li>
                Email:{" "}
                <a href="mailto:notesea.help@gmail.com" className="font-semibold text-emerald-700 hover:underline">
                  notesea.help@gmail.com
                </a>
              </li>
              <li>
                Support:{" "}
                <a href="mailto:support@notesea.xyz" className="font-semibold text-emerald-700 hover:underline">
                  support@notesea.xyz
                </a>
              </li>
              <li>
                Contact form:{" "}
                <Link to="/contact" className="font-semibold text-emerald-700 hover:underline">
                  notesea.xyz/contact
                </Link>
              </li>
            </ul>
          </section>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-4 text-sm">
          <Link to="/" className="text-emerald-600 hover:underline">
            ← Back to Home
          </Link>
          <Link to="/terms" className="text-emerald-600 hover:underline">
            Terms &amp; Conditions
          </Link>
          <Link to="/contact" className="text-emerald-600 hover:underline">
            Contact Us
          </Link>
        </div>

        <p className="mt-6 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} NoteSea. All rights reserved.
        </p>
      </div>
    </div>
  );
}
