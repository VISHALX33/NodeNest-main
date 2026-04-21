import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Monitor, BookOpen, Layers, CheckCircle,Phone, X, CreditCard, Gift, User, Mail, MessageSquare } from "lucide-react";
import Modal from "react-modal";
import API from "../utils/axios";
import { useNavigate } from "react-router-dom";

// Modal accessibility
Modal.setAppElement("#root");

export default function ResearchDocumentation() {
  const navigate = useNavigate();
  const [isLoggedIn] = useState(!!localStorage.getItem("token"));
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    requirements: "",
    couponCode: "",
  });
  const [calculation, setCalculation] = useState({
    base: 0,
    total: 0,
    discount: 0,
  });

  const plans = [
    {
      id: "presentation",
      title: "Presentation",
      price: 499,
      icon: <Monitor className="text-emerald-600" size={32} />,
      features: ["10-15 Professional Slides", "Speaker Notes Included", "Modern Visual Design", "Only 3 updates possible"],
      gradient: "from-emerald-50 to-teal-50",
      description: "Get a high-impact, professionally designed presentation tailored for your project or academic seminar."
    },
    {
      id: "report_paper",
      title: "Report / Research Paper",
      price: 999,
      icon: <BookOpen className="text-emerald-600" size={32} />,
      features: ["10 Page Research Paper", "60 Page Comprehensive Report", "Plagiarism-Free", "Only 3 updates possible"],
      gradient: "from-blue-50 to-indigo-50",
      description: "Professional academic writing for research papers and comprehensive reports with proper formatting."
    },
    {
      id: "report_plus_paper",
      title: "Report + Research Paper",
      price: 1699,
      icon: <Layers className="text-emerald-600" size={32} />,
      features: ["60 Page Detailed Report", "10 Page Research Paper", "Academic Formatting", "Only 3 updates possible"],
      gradient: "from-purple-50 to-pink-50",
      description: "A complete bundle of a detailed project report and a structured research paper for your final submissions."
    },
    {
      id: "ultimate_bundle",
      title: "The Ultimate Bundle",
      subtitle: "Presentation, Research, Report",
      price: 2099,
      icon: <FileText className="text-emerald-600" size={32} />,
      features: ["60 Page Report", "10 Page Research Paper", "10-15 Slides Presentation", "Only 3 updates possible"],
      gradient: "from-orange-50 to-amber-50",
      description: "Our complete documentation package covering every aspect of your project's submission requirements."
    },
    {
      id: "elite_all_in_one",
      title: "Elite All-In-One",
      subtitle: "Project + Full Documentation",
      price: 7599,
      icon: <Layers className="text-emerald-600" size={32} />,
      features: ["Custom MERN Project", "60 Page Report", "10 Page Research Paper", "10-15 Slides Presentation", "Priority Support"],
      gradient: "from-emerald-900 to-teal-900",
      featured: true,
      description: "The ultimate solution: We build your full MERN stack project and handle all associated documentation."
    }
  ];

  /* ================= HANDLERS ================= */
  const handlePlanClick = (plan) => {
    if (!isLoggedIn) {
      alert("Please login to proceed.");
      navigate("/");
      return;
    }
    setSelectedPlan(plan);
    setShowForm(false);
    setCalculation({ base: plan.price, total: plan.price, discount: 0 });
  };

  const handleContinue = () => setShowForm(true);

  const handleFormChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      // STEP 1: Create service order in backend
      const res = await API.post("/service-orders", {
        serviceName: selectedPlan.title,
        servicePrice: selectedPlan.price,
        userDetails: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        },
        requirements: formData.requirements,
        couponCode: formData.couponCode,
      });

      const total = res.data.totalAmount;
      const orderId = res.data.orderId;

      // STEP 2: Create Razorpay order
      const payRes = await API.post("/service-orders/create-razorpay-order", {
        amount: total,
        orderId: orderId,
      });

      const { key, amount, currency, razorpayOrderId } = payRes.data;

      // STEP 3: Razorpay Checkout
      const options = {
        key,
        amount,
        currency,
        name: "NoteSea Services",
        description: selectedPlan.title,
        order_id: razorpayOrderId,
        handler: async (response) => {
          try {
            await API.post("/service-orders/verify-payment", {
              orderId: orderId,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            alert("✅ Payment successful! Redirecting to your bookings...");
            setSelectedPlan(null);
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
        theme: {
          color: "#059669", // emerald-600
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      alert(err.response?.data?.message || "Order creation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-black text-emerald-900 tracking-tight mb-4">
          Documentation & Research Services
        </h2>
        <div className="h-1.5 w-24 bg-emerald-500 mx-auto rounded-full mb-6"></div>
        <p className="text-gray-600 max-w-2xl mx-auto font-medium">
          High-quality academic documentation and project development services crafted by experts to help you excel.
        </p>
      </div>

      {/* S-Tier Premium Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        {plans.slice(0, 3).map((plan, index) => (
          <PricingCard key={index} plan={plan} onSelect={() => handlePlanClick(plan)} />
        ))}
      </div>
      <div className="flex flex-col md:flex-row justify-center gap-8">
        {plans.slice(3).map((plan, index) => (
          <PricingCard key={index} plan={plan} isLarge={true} onSelect={() => handlePlanClick(plan)} />
        ))}
      </div>

      <div className="mt-20 text-center">
        <div className="inline-block p-1 rounded-full bg-emerald-50 border border-emerald-100 mb-4 px-4 py-2">
          <p className="text-emerald-700 text-xs font-bold uppercase tracking-widest">Custom Requirements?</p>
        </div>
        <p className="text-gray-500 text-sm">
          Need a tailored solution? <a href="mailto:notesea.help@gmail.com" className="text-emerald-600 font-black hover:underline transition-all">Contact our experts</a>
        </p>
      </div>

      {/* ================= PREVIEW MODAL ================= */}
      <Modal
        isOpen={!!selectedPlan && !showForm}
        onRequestClose={() => setSelectedPlan(null)}
        className="outline-none"
        overlayClassName="fixed inset-0 bg-emerald-950/40 backdrop-blur-sm flex justify-center items-center z-[100] px-4"
      >
        <AnimatePresence>
          {selectedPlan && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-[2.5rem] shadow-2xl max-w-2xl w-full overflow-hidden border border-emerald-50"
            >
              <div className="flex flex-col md:flex-row h-full">
                {/* Visual Side */}
                <div className={`md:w-2/5 p-8 flex flex-col justify-center items-center text-center ${selectedPlan.featured ? "bg-emerald-900 text-white" : "bg-emerald-50 text-emerald-900"}`}>
                  <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mb-6 shadow-xl ${selectedPlan.featured ? "bg-emerald-800" : "bg-white"}`}>
                    {selectedPlan.icon}
                  </div>
                  <h3 className="text-2xl font-black mb-2">{selectedPlan.title}</h3>
                  <div className="text-3xl font-black mb-4">₹{selectedPlan.price}</div>
                  <p className="text-xs font-bold uppercase tracking-widest opacity-60">Ready to excel?</p>
                </div>

                {/* Content Side */}
                <div className="md:w-3/5 p-8 relative">
                  <button onClick={() => setSelectedPlan(null)} className="absolute top-4 right-4 p-2 hover:bg-emerald-50 rounded-full transition-colors text-gray-400">
                    <X size={20} />
                  </button>

                  <h4 className="text-sm font-black text-emerald-700 uppercase tracking-widest mb-6 border-b border-emerald-50 pb-2 flex items-center gap-2">
                    <FileText size={16} /> Plan Overview
                  </h4>
                  
                  <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                    {selectedPlan.description}
                  </p>

                  <div className="space-y-3 mb-8">
                    {selectedPlan.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm font-medium text-gray-700">
                        <CheckCircle size={14} className="text-emerald-500" />
                        {f}
                      </div>
                    ))}
                  </div>

                  <div className="bg-emerald-50 p-4 rounded-2xl mb-8 border border-emerald-100">
                    <h5 className="text-[10px] font-black text-emerald-800 uppercase tracking-widest mb-2 flex items-center gap-2">
                      <Phone size={10} /> Need Assistance?
                    </h5>
                    <div className="flex flex-col gap-1 text-emerald-700 font-bold text-xs">
                      <a href="tel:+919001509419" className="hover:text-emerald-500 transition-colors">+91 9001509419 (WhatsApp)</a>
                      <a href="tel:+918003310994" className="hover:text-emerald-500 transition-colors">+91 8003310994 (Direct)</a>
                    </div>
                  </div>

                  <button
                    onClick={handleContinue}
                    className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-black shadow-lg hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 active:scale-95 shadow-emerald-200"
                  >
                    Continue to Order <X size={16} className="rotate-45" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Modal>

      {/* ================= BOOKING FORM MODAL ================= */}
      <Modal
        isOpen={!!selectedPlan && showForm}
        onRequestClose={() => {
          setSelectedPlan(null);
          setShowForm(false);
        }}
        className="outline-none"
        overlayClassName="fixed inset-0 bg-emerald-950/40 backdrop-blur-sm flex justify-center items-center z-[110] px-4"
      >
        <AnimatePresence>
          {selectedPlan && showForm && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-[2.5rem] shadow-2xl max-w-lg w-full overflow-hidden border border-emerald-50"
            >
              <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h2 className="text-2xl font-black text-emerald-950">Finalize Order</h2>
                    <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Pricing: ₹{selectedPlan.price}</p>
                  </div>
                  <button onClick={() => setShowForm(false)} className="p-2 hover:bg-emerald-50 rounded-full transition-colors text-gray-400">
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-5">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-1">
                      <User size={10} /> Full Name
                    </label>
                    <input
                      name="name"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleFormChange}
                      required
                      className="w-full px-5 py-3.5 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all outline-none text-emerald-950 font-medium placeholder:text-gray-300"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-1">
                        <Mail size={10} /> Email Address
                      </label>
                      <input
                        name="email"
                        placeholder="email@example.com"
                        type="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        required
                        className="w-full px-5 py-3.5 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all outline-none text-emerald-950 font-medium placeholder:text-gray-300"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-1">
                        <Phone size={10} /> Phone Number
                      </label>
                      <input
                        name="phone"
                        placeholder="+91 00000 00000"
                        value={formData.phone}
                        onChange={handleFormChange}
                        required
                        className="w-full px-5 py-3.5 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all outline-none text-emerald-950 font-medium placeholder:text-gray-300"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-1">
                      <MessageSquare size={10} /> Topics & Specific Requirements
                    </label>
                    <textarea
                      name="requirements"
                      placeholder="Enter research topics or special instructions..."
                      rows="3"
                      value={formData.requirements}
                      onChange={handleFormChange}
                      required
                      className="w-full px-5 py-3.5 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all outline-none text-emerald-950 font-medium placeholder:text-gray-300 resize-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-1">
                      <Gift size={10} /> Promo Code
                    </label>
                    <div className="relative">
                      <input
                        name="couponCode"
                        placeholder="Enter if you have any"
                        value={formData.couponCode}
                        onChange={handleFormChange}
                        className="w-full px-5 py-3.5 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all outline-none text-emerald-950 font-medium placeholder:text-gray-300 pr-12"
                      />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-400">
                        <CreditCard size={18} />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className={`w-full py-5 rounded-2xl text-white font-black text-lg transition-all flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/20 active:scale-95 ${loading ? "bg-emerald-300 cursor-not-allowed" : "bg-emerald-600 hover:bg-emerald-700"}`}
                    >
                      {loading ? (
                        <>Processing...</>
                      ) : (
                        <>Pay ₹{selectedPlan.price} & Book Now</>
                      )}
                    </button>
                    <p className="text-center text-[10px] text-gray-400 mt-4 uppercase tracking-widest font-black leading-relaxed">
                      Secure payment via Razorpay. By continuing, you agree to our service terms.
                    </p>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Modal>
    </div>
  );
}

function PricingCard({ plan, isLarge = false, onSelect }) {
  return (
    <motion.div
      whileHover={{ y: -12, scale: 1.02 }}
      className={`relative p-8 rounded-[2.5rem] shadow-2xl transition-all duration-500 flex flex-col ${
        isLarge ? "w-full md:w-[calc(50%-1rem)] max-w-md" : "w-full"
      } ${
        plan.featured 
          ? "bg-emerald-900 text-white border-emerald-700 ring-8 ring-emerald-500/10 shadow-emerald-900/20" 
          : `bg-gradient-to-br ${plan.gradient} border-white shadow-emerald-900/5`
      }`}
    >
      {plan.featured && (
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-400 to-teal-500 text-white text-[10px] font-black px-6 py-2 rounded-full uppercase tracking-[0.2em] shadow-xl border border-emerald-300">
          Most Popular
        </div>
      )}

      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-10 shadow-lg ${
        plan.featured ? "bg-emerald-800 text-emerald-400" : "bg-white text-emerald-600"
      }`}>
        {plan.icon}
      </div>

      <div className="mb-6">
        <h3 className={`text-2xl font-black leading-tight mb-1 ${plan.featured ? "text-white" : "text-emerald-950"}`}>
          {plan.title}
        </h3>
        {plan.subtitle && (
          <p className={`text-sm font-bold tracking-tight ${plan.featured ? "text-emerald-300" : "text-emerald-600/70"}`}>
            {plan.subtitle}
          </p>
        )}
      </div>

      <div className="flex items-baseline gap-1 mb-8">
        <span className="text-sm font-bold opacity-60">₹</span>
        <span className={`text-4xl font-black tracking-tighter ${plan.featured ? "text-white" : "text-emerald-900"}`}>
          {plan.price}
        </span>
        <span className={`text-xs font-bold uppercase tracking-wider ml-1 ${plan.featured ? "text-emerald-400/60" : "text-gray-400"}`}>
          /Project
        </span>
      </div>

      <div className={`h-px w-full mb-10 opacity-20 ${plan.featured ? "bg-white" : "bg-emerald-900"}`}></div>

      <ul className="space-y-4 mb-12 flex-grow">
        {plan.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3 text-sm font-medium leading-tight">
            <div className={`mt-0.5 rounded-full p-0.5 ${plan.featured ? "bg-emerald-500 text-emerald-900" : "bg-emerald-600 text-white"}`}>
              <CheckCircle size={12} fill="currentColor" />
            </div>
            <span className={plan.featured ? "text-emerald-50" : "text-emerald-900/80"}>
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <button
        onClick={onSelect}
        className={`w-full py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all active:scale-95 shadow-xl ${
          plan.featured 
            ? "bg-emerald-500 text-white hover:bg-emerald-400 shadow-emerald-500/30" 
            : "bg-white text-emerald-900 hover:bg-emerald-50 shadow-emerald-900/10"
        }`}
      >
        Select Plan
      </button>
    </motion.div>
  );
}
