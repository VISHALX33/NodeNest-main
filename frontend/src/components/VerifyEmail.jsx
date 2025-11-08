import { useState, useEffect } from "react";
import API from "../utils/axios";
import { useNavigate, useLocation } from "react-router-dom";

export default function VerifyEmail() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email); // auto-fill from RegisterForm
    }
  }, [location.state]);

  // Countdown timer effect
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    if (timeLeft <= 0) {
      alert("OTP expired. Please request a new one.");
      return;
    }

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
    <div className="min-h-screen flex items-center justify-center bg-emerald-50 p-4">
      <form
        onSubmit={handleVerify}
        className="space-y-6 p-8 w-full max-w-md bg-white shadow-lg rounded-xl"
      >
        <h2 className="text-2xl font-extrabold text-center text-emerald-700">
          Verify Your Email
        </h2>
        <p className="text-center text-gray-600 text-sm">
          Enter the OTP sent to your email to complete registration.
        </p>

        {/* Countdown Timer */}
        <p className="text-center text-red-500 font-medium">
          OTP expires in: {formatTime(timeLeft)}
        </p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          readOnly
          className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />
        <input
          type="text"
          placeholder="OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />
        <button
          type="submit"
          disabled={loading || timeLeft <= 0}
          className={`w-full py-3 rounded-lg text-white font-semibold transition duration-200 ${
            loading || timeLeft <= 0
              ? "bg-emerald-300 cursor-not-allowed"
              : "bg-emerald-600 hover:bg-emerald-700"
          }`}
        >
          {timeLeft <= 0 ? "OTP Expired" : loading ? "Verifying..." : "Verify Email"}
        </button>
        {/* <p className="text-center text-gray-600 text-sm">check your inbox or spam folder for the OTP !! </p> */}
         <p className="text-center text-gray-600 text-sm">
  <input type="checkbox" className="mr-2 accent-blue-600" required />
  checked inbox or spam folder for the OTP !!
</p>
      </form>
    </div>
  );
}
