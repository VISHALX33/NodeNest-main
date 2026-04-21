// frontend/src/components/MyBookings.jsx
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
  FaShoppingBag,
  FaFileAlt,
} from "react-icons/fa";

const MyBookings = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [serviceOrders, setServiceOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    const fetchAll = async () => {
      try {
        const [projectRes, serviceRes] = await Promise.all([
          API.get("/orders/myorders"),
          API.get("/service-orders/mine"),
        ]);
        setOrders(projectRes.data);
        setServiceOrders(serviceRes.data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [navigate]);

  // Download for project orders
  const handleDownload = async (orderId, filePath) => {
    if (downloading) return;
    setDownloading(true);
    try {
      const res = await API.get(`/orders/${orderId}/download`, {
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

  // Download for service orders
  const handleServiceDownload = async (orderId, filePath) => {
    if (downloading) return;
    setDownloading(true);
    try {
      const res = await API.get(`/service-orders/${orderId}/download`, {
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
    return new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500 mb-4"></div>
        <p className="text-gray-600">Loading your bookings...</p>
      </div>
    );
  }

  const hasAnything = orders.length > 0 || serviceOrders.length > 0;

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <h1 className="text-3xl font-bold text-center text-emerald-700 mb-2">
        My Bookings
      </h1>
      <p className="text-gray-600 text-center mb-10">
        View and manage all your project orders and service bookings
      </p>

      {!hasAnything ? (
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-md p-8 text-center border-t-4 border-emerald-500">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            No bookings yet
          </h2>
          <p className="text-gray-500 mb-6">
            You haven't placed any orders. Start by exploring our projects and
            academic services!
          </p>
          <button
            onClick={() => navigate("/easy-projects")}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-6 rounded-lg transition duration-200"
          >
            Browse Projects
          </button>
        </div>
      ) : (
        <>
          {/* ── Project Orders ── */}
          {orders.length > 0 && (
            <section className="max-w-5xl mx-auto mb-12">
              <div className="flex items-center gap-2 mb-6">
                <FaShoppingBag className="text-emerald-600 text-xl" />
                <h2 className="text-xl font-bold text-emerald-700">
                  Project Orders
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {orders.map((order) => (
                  <div
                    key={order._id}
                    className="bg-emerald-600 rounded-2xl shadow-lg text-white p-4"
                  >
                    {/* Header */}
                    <div className="bg-white text-black rounded-xl p-4 mb-4">
                      <h2 className="font-bold text-lg flex items-center gap-2">
                        <FaShoppingBag className="text-emerald-600" />
                        {order.project?.name ||
                          order.projectDetails?.name ||
                          "Project Order"}
                      </h2>
                      <p className="text-xs text-gray-500 mt-1">
                        ID: {order.orderId || "N/A"}
                      </p>
                    </div>

                    {/* Customer info */}
                    <div className="bg-white text-black rounded-xl p-4 mb-4 grid grid-cols-2 gap-2 text-sm">
                      <p className="font-semibold flex items-center gap-1">
                        <FaUser /> Name:
                      </p>
                      <p>{order.userDetails?.name || "N/A"}</p>
                      <p className="font-semibold flex items-center gap-1">
                        <FaCalendarAlt /> Ordered:
                      </p>
                      <p>{formatDate(order.createdAt)}</p>
                      <p className="font-semibold">Delivery:</p>
                      <p>{formatDate(order.deliveryDate)}</p>
                    </div>

                    {/* Payment */}
                    <div className="bg-white text-black rounded-xl p-4 mb-4">
                      <p className="font-semibold flex items-center gap-1 mb-2">
                        <FaCreditCard /> Payment
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-emerald-600">
                          ₹{order.totalAmount || order.basePrice}
                        </span>
                        <span className="text-xs px-2 py-1 rounded-full bg-emerald-100 text-emerald-800">
                          Paid
                        </span>
                      </div>
                      <p className="text-sm mt-2">
                        Status:{" "}
                        <span className="font-medium text-emerald-600 capitalize">
                          {order.orderStatus || "Pending"}
                        </span>
                      </p>
                    </div>

                    {/* Action */}
                    {order.orderStatus === "delivered" &&
                    order.projectFiles?.length > 0 ? (
                      <button
                        onClick={() =>
                          handleDownload(order._id, order.projectFiles[0])
                        }
                        disabled={downloading}
                        className="w-full flex items-center justify-center gap-2 bg-white text-black font-medium py-2 rounded-xl shadow hover:bg-gray-100 transition"
                      >
                        {downloading ? (
                          <>
                            <FaSpinner className="animate-spin" /> Downloading...
                          </>
                        ) : (
                          <>
                            <FaDownload /> Download Project
                          </>
                        )}
                      </button>
                    ) : (
                      <div className="bg-amber-50 border border-amber-200 text-amber-800 p-3 rounded-xl text-sm flex items-start gap-2">
                        <FaInfoCircle className="text-amber-500 mt-0.5 shrink-0" />
                        <span>
                          {order.orderStatus === "in_progress"
                            ? "Your project is in progress."
                            : "Pending — we'll notify you when ready."}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ── Service Orders (Research / Documentation) ── */}
          {serviceOrders.length > 0 && (
            <section className="max-w-5xl mx-auto">
              <div className="flex items-center gap-2 mb-6">
                <FaFileAlt className="text-emerald-600 text-xl" />
                <h2 className="text-xl font-bold text-emerald-700">
                  Research & Documentation Services
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {serviceOrders.map((order) => (
                  <div
                    key={order._id}
                    className="bg-white border border-emerald-100 rounded-2xl shadow-lg p-4"
                  >
                    {/* Header */}
                    <div className="bg-emerald-600 text-white rounded-xl p-4 mb-4">
                      <h2 className="font-bold text-lg flex items-center gap-2">
                        <FaFileAlt />
                        {order.serviceName}
                      </h2>
                      <p className="text-xs text-emerald-200 mt-1">
                        ID: {order.orderId || "N/A"}
                      </p>
                    </div>

                    {/* Customer info */}
                    <div className="text-sm text-gray-700 mb-4 space-y-1 px-1">
                      <p>
                        <span className="font-semibold">Name:</span>{" "}
                        {order.userDetails?.name || "N/A"}
                      </p>
                      <p>
                        <span className="font-semibold">Phone:</span>{" "}
                        {order.userDetails?.phone || "N/A"}
                      </p>
                      <p>
                        <span className="font-semibold">Ordered:</span>{" "}
                        {formatDate(order.createdAt)}
                      </p>
                      {order.requirements && (
                        <p>
                          <span className="font-semibold">Requirements:</span>{" "}
                          <span className="text-gray-500 line-clamp-2">
                            {order.requirements}
                          </span>
                        </p>
                      )}
                    </div>

                    {/* Payment */}
                    <div className="flex justify-between items-center border-t border-gray-100 pt-3 mb-4">
                      <span className="font-bold text-emerald-700 text-lg">
                        ₹{order.totalAmount}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs px-2 py-1 rounded-full bg-emerald-100 text-emerald-800 font-medium">
                          Paid
                        </span>
                        <span
                          className={`text-xs px-2 py-1 rounded-full font-medium ${
                            order.orderStatus === "delivered"
                              ? "bg-blue-100 text-blue-800"
                              : order.orderStatus === "in_progress"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {order.orderStatus === "delivered"
                            ? "Delivered"
                            : order.orderStatus === "in_progress"
                            ? "In Progress"
                            : "Pending"}
                        </span>
                      </div>
                    </div>

                    {/* Action */}
                    {order.orderStatus === "delivered" &&
                    order.deliveredFiles?.length > 0 ? (
                      <button
                        onClick={() =>
                          handleServiceDownload(
                            order._id,
                            order.deliveredFiles[0]
                          )
                        }
                        disabled={downloading}
                        className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white font-medium py-2.5 rounded-xl shadow hover:bg-emerald-700 transition"
                      >
                        {downloading ? (
                          <>
                            <FaSpinner className="animate-spin" /> Downloading...
                          </>
                        ) : (
                          <>
                            <FaDownload /> Download Files
                          </>
                        )}
                      </button>
                    ) : order.orderStatus === "in_progress" ? (
                      <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-xl text-sm flex items-start gap-2">
                        <FaInfoCircle className="text-emerald-600 mt-0.5 shrink-0" />
                        <span>✅ Our team is actively working on your service.</span>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="bg-amber-50 border border-amber-200 text-amber-800 p-3 rounded-xl text-sm flex items-start gap-2">
                          <FaInfoCircle className="text-amber-500 mt-0.5 shrink-0" />
                          <span>
                            ✅ Payment confirmed! Work will begin shortly.
                            <span className="text-xs text-amber-600 mt-1 block">
                              Contact us on WhatsApp for updates.
                            </span>
                          </span>
                        </div>
                        <a
                          href="https://wa.me/919001509419"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full flex items-center justify-center gap-2 bg-emerald-50 text-emerald-700 font-semibold py-2 rounded-xl hover:bg-emerald-100 transition text-sm border border-emerald-200"
                        >
                          📞 Contact on WhatsApp
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
};

export default MyBookings;
