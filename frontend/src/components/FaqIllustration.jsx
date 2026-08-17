import { motion } from "framer-motion";

export default function FaqIllustration({ className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, type: "spring", stiffness: 120 }}
      className={`relative w-full max-w-[280px] md:max-w-[260px] md:mr-auto ${className}`}
      aria-hidden
    >
      {/* Soft glow behind */}
      <div className="absolute inset-4 bg-emerald-200/40 rounded-full blur-2xl" />

      <motion.svg
        viewBox="0 0 280 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative w-full h-auto drop-shadow-lg"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Ground shadow */}
        <ellipse cx="140" cy="218" rx="72" ry="10" fill="#10b981" fillOpacity="0.12" />

        {/* Desk */}
        <rect x="48" y="168" width="184" height="10" rx="5" fill="#059669" />
        <rect x="62" y="178" width="12" height="36" rx="3" fill="#047857" />
        <rect x="206" y="178" width="12" height="36" rx="3" fill="#047857" />

        {/* Laptop */}
        <rect x="98" y="138" width="84" height="52" rx="6" fill="#134e4a" />
        <rect x="104" y="144" width="72" height="40" rx="3" fill="#ecfdf5" />
        <rect x="112" y="152" width="24" height="4" rx="2" fill="#6ee7b7" />
        <rect x="112" y="160" width="40" height="3" rx="1.5" fill="#a7f3d0" />
        <rect x="112" y="167" width="32" height="3" rx="1.5" fill="#a7f3d0" />
        <path d="M90 190 L190 190 L196 198 L84 198 Z" fill="#0f766e" />

        {/* Student body */}
        <ellipse cx="140" cy="118" rx="28" ry="30" fill="#fde68a" />
        {/* Hair */}
        <path
          d="M112 98 C112 78 168 78 168 98 C168 88 112 88 112 98 Z"
          fill="#292524"
        />
        {/* Face */}
        <circle cx="130" cy="112" r="2.5" fill="#44403c" />
        <circle cx="150" cy="112" r="2.5" fill="#44403c" />
        <path d="M134 122 Q140 127 146 122" stroke="#44403c" strokeWidth="2" strokeLinecap="round" fill="none" />
        {/* Shirt */}
        <path d="M112 138 C112 128 168 128 168 138 L168 168 L112 168 Z" fill="#10b981" />
        <path d="M128 138 L140 152 L152 138" stroke="#ecfdf5" strokeWidth="2" fill="none" />

        {/* Raised hand */}
        <motion.g
          animate={{ rotate: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ originX: "175px", originY: "145px" }}
        >
          <ellipse cx="178" cy="132" rx="10" ry="11" fill="#fde68a" />
          <rect x="170" y="138" width="16" height="28" rx="8" fill="#10b981" transform="rotate(-15 178 152)" />
        </motion.g>

        {/* Books stack left */}
        <rect x="52" y="148" width="28" height="8" rx="2" fill="#f97316" />
        <rect x="50" y="138" width="32" height="8" rx="2" fill="#059669" />
        <rect x="54" y="128" width="24" height="8" rx="2" fill="#14b8a6" />

        {/* Coffee mug */}
        <rect x="210" y="148" width="18" height="16" rx="4" fill="#fff" stroke="#059669" strokeWidth="2" />
        <path d="M228 152 Q236 152 236 158 Q236 164 228 164" stroke="#059669" strokeWidth="2" fill="none" />

        {/* Floating question bubble 1 */}
        <motion.g
          animate={{ y: [0, -5, 0], x: [0, 2, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <rect x="188" y="52" width="56" height="36" rx="12" fill="#fff" stroke="#6ee7b7" strokeWidth="2" />
          <text x="216" y="76" textAnchor="middle" fill="#059669" fontSize="18" fontWeight="bold">?</text>
          <path d="M200 88 L192 98 L208 88" fill="#fff" stroke="#6ee7b7" strokeWidth="2" />
        </motion.g>

        {/* Floating chat bubble 2 */}
        <motion.g
          animate={{ y: [0, 4, 0], x: [0, -3, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <rect x="24" y="68" width="52" height="32" rx="12" fill="#ecfdf5" stroke="#10b981" strokeWidth="2" />
          <rect x="34" y="80" width="20" height="3" rx="1.5" fill="#34d399" />
          <rect x="34" y="87" width="32" height="3" rx="1.5" fill="#6ee7b7" />
        </motion.g>

        {/* Sparkle stars */}
        <motion.circle
          cx="240" cy="40" r="3" fill="#fbbf24"
          animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.circle
          cx="20" cy="48" r="2.5" fill="#34d399"
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.2, repeat: Infinity, delay: 0.3 }}
        />
      </motion.svg>

      {/* Floating badge */}
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
        className="absolute -bottom-1 -right-2 px-3 py-1.5 bg-white rounded-xl border border-emerald-200 shadow-md text-[10px] font-black text-emerald-700"
      >
        We&apos;re here to help 💬
      </motion.div>
    </motion.div>
  );
}
