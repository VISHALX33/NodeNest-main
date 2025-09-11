
// frontend/src/pages/MyBookings.jsx
import React, { useState, useEffect } from "react";
import API from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { 
  FaUser, 
  FaCalendarAlt, 
  FaCreditCard, 
  FaDownload, 
  FaShoppingBag, 
  FaInfoCircle,
  FaSpinner,
  FaBoxOpen
} from "react-icons/fa";

const MyBookings = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

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
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mb-4"></div>
        <p className="text-gray-600">Loading your bookings...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <h1 className="text-3xl font-bold text-center text-green-700 mb-2">My Bookings</h1>
      <p className="text-gray-600 text-center mb-8">View and manage all your project orders</p>

      {orders.length === 0 ? (
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-md p-8 text-center border-t-4 border-green-500">
          <div className="text-5xl mb-4 text-gray-400"><FaBoxOpen className="inline" /></div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">No bookings yet</h2>
          <p className="text-gray-500 mb-6">You haven't placed any orders. Start by exploring our projects!</p>
          <button
            onClick={() => navigate("/easy-projects")}
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition duration-200"
          >
            Browse Projects
          </button>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-2xl shadow-md overflow-hidden border-t-4 border-green-500 hover:shadow-lg transition-shadow duration-200">
              <div className="bg-green-50 px-4 py-3 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800 truncate flex items-center">
                  <FaShoppingBag className="text-green-600 mr-2" size={16} />
                  {order.project?.name || "Project"}
                </h2>
                <p className="text-xs text-gray-500 mt-1">ID: {order.orderId || "N/A"}</p>
              </div>
              
              <div className="p-4">
                {/* Customer Info */}
                <div className="mb-4">
                  <div className="flex items-center text-sm text-gray-500 mb-1">
                    <FaUser className="text-green-600 mr-2" size={14} />
                    Customer
                  </div>
                  <div className="text-sm font-medium text-gray-800 truncate">{order.userDetails?.name || "Not provided"}</div>
                  <div className="text-xs text-gray-600">{order.userDetails?.phone || "No phone"}</div>
                </div>
                
                {/* Booking Details */}
                <div className="mb-4">
                  <div className="flex items-center text-sm text-gray-500 mb-1">
                    <FaCalendarAlt className="text-green-600 mr-2" size={14} />
                    Booking Details
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-gray-500">Ordered:</div>
                    <div className="text-gray-800">{formatDate(order.createdAt)}</div>
                    <div className="text-gray-500">deliveryDate:</div>
                    <div className="text-gray-800">{formatDate(order.deliveryDate)}</div>
                    <div className="text-gray-500">Plan:</div>
                    <div className="capitalize text-gray-800">{order.planType || "N/A"}</div>
                  </div>
                </div>
                
                {/* Payment Info */}
                <div className="mb-4">
                  <div className="flex items-center text-sm text-gray-500 mb-1">
                    <FaCreditCard className="text-green-600 mr-2" size={14} />
                    Payment
                  </div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-md font-semibold text-green-600">₹{order.totalAmount || order.basePrice || "N/A"}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      order.paymentStatus === "completed" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {order.paymentStatus === "completed" ? "Paid" : "Pending"}
                    </span>
                  </div>
                  <div className="text-sm mt-2">
                    Status: <span className={`font-medium ${
                      order.orderStatus === "delivered" 
                        ? "text-green-600" 
                        : order.orderStatus === "in_progress" 
                        ? "text-blue-600" 
                        : "text-yellow-600"
                    }`}>
                      {order.orderStatus === "delivered" 
                        ? "Delivered" 
                        : order.orderStatus === "in_progress" 
                        ? "In Progress" 
                        : "Pending"}
                    </span>
                  </div>
                </div>
                
                {/* Action Button */}
                <div className="mt-4">
                  {order.orderStatus === "delivered" && order.projectFiles && order.projectFiles.length > 0 ? (
                    <button
                      onClick={() => handleDownload(order._id, order.projectFiles[0])}
                      disabled={downloading}
                      className={`w-full flex items-center justify-center px-4 py-2 rounded-lg text-white font-medium ${
                        downloading ? "bg-green-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
                      } transition duration-200`}
                    >
                      {downloading ? (
                        <>
                          <FaSpinner className="animate-spin mr-2" />
                          Downloading
                        </>
                      ) : (
                        <>
                          <FaDownload className="mr-2" />
                          Download
                        </>
                      )}
                    </button>
                  ) : (
                    <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-700 flex items-start">
                      <FaInfoCircle className="text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                      {order.orderStatus === "in_progress"
                        ? "Your project is currently in progress"
                        : "Pending delivery - we'll notify you when ready"}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;