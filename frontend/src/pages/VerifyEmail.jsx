import { useState, useEffect } from "react";
import API from "../axios";
import { useNavigate, useLocation } from "react-router-dom";

export default function VerifyEmail() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email); // auto-fill from RegisterForm
    }
  }, [location.state]);

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post("/users/verify-otp", { email, otp });
      localStorage.setItem("token", res.data.token);
      alert("Email verified! 🎉");
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 p-4">
      <form
        onSubmit={handleVerify}
        className="space-y-6 p-8 w-full max-w-md bg-white shadow-lg rounded-xl"
      >
        <h2 className="text-2xl font-extrabold text-center text-green-700">
          Verify Your Email
        </h2>
        <p className="text-center text-gray-600 text-sm">
          Enter the OTP sent to your email to complete registration.
        </p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          readOnly
          className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <input
          type="text"
          placeholder="OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg text-white font-semibold transition duration-200 ${
            loading ? "bg-green-300 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "Verifying..." : "Verify Email"}
        </button>
      </form>
    </div>
  );
}
