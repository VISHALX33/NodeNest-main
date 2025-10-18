// frontend/src/pages/HardProjects.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/axios";
import Modal from "react-modal";

Modal.setAppElement("#root");

const HardProjects = () => {
  const navigate = useNavigate();
  const [isLoggedIn] = useState(!!localStorage.getItem("token"));
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState("preview"); // preview | images | details
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    planType: "student",
    requirements: "",
    deadline: "",
  });
  const [calculation, setCalculation] = useState({ base: 0, total: 0 });
  const [orderId, setOrderId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await API.get("/projects?category=hard");
        setProjects(res.data);
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    };
    fetchProjects();
  }, []);

  const handleProjectClick = (project) => {
    if (!isLoggedIn) {
      alert("Please login to proceed.");
      navigate("/");
      return;
    }
    setSelectedProject(project);
    setShowForm(false);
    setActiveTab("preview");
  };

  const handleContinue = () => {
    setShowForm(true);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      const base =
        formData.planType === "student"
          ? selectedProject.studentPrice
          : selectedProject.businessPrice;

      const total = base;

      // Step 1: Create order in DB
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
      });

      setCalculation({ base, total });
      setOrderId(res.data.orderId);

      // Step 2: Create Razorpay Order
      const payRes = await API.post("/orders/create-razorpay-order", {
        amount: total,
        orderId: res.data.orderId,
      });

      const { key, amount, currency, razorpayOrderId } = payRes.data;

      // Step 3: Razorpay Checkout
      const options = {
        key,
        amount,
        currency,
        name: "NoteSea Projects",
        description: selectedProject.name,
        order_id: razorpayOrderId,
        handler: async function (response) {
          try {
            await API.post("/orders/verify-payment", {
              orderId: res.data.orderId,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            alert("✅ Payment successful! Redirecting to bookings...");
            setSelectedProject(null);
            setShowForm(false);
            navigate("/my-bookings");
          } catch (err) {
            alert(err.response?.data?.message || "Error verifying payment");
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: "#ef4444", // red theme for Hard Projects
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      alert(err.response?.data?.message || "Error creating order");
    } finally {
      setLoading(false);
    }
  };

  // Sample images (replace with real ones from backend later)
  const sampleImages = [
    "https://via.placeholder.com/600x400/ef4444/ffffff?text=Hard+Image+1",
    "https://via.placeholder.com/600x400/7f1d1d/ffffff?text=Hard+Image+2",
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-emerald-600 mb-6 text-center">
        🔴 Advanced Projects
      </h1>

      {/* Project Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div
            key={project._id}
            onClick={() => handleProjectClick(project)}
            className="bg-white shadow-md rounded-2xl p-6 cursor-pointer hover:shadow-lg"
          >
            <div className="text-4xl text-center mb-4">{project.icon}</div>
            <h2 className="text-xl font-semibold text-emerald-600 text-center mb-2">
              {project.name}
            </h2>
            <p className="text-gray-600 text-sm text-center">{project.description}</p>
            <div className="text-center mt-2">
              <span className="text-emerald-500 font-medium">₹{project.studentPrice}</span>
              <span className="mx-2">|</span>
              <span className="text-emerald-500 font-medium">₹{project.businessPrice}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Preview Modal */}
      <Modal
        isOpen={!!selectedProject && !showForm}
        onRequestClose={() => setSelectedProject(null)}
        className="bg-white p-6 rounded-lg max-w-4xl w-[90%] mx-auto mt-10 max-h-[90vh] overflow-y-auto shadow-lg"
        overlayClassName="fixed inset-0 bg-white/60  bg-opacity-50 flex justify-center items-center"
      >
        {selectedProject && (
          <div className="flex flex-col md:flex-row">
            {/* Left Side (Tabs + Content) */}
            <div className="md:w-1/2 p-6">
              <h2 className="text-2xl font-bold text-emerald-600 mb-2">
                {selectedProject.name}
              </h2>

              {/* Tabs */}
              <div className="flex border-b border-emerald-200 mb-4">
                <button
                  className={`py-2 px-4 font-medium ${
                    activeTab === "preview"
                      ? "text-emerald-600 border-b-2 border-emerald-600"
                      : "text-gray-500"
                  }`}
                  onClick={() => setActiveTab("preview")}
                >
                  Preview
                </button>
                <button
                  className={`py-2 px-4 font-medium ${
                    activeTab === "images"
                      ? "text-emerald-600 border-b-2 border-emerald-600"
                      : "text-gray-500"
                  }`}
                  onClick={() => setActiveTab("images")}
                >
                  Images
                </button>
                <button
                  className={`py-2 px-4 font-medium ${
                    activeTab === "details"
                      ? "text-emerald-600 border-b-2 border-emerald-600"
                      : "text-gray-500"
                  }`}
                  onClick={() => setActiveTab("details")}
                >
                  Details
                </button>
              </div>

              {/* Tab Content */}
              <div className="h-80 overflow-y-auto border border-emerald-200 rounded-lg p-4">
                {activeTab === "preview" && (
                  <p className="text-gray-600">{selectedProject.description}</p>
                )}

                {activeTab === "images" && (
                  <div className="grid grid-cols-1 gap-4">
                    {sampleImages.map((img, i) => (
                      <div
                        key={i}
                        className="border border-emerald-200 rounded-lg overflow-hidden"
                      >
                        <img
                          src={img}
                          alt={`${selectedProject.name} ${i + 1}`}
                          className="w-full h-40 object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "details" && (
                  <ul className="space-y-2">
                    {selectedProject.features?.length > 0 ? (
                      selectedProject.features.map((f, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-emerald-500 mr-2">✓</span>
                          <span>{f}</span>
                        </li>
                      ))
                    ) : (
                      <p className="text-gray-500">No features listed</p>
                    )}
                  </ul>
                )}
              </div>
            </div>

            {/* Right Side (About + Action) */}
            <div className="md:w-1/2 p-6 flex flex-col">
              <h3 className="text-xl font-semibold text-emerald-600 mb-4">
                About {selectedProject.name}
              </h3>
              <p className="text-gray-600 mb-6 flex-grow">
                {selectedProject.description}
              </p>

              <div className="mt-auto">
                <button
                  onClick={handleContinue}
                  className="w-full py-2 rounded-lg text-white font-semibold bg-emerald-500 hover:bg-emerald-600"
                >
                  Continue to Book
                </button>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="w-full py-2 mt-3 rounded-lg text-gray-700 font-medium border border-gray-300 hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Booking Form Modal */}
      <Modal
        isOpen={!!selectedProject && showForm}
        onRequestClose={() => {
          setSelectedProject(null);
          setShowForm(false);
        }}
        className="bg-white p-6 rounded-lg max-w-md w-[90%] mx-auto mt-10 max-h-[90vh] overflow-y-auto shadow-lg"
        overlayClassName="fixed inset-0 bg-white/60  bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-2xl mb-4">Book {selectedProject?.name}</h2>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleFormChange}
            required
            className="w-full px-4 py-2 border border-emerald-200 rounded-lg"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleFormChange}
            required
            className="w-full px-4 py-2 border border-emerald-200 rounded-lg"
          />
          <input
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleFormChange}
            required
            className="w-full px-4 py-2 border border-emerald-200 rounded-lg"
          />
          <input
            name="deadline"
            type="date"
            value={formData.deadline}
            onChange={handleFormChange}
            required
            className="w-full px-4 py-2 border border-emerald-200 rounded-lg"
          />

          {/* Plan Type */}
          <div className="mb-2">
            <label className="flex items-center text-sm text-gray-700">
              <input
                type="radio"
                name="planType"
                value="student"
                checked={formData.planType === "student"}
                onChange={handleFormChange}
                className="mr-2 accent-emerald-500"
              />
              Student (₹{selectedProject?.studentPrice})
            </label>
            <label className="flex items-center text-sm text-gray-700 ml-4">
              <input
                type="radio"
                name="planType"
                value="business"
                checked={formData.planType === "business"}
                onChange={handleFormChange}
                className="mr-2 accent-emerald-500"
              />
              Business (₹{selectedProject?.businessPrice})
            </label>
          </div>

          <textarea
            name="requirements"
            placeholder="Additional Requirements"
            value={formData.requirements}
            onChange={handleFormChange}
            className="w-full px-4 py-2 border border-emerald-200 rounded-lg"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg text-white font-semibold ${
              loading
                ? "bg-emerald-300 cursor-not-allowed"
                : "bg-emerald-500 hover:bg-emerald-600"
            }`}
          >
            {loading
              ? "Processing..."
              : `Pay ₹${
                  formData.planType === "student"
                    ? selectedProject?.studentPrice
                    : selectedProject?.businessPrice
                }`}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default HardProjects;
