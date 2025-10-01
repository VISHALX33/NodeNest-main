import { useState } from "react";
import API from "../utils/axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/users/forgot-password", { email });
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-emerald-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-emerald-700 mb-4">Forgot Password</h2>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-400 mb-4"
        />
        <button type="submit" className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg">
          Send Reset Link
        </button>
      </form>
    </div>
  );
}
