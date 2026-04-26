import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Monitor, BookOpen, Layers, CheckCircle,Phone, X, CreditCard, Gift, User, Mail, MessageSquare, ChevronDown } from "lucide-react";
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
    serviceType: "",
    course: "",
    branch: "",
    college: "",
    subject: "",
    semester: "",
    title: "",
    objective: "",
    keywords: "",
    abstract: "",
    deadline: "",
    platform: "",
    fileFormat: ["Word (DOCX)"],
    fontDetails: "",
    lineSpacing: "",
    citationStyle: "IEEE",
    limit: "",
    teamSize: 1,
    studentNames: [""],
    guideName: "",
    facultyInstructions: "",
    includeDiagrams: false,
    includeCode: false,
    includePlagiarism: false,
    revisions: 2,
    urgency: "Normal",
    referenceMaterial: "",
    formDate: new Date().toISOString().split('T')[0],
    couponCode: "",
  });
  const [step, setStep] = useState(1);
  const [agreed, setAgreed] = useState(false);
  const [files, setFiles] = useState([]);
  const [eSignFile, setESignFile] = useState(null);
  const [calculation, setCalculation] = useState({
    base: 0,
    total: 0,
    discount: 0,
  });

  const plans = [
    {
      id: "presentation",
      title: "Presentation",
      serviceType: "PowerPoint Presentation (PPT)",
      price: 499,
      icon: <Monitor className="text-emerald-600" size={32} />,
      features: ["Upto 10-15 Professional Slides", "Speaker Notes Included", "Modern Visual Design", "Only 3 updates possible"],
      gradient: "from-emerald-50 to-teal-50",
      description: "Get a high-impact, professionally designed presentation tailored for your project or academic seminar."
    },
    {
      id: "report_paper",
      title: "Report / Research Paper",
      serviceType: "Report",
      price: 999,
      icon: <BookOpen className="text-emerald-600" size={32} />,
      features: ["Upto 10 Page Research Paper", "Upto 60 Page Comprehensive Report", "Plagiarism-Free", "Only 3 updates possible"],
      gradient: "from-blue-50 to-indigo-50",
      description: "Professional academic writing for research papers and comprehensive reports with proper formatting."
    },
    {
      id: "ppt_plus_report",
      title: "PPT + Report",
      serviceType: "PPT + Report",
      price: 1499,
      icon: <Layers className="text-emerald-600" size={32} />,
      features: ["Upto 10-15 Professional Slides", "Upto 60 Page Detailed Report", "Professional Formatting", "Only 3 updates possible"],
      gradient: "from-cyan-50 to-blue-50",
      description: "A perfect blend of a visual presentation and a comprehensive project report for your academic needs."
    },
    {
      id: "report_plus_paper",
      title: "Report + Research Paper",
      serviceType: "Research Paper",
      price: 1699,
      icon: <Layers className="text-emerald-600" size={32} />,
      features: ["Upto 60 Page Detailed Report", "Upto 10 Page Research Paper", "Academic Formatting", "Only 3 updates possible"],
      gradient: "from-purple-50 to-pink-50",
      description: "A complete bundle of a detailed project report and a structured research paper for your final submissions."
    },
    {
      id: "ultimate_bundle",
      title: "The Ultimate Bundle",
      subtitle: "Presentation, Research, Report",
      serviceType: "Academic Project",
      price: 2099,
      icon: <FileText className="text-emerald-600" size={32} />,
      features: ["Upto 60 Page Report", "Upto 10 Page Research Paper", "Upto 10-15 Slides Presentation", "Only 3 updates possible"],
      gradient: "from-orange-50 to-amber-50",
      description: "Our complete documentation package covering every aspect of your project's submission requirements."
    },
    {
      id: "elite_all_in_one",
      title: "Elite All-In-One",
      subtitle: "Project + Full Documentation",
      serviceType: "Academic Project",
      price: 7599,
      icon: <Layers className="text-emerald-600" size={32} />,
      features: ["Custom MERN Project", "Upto 60 Page Report", "Upto 10 Page Research Paper", "Upto 10-15 Slides Presentation", "Priority Support"],
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
    setFormData(prev => ({ 
      ...prev, 
      serviceType: plan.serviceType,
      studentNames: Array.from({ length: prev.teamSize || 1 }).map((_, i) => prev.studentNames[i] || "")
    }));
  };

  const handleContinue = () => setShowForm(true);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTeamSizeChange = (e) => {
    const size = Math.max(1, parseInt(e.target.value) || 1);
    const names = [...formData.studentNames];
    if (names.length < size) {
      for (let i = names.length; i < size; i++) names.push("");
    } else {
      names.length = size;
    }
    setFormData({ ...formData, teamSize: size, studentNames: names });
  };

  const handleStudentNameChange = (index, value) => {
    const names = [...formData.studentNames];
    names[index] = value;
    setFormData({ ...formData, studentNames: names });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };

  const handleMultiSelectChange = (name, val) => {
    const current = formData[name] || [];
    const updated = current.includes(val)
      ? current.filter(i => i !== val)
      : [...current, val];
    setFormData({ ...formData, [name]: updated });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    if (!agreed) return alert("Please agree to the Terms & Conditions.");
    if (!eSignFile) return alert("Please upload your e-signature.");

    setLoading(true);

    try {
      // Prepare multipart form data
      const data = new FormData();
      data.append("serviceName", selectedPlan.title);
      data.append("servicePrice", selectedPlan.price);
      data.append("userDetails", JSON.stringify({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      }));
      data.append("couponCode", formData.couponCode);
      
      // All other fields go into formData
      const { name, email, phone, couponCode, ...rest } = formData;
      data.append("formData", JSON.stringify(rest));
      
      // Append files
      if (eSignFile) data.append("clientFiles", eSignFile);
      files.forEach(file => data.append("clientFiles", file));

      // STEP 1: Create service order in backend
      const res = await API.post("/service-orders", data, {
        headers: { "Content-Type": "multipart/form-data" }
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
        {plans.map((plan, index) => (
          <PricingCard key={index} plan={plan} onSelect={() => handlePlanClick(plan)} />
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
      {/* ================= MULTI-STEP BOOKING FORM MODAL ================= */}
      <Modal
        isOpen={!!selectedPlan && showForm}
        onRequestClose={() => {
          setSelectedPlan(null);
          setShowForm(false);
          setStep(1);
        }}
        className="outline-none"
        overlayClassName="fixed inset-0 bg-emerald-950/40 backdrop-blur-sm flex justify-center items-center z-[110] px-4"
      >
        <AnimatePresence mode="wait">
          {selectedPlan && showForm && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-[2.5rem] shadow-2xl max-w-4xl w-full overflow-hidden border border-emerald-50 flex flex-col max-h-[90vh]"
            >
              {/* Header with Progress Bar */}
              <div className="p-6 border-b border-gray-100 flex-shrink-0">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h2 className="text-xl font-black text-emerald-950">Requirement Form</h2>
                    <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest">{selectedPlan.title} • Step {step} of 7</p>
                  </div>
                  <button onClick={() => setShowForm(false)} className="p-2 hover:bg-emerald-50 rounded-full transition-colors text-gray-400">
                    <X size={20} />
                  </button>
                </div>
                
                {/* Progress Bar */}
                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(step / 7) * 100}%` }}
                    className="h-full bg-emerald-500"
                  />
                </div>
              </div>

              {/* Form Content (Scrollable) */}
              <div className="p-8 overflow-y-auto flex-grow custom-scrollbar">
                <form id="multi-step-form" onSubmit={handleFormSubmit} className="space-y-6">
                  {step === 1 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                      <h3 className="text-lg font-bold text-emerald-900 border-l-4 border-emerald-500 pl-3">1. Client Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <InputField label="Full Name" name="name" value={formData.name} onChange={handleFormChange} icon={<User size={14} />} required />
                        <InputField label="Email Address" name="email" type="email" value={formData.email} onChange={handleFormChange} icon={<Mail size={14} />} required />
                      </div>
                      <InputField label="Contact Number (WhatsApp preferred)" name="phone" value={formData.phone} onChange={handleFormChange} icon={<Phone size={14} />} required />
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                      <h3 className="text-lg font-bold text-emerald-900 border-l-4 border-emerald-500 pl-3">2. Service & Academic Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <SelectField 
                          label="Service Type" 
                          name="serviceType" 
                          value={formData.serviceType || selectedPlan.title} 
                          onChange={handleFormChange} 
                          options={["Research Paper", "Report", "PPT + Report", "PowerPoint Presentation (PPT)", "Academic Project", "Other"]} 
                        />
                        <InputField label="Course / Degree" name="course" value={formData.course} onChange={handleFormChange} placeholder="e.g., B.Tech, MBA" required />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <InputField label="Branch / Stream" name="branch" value={formData.branch} onChange={handleFormChange} required />
                        <InputField label="College / University Name" name="college" value={formData.college} onChange={handleFormChange} required />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <InputField label="Subject Name" name="subject" value={formData.subject} onChange={handleFormChange} required />
                        <InputField label="Semester / Year" name="semester" value={formData.semester} onChange={handleFormChange} required />
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                      <h3 className="text-lg font-bold text-emerald-900 border-l-4 border-emerald-500 pl-3">3. Project / Work Details</h3>
                      <InputField label="Title / Topic" name="title" value={formData.title} onChange={handleFormChange} required />
                      <TextAreaField label="Objective / Problem Statement" name="objective" value={formData.objective} onChange={handleFormChange} required />
                      <InputField label="Keywords (if any)" name="keywords" value={formData.keywords} onChange={handleFormChange} />
                      <TextAreaField label="Abstract / Idea (if already decided)" name="abstract" value={formData.abstract} onChange={handleFormChange} />
                    </motion.div>
                  )}

                  {step === 4 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                      <h3 className="text-lg font-bold text-emerald-900 border-l-4 border-emerald-500 pl-3">4. Submission & Formatting</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <InputField label="Submission Date (Deadline)" name="deadline" type="date" value={formData.deadline} onChange={handleFormChange} required />
                        <InputField label="Platform (e.g., LMS, Classroom)" name="platform" value={formData.platform} onChange={handleFormChange} />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <MultiSelectField 
                          label="File Format Required" 
                          name="fileFormat" 
                          value={formData.fileFormat} 
                          onToggle={(val) => handleMultiSelectChange("fileFormat", val)} 
                          options={["Word (DOCX)", "PDF", "PPT", "Excel (XLSX)", "Other"]} 
                        />
                        <InputField label="Font Style & Size" name="fontDetails" value={formData.fontDetails} onChange={handleFormChange} placeholder="e.g., Times New Roman, 12" />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        <InputField label="Line Spacing" name="lineSpacing" value={formData.lineSpacing} onChange={handleFormChange} />
                        <SelectField label="Citation Style" name="citationStyle" value={formData.citationStyle} onChange={handleFormChange} options={["IEEE", "APA", "MLA", "Harvard", "Not Required"]} />
                        <InputField label="Page / Slide Limit" name="limit" value={formData.limit} onChange={handleFormChange} />
                      </div>
                    </motion.div>
                  )}

                  {step === 5 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                      <h3 className="text-lg font-bold text-emerald-900 border-l-4 border-emerald-500 pl-3">5. Team & Faculty Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <InputField 
                          label="Number of Members" 
                          name="teamSize" 
                          type="number" 
                          value={formData.teamSize} 
                          onChange={handleTeamSizeChange} 
                          required
                        />
                        <InputField label="Guide / Coordinator Name" name="guideName" value={formData.guideName} onChange={handleFormChange} />
                      </div>
                      
                      <div className="space-y-4">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                          <User size={10} /> Names of Students
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          {formData.studentNames.map((name, i) => (
                            <InputField
                              key={i}
                              label={`Student ${i + 1} Name`}
                              name={`studentName_${i}`}
                              value={name}
                              onChange={(e) => handleStudentNameChange(i, e.target.value)}
                              placeholder={`Enter name of member ${i + 1}`}
                              required
                            />
                          ))}
                        </div>
                      </div>
                      
                      <TextAreaField label="Special Instructions from Faculty" name="facultyInstructions" value={formData.facultyInstructions} onChange={handleFormChange} />
                    </motion.div>
                  )}

                  {step === 6 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                      <h3 className="text-lg font-bold text-emerald-900 border-l-4 border-emerald-500 pl-3">6. Requirements & Delivery</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        <CheckboxField label="Include Diagrams/Graphs" name="includeDiagrams" checked={formData.includeDiagrams} onChange={handleCheckboxChange} />
                        <CheckboxField label="Include Code/Simulation" name="includeCode" checked={formData.includeCode} onChange={handleCheckboxChange} />
                        <CheckboxField label="Include Plagiarism Report" name="includePlagiarism" checked={formData.includePlagiarism} onChange={handleCheckboxChange} />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <InputField label="Number of Revisions Expected" name="revisions" type="number" value={formData.revisions} onChange={handleFormChange} placeholder="Standard: 2" />
                        <SelectField label="Urgency Level" name="urgency" value={formData.urgency} onChange={handleFormChange} options={["Normal", "Urgent", "Very Urgent"]} />
                      </div>
                      <InputField label="Reference Material (Link or name)" name="referenceMaterial" value={formData.referenceMaterial} onChange={handleFormChange} />
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Reference Material Upload</label>
                        <input type="file" multiple onChange={(e) => setFiles([...files, ...Array.from(e.target.files)])} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-black file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 transition-all" />
                      </div>
                    </motion.div>
                  )}

                  {step === 7 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                      <h3 className="text-lg font-bold text-emerald-900 border-l-4 border-emerald-500 pl-3">7. Declaration & Finalize</h3>
                      
                      {/* T&C Dropdown */}
                      <TermsAndConditionsDropdown />

                      <div className="bg-emerald-50 p-6 rounded-[2rem] border border-emerald-100 space-y-4">
                        <label className="flex items-start gap-3 cursor-pointer group">
                          <input 
                            type="checkbox" 
                            required 
                            className="mt-1 w-5 h-5 rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500"
                            checked={agreed}
                            onChange={(e) => setAgreed(e.target.checked)}
                          />
                          <span className="text-sm text-emerald-900 font-medium leading-relaxed group-hover:text-emerald-700 transition-colors">
                            I confirm that the information provided is accurate, and I agree to the Terms & Conditions. I understand NoteSea provides content for reference/guidance purposes only.
                          </span>
                        </label>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Upload E-Sign</label>
                          <input type="file" onChange={(e) => setESignFile(e.target.files[0])} required className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-black file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 transition-all" />
                        </div>
                        <InputField label="Date" name="formDate" type="date" value={formData.formDate || new Date().toISOString().split('T')[0]} onChange={handleFormChange} required />
                      </div>

                      <div className="space-y-1 pt-4">
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
                    </motion.div>
                  )}
                </form>
              </div>

              {/* Footer Actions */}
              <div className="p-6 border-t border-gray-100 flex justify-between items-center bg-gray-50/50 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => setStep(s => Math.max(1, s - 1))}
                  disabled={step === 1}
                  className={`px-6 py-3 rounded-xl font-bold text-sm transition-all ${step === 1 ? "text-gray-300 cursor-not-allowed" : "text-emerald-700 hover:bg-emerald-50"}`}
                >
                  Previous
                </button>

                {step < 7 ? (
                  <button
                    type="button"
                    onClick={() => setStep(s => Math.min(7, s + 1))}
                    className="px-8 py-3 bg-emerald-600 text-white rounded-xl font-black text-sm hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 active:scale-95"
                  >
                    Next Step
                  </button>
                ) : (
                  <button
                    form="multi-step-form"
                    type="submit"
                    disabled={loading || !agreed}
                    className={`px-10 py-4 rounded-2xl text-white font-black text-lg transition-all flex items-center justify-center gap-2 shadow-xl active:scale-95 ${loading || !agreed ? "bg-emerald-300 cursor-not-allowed" : "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20"}`}
                  >
                    {loading ? "Processing..." : `Pay ₹${selectedPlan.price} & Book`}
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Modal>
    </div>
  );
}


function InputField({ label, name, value, onChange, type = "text", placeholder = "", icon, required = false }) {
  return (
    <div className="space-y-1">
      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-1">
        {icon} {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-5 py-3.5 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all outline-none text-emerald-950 font-medium placeholder:text-gray-300"
      />
    </div>
  );
}

function SelectField({ label, name, value, onChange, options, required = false }) {
  return (
    <div className="space-y-1">
      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative group">
        <select
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="w-full px-5 py-3.5 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all outline-none text-emerald-950 font-medium appearance-none cursor-pointer"
        >
          {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-focus-within:text-emerald-500 transition-colors">
          <ChevronDown size={14} />
        </div>
      </div>
    </div>
  );
}

function MultiSelectField({ label, name, value = [], onToggle, options }) {
  return (
    <div className="space-y-1">
      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-1">
        {label} (Select Multiple)
      </label>
      <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-2xl border-2 border-transparent focus-within:border-emerald-500/20 focus-within:bg-white transition-all">
        {options.map(opt => {
          const isSelected = value.includes(opt);
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onToggle(opt)}
              className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all border ${
                isSelected 
                  ? "bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-200" 
                  : "bg-white text-gray-400 border-gray-100 hover:border-emerald-200 hover:text-emerald-600"
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function TextAreaField({ label, name, value, onChange, rows = 3, placeholder = "", required = false }) {
  return (
    <div className="space-y-1">
      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        name={name}
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-5 py-3.5 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all outline-none text-emerald-950 font-medium placeholder:text-gray-300 resize-none"
      />
    </div>
  );
}

function CheckboxField({ label, name, checked, onChange }) {
  return (
    <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl cursor-pointer hover:bg-gray-100 transition-colors">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className="w-5 h-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
      />
      <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">{label}</span>
    </label>
  );
}

function TermsAndConditionsDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const tc = [
    { title: "1. Nature of Services", content: "NoteSea provides customized research assistance, reference materials, sample reports, presentations, and project guidance based on client requirements. All deliverables are intended strictly for educational reference, research support, and learning purposes only." },
    { title: "2. User Responsibility", content: "By purchasing any service from NoteSea, the client agrees that: The material provided will be used only as a guide or reference. The client is solely responsible for how the material is used, submitted, or presented. The client will comply with the academic policies, guidelines, and integrity rules of their respective institution." },
    { title: "3. No Guarantee of Academic Acceptance", content: "NoteSea does not guarantee: Approval, acceptance, or grading outcomes of any submitted work. Compliance with specific institutional formats unless explicitly agreed. That the work will meet all university or professor expectations." },
    { title: "4. Academic Integrity Disclaimer", content: "NoteSea strictly discourages unethical academic practices. If a client chooses to submit the provided material as their own work: It is done entirely at their own risk. NoteSea shall not be held responsible for any consequences, including but not limited to: Academic penalties, Plagiarism claims, Disciplinary action, Suspension or expulsion." },
    { title: "5. Plagiarism & Originality", content: "We strive to provide original, custom-written content. However, due to the nature of research and common knowledge, similarities may exist. Final responsibility for plagiarism checks and proper citation lies with the client." },
    { title: "6. Liability Limitation", content: "Under no circumstances shall NoteSea be liable for: Rejection of projects, reports, or research papers; Academic misconduct allegations; Institutional penalties or legal consequences; Any direct or indirect damages arising from the use of our services." },
    { title: "7. Payment Policy", content: "All payments are non-refundable once work has been initiated. Partial refunds (if any) are at the sole discretion of NoteSea. Revisions (if offered) will be limited to the agreed scope." },
    { title: "8. Revisions Policy", content: "Limited revisions may be provided based on the original requirements. There are 2 revisions allowed per order. o First – During final submission for overview. o Second – After submission in university/college (if rejected for formatting). Additional revision may charge extra amount. Any major change in topic, scope, or instructions will be treated as a new order." },
    { title: "9. Confidentiality", content: "Client information will be kept confidential. NoteSea will not share personal details with third parties unless required by law." },
    { title: "10. Intellectual Property", content: "The delivered work is provided for personal use only. Redistribution, resale, or commercial use without permission is prohibited." },
    { title: "11. Agreement Acceptance", content: "By placing an order with NoteSea, the client acknowledges that they have: Read and understood these Terms & Conditions; Agreed to comply with all clauses mentioned above." }
  ];

  return (
    <div className="border border-emerald-100 rounded-2xl overflow-hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 bg-emerald-50 text-emerald-900 font-black text-sm uppercase tracking-widest"
      >
        Terms and Conditions – NoteSea
        <motion.span animate={{ rotate: isOpen ? 180 : 0 }}><ChevronDown size={16} /></motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-white p-4 space-y-4 max-h-60 overflow-y-auto text-xs text-gray-600 leading-relaxed custom-scrollbar"
          >
            {tc.map((item, i) => (
              <div key={i} className="space-y-1">
                <p className="font-black text-emerald-800 uppercase tracking-tighter">{item.title}</p>
                <p>{item.content}</p>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
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
