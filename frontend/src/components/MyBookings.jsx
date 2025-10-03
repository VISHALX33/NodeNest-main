// frontend/src/pages/MyBookings.jsx
import React, { useState, useEffect } from "react";
import API from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { 
  FaUser, 
  FaCalendarAlt, 
  FaCreditCard, 
  FaDownload, 
  FaInfoCircle,
  FaSpinner,
  FaShoppingBag
} from "react-icons/fa";

const MyBookings = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }
    const fetchOrders = async () => {
      try {
        const res = await API.get("/orders/myorders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data);
      } catch (err) {
        alert(err.response?.data?.message || "Error fetching bookings");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [navigate]);

  const handleDownload = async (orderId, filePath) => {
    if (downloading) return;
    setDownloading(true);
    try {
      const res = await API.get(`/orders/${orderId}/download`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filePath.split("/").pop());
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      alert(err.response?.data?.message || "Error downloading file");
    } finally {
      setDownloading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Not specified";
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500 mb-4"></div>
        <p className="text-gray-600">Loading your bookings...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <h1 className="text-3xl font-bold text-center text-emerald-700 mb-2">My Bookings</h1>
      <p className="text-gray-600 text-center mb-8">View and manage all your project orders</p>

      {orders.length === 0 ? (
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-md p-8 text-center border-t-4 border-emerald-500">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">No bookings yet</h2>
          <p className="text-gray-500 mb-6">You haven't placed any orders. Start by exploring our projects!</p>
          <button
            onClick={() => navigate("/easy-projects")}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-6 rounded-lg transition duration-200"
          >
            Browse Projects
          </button>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div 
              key={order._id} 
              className="max-w-sm mx-auto bg-emerald-600 rounded-2xl shadow-lg text-white p-4"
            >
              {/* Header */}
              <div className="bg-white text-black rounded-xl p-4 mb-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-bold text-lg flex items-center gap-2">
                    <FaShoppingBag className="text-emerald-600" />
                    {order.project?.name || "Project"}
                  </h2>
                  <p className="text-xs text-gray-600">ID: {order.orderId || "N/A"}</p>
                </div>
              </div>

              {/* Customer Info */}
              <div className="bg-white text-black rounded-xl p-4 mb-4">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <p className="font-semibold flex items-center gap-1"><FaUser /> Name:</p>
                  <p>{order.userDetails?.name || "N/A"}</p>

                  <p className="font-semibold">Phone:</p>
                  <p>{order.userDetails?.phone || "N/A"}</p>

                  <p className="font-semibold flex items-center gap-1"><FaCalendarAlt /> Ordered:</p>
                  <p>{formatDate(order.createdAt)}</p>

                  <p className="font-semibold">Delivery:</p>
                  <p>{formatDate(order.deliveryDate)}</p>

                  <p className="font-semibold">Plan:</p>
                  <p className="capitalize">{order.planType || "N/A"}</p>
                </div>
              </div>

              {/* Payment */}
              <div className="bg-white text-black rounded-xl p-4 mb-4">
                <p className="font-semibold flex items-center gap-1 mb-2"><FaCreditCard /> Payment</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-emerald-600">₹{order.totalAmount || order.basePrice || "N/A"}</span>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      order.paymentStatus === "completed"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-yellow-100 text-emerald-800"
                    }`}
                  >
                    {order.paymentStatus === "completed" ? "Paid" : "Pending"}
                  </span>
                </div>
                <p className="text-sm mt-2">
                  Status:{" "}
                  <span
                    className={`font-medium ${
                      order.orderStatus === "delivered"
                        ? "text-emerald-600"
                        : order.orderStatus === "in_progress"
                        ? "text-emerald-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {order.orderStatus === "delivered"
                      ? "Delivered"
                      : order.orderStatus === "in_progress"
                      ? "In Progress"
                      : "Pending"}
                  </span>
                </p>
              </div>

              {/* Action */}
              <div className="space-y-3">
                {order.orderStatus === "delivered" && order.projectFiles && order.projectFiles.length > 0 ? (
                  <button
                    onClick={() => handleDownload(order._id, order.projectFiles[0])}
                    disabled={downloading}
                    className={`w-full flex items-center justify-center gap-2 bg-white text-black font-medium py-2 rounded-xl shadow hover:bg-gray-100 transition ${
                      downloading && "cursor-not-allowed"
                    }`}
                  >
                    {downloading ? (
                      <>
                        <FaSpinner className="animate-spin" />
                        Downloading...
                      </>
                    ) : (
                      <>
                        <FaDownload />
                        Download Project
                      </>
                    )}
                  </button>
                ) : (
                  <div className="bg-gray-100 text-black p-2 rounded-md text-sm flex items-start gap-2">
                    <FaInfoCircle className="text-emerald-600 mt-0.5" />
                    {order.orderStatus === "in_progress"
                      ? "Your project is currently in progress"
                      : "Pending delivery - we'll notify you when ready"}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
