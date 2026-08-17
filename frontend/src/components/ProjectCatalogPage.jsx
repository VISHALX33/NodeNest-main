import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  X,
  Sparkles,
  Clock,
  CheckCircle2,
  Code2,
  Layers,
  Crown,
  IndianRupee,
} from "lucide-react";
import API from "../utils/axios";

const TIERS = {
  easy: {
    category: "easy",
    title: "Grab Your Projects",
    subtitle: "Basic MERN stack projects — perfect for beginners and semester submissions.",
    badge: "Basic",
    Icon: Code2,
    heroClass: "from-emerald-600 via-emerald-700 to-teal-800",
    pillClass: "bg-emerald-100 text-emerald-700 border-emerald-200",
    cardRing: "hover:ring-emerald-200",
    btnClass: "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/25",
    tabActive: "bg-emerald-600 text-white",
    priceClass: "text-emerald-700",
    razorpay: "#059669",
    glow: "bg-emerald-300/20",
  },
  medium: {
    category: "medium",
    title: "Buy Great Projects",
    subtitle: "Intermediate apps with auth, dashboards, and real-world features.",
    badge: "Intermediate",
    Icon: Layers,
    heroClass: "from-blue-600 via-indigo-700 to-violet-800",
    pillClass: "bg-blue-100 text-blue-700 border-blue-200",
    cardRing: "hover:ring-blue-200",
    btnClass: "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/25",
    tabActive: "bg-indigo-600 text-white",
    priceClass: "text-indigo-700",
    razorpay: "#4f46e5",
    glow: "bg-blue-300/20",
  },
  hard: {
    category: "hard",
    title: "Discover And Buy",
    subtitle: "Production-ready SaaS-level systems with payments, scaling & advanced features.",
    badge: "Advanced",
    Icon: Crown,
    heroClass: "from-orange-500 via-rose-600 to-violet-700",
    pillClass: "bg-orange-100 text-orange-800 border-orange-200",
    cardRing: "hover:ring-orange-200",
    btnClass: "bg-gradient-to-r from-orange-500 to-rose-600 hover:from-orange-600 hover:to-rose-700 shadow-orange-500/25",
    tabActive: "bg-orange-600 text-white",
    priceClass: "text-orange-700",
    razorpay: "#ea580c",
    glow: "bg-orange-300/20",
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.45 },
  }),
};

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 ml-1">
        {label}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-400 focus:bg-white outline-none text-sm font-medium";

export default function ProjectCatalogPage({ tier = "easy" }) {
  const theme = TIERS[tier];
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState("preview");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    planType: "student",
    requirements: "",
    deadline: "",
    couponCode: "",
  });
  const [calculation, setCalculation] = useState({ base: 0, total: 0, discount: 0 });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    API.get(`/projects?category=${theme.category}`)
      .then((res) => setProjects(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [theme.category]);

  const handleProjectClick = (project) => {
    if (!localStorage.getItem("token")) {
      alert("Please login to proceed.");
      navigate("/");
      return;
    }
    setSelectedProject(project);
    setShowForm(false);
    setActiveTab("preview");
  };

  const handleFormChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (submitting || !selectedProject) return;
    setSubmitting(true);

    try {
      const base =
        formData.planType === "student"
          ? selectedProject.studentPrice
          : selectedProject.businessPrice;

      const res = await API.post("/orders", {
        projectId: selectedProject._id,
        planType: formData.planType,
        userDetails: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        },
        projectDetails: {
          requirements: formData.requirements,
          deadline: formData.deadline,
        },
        couponCode: formData.couponCode,
      });

      const total = res.data.totalAmount;
      setCalculation({ base, total, discount: base - total });

      const payRes = await API.post("/orders/create-razorpay-order", {
        amount: total,
        orderId: res.data.orderId,
      });

      const { key, amount, currency, razorpayOrderId } = payRes.data;

      const options = {
        key,
        amount,
        currency,
        name: "NoteSea Projects",
        description: selectedProject.name,
        order_id: razorpayOrderId,
        handler: async (response) => {
          try {
            await API.post("/orders/verify-payment", {
              orderId: res.data.orderId,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            alert("Payment successful! Redirecting...");
            setSelectedProject(null);
            setShowForm(false);
            navigate("/my-bookings");
          } catch (err) {
            alert(err.response?.data?.message || "Payment verification failed");
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: { color: theme.razorpay },
      };

      new window.Razorpay(options).open();
    } catch (err) {
      alert(err.response?.data?.message || "Order creation failed");
    } finally {
      setSubmitting(false);
    }
  };

  const payAmount =
    calculation.total ||
    (formData.planType === "student"
      ? selectedProject?.studentPrice
      : selectedProject?.businessPrice);

  const TierIcon = theme.Icon;

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-50 via-white to-emerald-50/30 overflow-hidden">
      <div className={`pointer-events-none absolute -top-32 -right-32 w-96 h-96 ${theme.glow} rounded-full blur-3xl`} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 relative z-10">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${theme.heroClass} p-8 md:p-10 mb-10 text-white shadow-xl`}
        >
          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-4 ${theme.pillClass}`}>
                <Sparkles size={12} /> {theme.badge} Tier
              </span>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight">{theme.title}</h1>
              <p className="mt-3 text-white/85 max-w-xl text-sm md:text-base leading-relaxed">{theme.subtitle}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/15 rounded-lg text-xs font-bold">
                  <Clock size={14} /> Delivery in 1–2 days
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/15 rounded-lg text-xs font-bold">
                  <CheckCircle2 size={14} /> Source code included
                </span>
              </div>
            </div>
            <div className="hidden md:flex w-20 h-20 rounded-2xl bg-white/15 items-center justify-center shrink-0">
              <TierIcon size={40} className="text-white/90" />
            </div>
          </div>
        </motion.div>

        {/* Tier nav */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {[
            { key: "easy", label: "Basic", path: "/easy-projects" },
            { key: "medium", label: "Intermediate", path: "/medium-projects" },
            { key: "hard", label: "Advanced", path: "/hard-projects" },
          ].map((t) => (
            <Link
              key={t.key}
              to={t.path}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                tier === t.key
                  ? `${theme.btnClass} text-white shadow-lg`
                  : "bg-white border border-slate-200 text-slate-600 hover:border-slate-300"
              }`}
            >
              {t.label}
            </Link>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-72 rounded-2xl bg-slate-100 animate-pulse" />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-200">
            <p className="text-slate-500 font-medium">No projects in this tier yet. Check back soon!</p>
          </div>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {projects.map((project, i) => (
              <motion.div
                key={project._id}
                variants={fadeUp}
                custom={i}
                whileHover={{ y: -6 }}
                className={`group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl ring-2 ring-transparent ${theme.cardRing} transition-all overflow-hidden flex flex-col`}
              >
                <div className="relative h-40 bg-gradient-to-br from-slate-100 to-slate-50 overflow-hidden">
                  {project.images?.[0] ? (
                    <img
                      src={project.images[0]}
                      alt={project.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-5xl">{project.icon || "📁"}</div>
                  )}
                  <span className={`absolute top-3 left-3 px-2 py-1 rounded-lg text-[10px] font-black uppercase ${theme.pillClass} border`}>
                    {theme.badge}
                  </span>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <h2 className="text-lg font-black text-slate-800 leading-tight">{project.name}</h2>
                  <p className="text-slate-500 text-sm mt-2 line-clamp-2 flex-1">{project.description}</p>

                  <div className="mt-4 grid grid-cols-2 gap-2 text-center">
                    <div className="bg-slate-50 rounded-xl py-2 px-2 border border-slate-100">
                      <p className="text-[9px] font-bold uppercase text-slate-400">Frontend</p>
                      <p className={`text-sm font-black ${theme.priceClass}`}>₹{project.studentPrice}</p>
                    </div>
                    <div className="bg-slate-50 rounded-xl py-2 px-2 border border-slate-100">
                      <p className="text-[9px] font-bold uppercase text-slate-400">Full Stack</p>
                      <p className={`text-sm font-black ${theme.priceClass}`}>₹{project.businessPrice}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleProjectClick(project)}
                    className={`mt-4 w-full py-3 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all ${theme.btnClass}`}
                  >
                    View & Book <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Preview modal */}
      <AnimatePresence>
        {selectedProject && !showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between p-5 border-b border-slate-100">
                <div>
                  <p className="text-[10px] font-black uppercase text-slate-400">{theme.badge} Project</p>
                  <h2 className="text-xl font-black text-slate-800">{selectedProject.name}</h2>
                </div>
                <button onClick={() => setSelectedProject(null)} className="p-2 rounded-full hover:bg-slate-100">
                  <X size={20} />
                </button>
              </div>

              <div className="flex flex-col md:flex-row overflow-y-auto flex-1">
                <div className="md:w-3/5 p-5 border-b md:border-b-0 md:border-r border-slate-100">
                  <div className="flex gap-2 mb-4">
                    {["preview", "images", "details"].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all ${
                          activeTab === tab ? theme.tabActive : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

                  <div className="min-h-[240px] rounded-2xl bg-slate-50 border border-slate-100 p-4 overflow-y-auto max-h-[50vh]">
                    {activeTab === "preview" && (
                      <>
                        <p className="text-slate-600 text-sm mb-4">{selectedProject.description}</p>
                        {selectedProject.videoLink && (
                          <iframe
                            className="w-full aspect-video rounded-xl"
                            src={selectedProject.videoLink.replace("watch?v=", "embed/")}
                            title="preview"
                            allowFullScreen
                          />
                        )}
                      </>
                    )}
                    {activeTab === "images" && (
                      <div className="grid gap-3">
                        {selectedProject.images?.length ? (
                          selectedProject.images.map((img, idx) => (
                            <img key={idx} src={img} alt="" className="w-full rounded-xl object-cover max-h-48" />
                          ))
                        ) : (
                          <p className="text-center text-slate-400 py-8">No images available</p>
                        )}
                      </div>
                    )}
                    {activeTab === "details" && (
                      <ul className="space-y-2">
                        {selectedProject.features?.length ? (
                          selectedProject.features.map((f, idx) => (
                            <li key={idx} className="flex gap-2 text-sm text-slate-700">
                              <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                              {f}
                            </li>
                          ))
                        ) : (
                          <p className="text-slate-400">No features listed</p>
                        )}
                      </ul>
                    )}
                  </div>
                </div>

                <div className="md:w-2/5 p-5 flex flex-col">
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                      <span className="text-sm text-slate-500">Frontend</span>
                      <span className="font-black text-slate-800">₹{selectedProject.studentPrice}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                      <span className="text-sm text-slate-500">Full Stack</span>
                      <span className="font-black text-slate-800">₹{selectedProject.businessPrice}</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 mb-4 flex items-center gap-1">
                    <Clock size={12} /> Delivered in 1–2 working days
                  </p>
                  <button
                    onClick={() => setShowForm(true)}
                    className={`w-full py-3 rounded-xl text-white font-bold ${theme.btnClass} shadow-lg`}
                  >
                    Continue to Book
                  </button>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="w-full py-3 mt-2 rounded-xl text-slate-600 font-bold border border-slate-200 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Booking modal */}
      <AnimatePresence>
        {selectedProject && showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => { setShowForm(false); setSelectedProject(null); }}
          >
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-black text-slate-800">Book {selectedProject.name}</h2>
                <button onClick={() => setShowForm(false)} className="p-2 rounded-full hover:bg-slate-100">
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <Field label="Name">
                  <input name="name" value={formData.name} onChange={handleFormChange} required className={inputClass} />
                </Field>
                <Field label="Email">
                  <input name="email" type="email" value={formData.email} onChange={handleFormChange} required className={inputClass} />
                </Field>
                <Field label="Phone">
                  <input name="phone" value={formData.phone} onChange={handleFormChange} required className={inputClass} />
                </Field>
                <Field label="Deadline">
                  <input name="deadline" type="date" value={formData.deadline} onChange={handleFormChange} required className={inputClass} />
                </Field>

                <Field label="Select Plan">
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      { value: "student", label: "Frontend Only", price: selectedProject.studentPrice },
                      { value: "business", label: "Full Stack", price: selectedProject.businessPrice },
                    ].map((plan) => (
                      <label
                        key={plan.value}
                        className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                          formData.planType === plan.value ? "border-emerald-400 bg-emerald-50" : "border-slate-200"
                        }`}
                      >
                        <span className="flex items-center gap-2 text-sm font-bold text-slate-700">
                          <input
                            type="radio"
                            name="planType"
                            value={plan.value}
                            checked={formData.planType === plan.value}
                            onChange={handleFormChange}
                            className="accent-emerald-600"
                          />
                          {plan.label}
                        </span>
                        <span className="font-black text-slate-800">₹{plan.price}</span>
                      </label>
                    ))}
                  </div>
                </Field>

                <Field label="Additional Requirements">
                  <textarea
                    name="requirements"
                    value={formData.requirements}
                    onChange={handleFormChange}
                    rows={3}
                    className={inputClass}
                  />
                </Field>
                <Field label="Coupon Code">
                  <input name="couponCode" value={formData.couponCode} onChange={handleFormChange} className={inputClass} placeholder="Optional" />
                </Field>

                {calculation.discount > 0 && (
                  <p className="text-emerald-600 text-sm font-bold">Coupon applied! You saved ₹{calculation.discount}</p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className={`w-full py-3.5 rounded-xl text-white font-black flex items-center justify-center gap-2 disabled:opacity-50 ${theme.btnClass} shadow-lg`}
                >
                  <IndianRupee size={16} />
                  {submitting ? "Processing..." : `Pay ₹${payAmount}`}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
