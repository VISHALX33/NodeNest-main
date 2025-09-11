// frontend/src/pages/MediumProjects.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/axios";
import Modal from "react-modal";

Modal.setAppElement("#root");

const MediumProjects = () => {
  const navigate = useNavigate();
  const [isLoggedIn] = useState(!!localStorage.getItem("token"));
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
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
        const res = await API.get("/projects?category=medium");
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

      // Step 2: Create Razorpay Order from backend
      const payRes = await API.post("/orders/create-razorpay-order", {
        amount: total,
        orderId: res.data.orderId,
      });

      const { key, amount, currency, razorpayOrderId } = payRes.data;

      // Step 3: Open Razorpay Checkout
      const options = {
        key,
        amount,
        currency,
        name: "NoteNest Projects",
        description: selectedProject.name,
        order_id: razorpayOrderId,
        handler: async function (response) {
          try {
            // Step 4: Verify payment on backend
            await API.post("/orders/verify-payment", {
              orderId: res.data.orderId,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            alert("✅ Payment successful! Redirecting to bookings...");
            setSelectedProject(null);
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
          color: "#facc15", // Yellow theme for medium
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

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-yellow-600 mb-6 text-center">
        🟡 Medium Projects
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div
            key={project._id}
            onClick={() => handleProjectClick(project)}
            className="bg-white shadow-md rounded-2xl p-6 cursor-pointer hover:shadow-lg"
          >
            <div className="text-4xl text-center mb-4">{project.icon}</div>
            <h2 className="text-xl font-semibold text-yellow-600 text-center">
              {project.name}
            </h2>
          </div>
        ))}
      </div>

      {/* Booking Form Modal */}
      <Modal
        isOpen={!!selectedProject}
        onRequestClose={() => setSelectedProject(null)}
        className="bg-white p-8 rounded-lg max-w-md mx-auto mt-20"
      >
        <h2 className="text-2xl mb-4">Book {selectedProject?.name}</h2>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleFormChange}
            required
            className="w-full px-4 py-2 border border-yellow-200 rounded-lg"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleFormChange}
            required
            className="w-full px-4 py-2 border border-yellow-200 rounded-lg"
          />
          <input
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleFormChange}
            required
            className="w-full px-4 py-2 border border-yellow-200 rounded-lg"
          />
          <input
            name="deadline"
            type="date"
            value={formData.deadline}
            onChange={handleFormChange}
            required
            className="w-full px-4 py-2 border border-yellow-200 rounded-lg"
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
                className="mr-2 accent-yellow-500"
              />
              Student
            </label>
            <label className="flex items-center text-sm text-gray-700 ml-4">
              <input
                type="radio"
                name="planType"
                value="business"
                checked={formData.planType === "business"}
                onChange={handleFormChange}
                className="mr-2 accent-yellow-500"
              />
              Business
            </label>
          </div>

          <textarea
            name="requirements"
            placeholder="Additional Requirements"
            value={formData.requirements}
            onChange={handleFormChange}
            className="w-full px-4 py-2 border border-yellow-200 rounded-lg"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg text-white font-semibold ${
              loading
                ? "bg-yellow-300 cursor-not-allowed"
                : "bg-yellow-500 hover:bg-yellow-600"
            }`}
          >
            {loading ? "Processing..." : "Pay "}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default MediumProjects;
