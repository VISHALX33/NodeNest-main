import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, User, Eye, EyeOff, ShieldCheck, ArrowLeft } from "lucide-react";
import API from "../utils/axios";
import { motion } from "framer-motion";
import NoteNestLogo from "/NoteNestLogo.png";

export default function AdminLogin() {
  const [data, setData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Check if already admin and redirect
      // For now just redirect to admin if token exists
      // The PrivateRoute will handle actual admin check
      // navigate("/admin"); 
    }
  }, []);

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setError("");

    try {
      const res = await API.post("/users/login", data);
      localStorage.setItem("token", res.data.token);
      
      // Check if user is admin
      const adminEmails = ['vishalprajapati2303@gmail.com', 'harshul@notesea.xyz','ceo@notesea.xyz'];
      if (adminEmails.includes(res.data.user.email)) {
        navigate("/admin");
      } else {
        localStorage.removeItem("token");
        setError("Access Denied: You are not authorized to access the Admin Panel.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
      <div className="absolute top-8 left-8">
        <button 
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-slate-500 hover:text-emerald-600 transition-colors font-bold"
        >
          <ArrowLeft size={20} /> Back to Home
        </button>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl shadow-emerald-900/10 border border-emerald-50 overflow-hidden"
      >
        <div className="bg-emerald-700 p-10 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Lock size={120} className="text-white" />
          </div>
          <div className="relative z-10">
            <img src={NoteNestLogo} alt="NoteSea" className="h-16 w-16 mx-auto mb-4 bg-white p-2 rounded-2xl" />
            <h1 className="text-2xl font-black text-white tracking-tight">Admin Console</h1>
            <p className="text-emerald-100/80 text-sm font-medium mt-1">Authorized Personnel Only</p>
          </div>
        </div>

        <div className="p-10">
          {error && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 p-4 bg-rose-50 border border-rose-100 text-rose-700 rounded-2xl text-sm font-bold flex items-center gap-3"
            >
              <div className="bg-rose-100 p-1.5 rounded-full">
                <Lock size={16} />
              </div>
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-slate-400 text-xs font-black uppercase ml-4 tracking-widest">Admin Email</label>
              <div className="relative">
                <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="email"
                  name="email"
                  placeholder="admin@notesea.xyz"
                  onChange={handleChange}
                  required
                  className="w-full pl-14 pr-6 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:border-emerald-500 focus:bg-white transition-all outline-none text-slate-700 font-bold placeholder:text-slate-300"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-slate-400 text-xs font-black uppercase ml-4 tracking-widest">Access Pass</label>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  onChange={handleChange}
                  required
                  className="w-full pl-14 pr-14 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:border-emerald-500 focus:bg-white transition-all outline-none text-slate-700 font-bold placeholder:text-slate-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-700 text-white py-5 rounded-2xl font-black text-lg hover:bg-emerald-800 hover:shadow-xl hover:shadow-emerald-900/20 active:scale-[0.98] transition-all disabled:bg-slate-200 disabled:text-slate-400 flex items-center justify-center gap-3"
            >
              {loading ? (
                <div className="h-6 w-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <ShieldCheck size={24} />
                  Authorize Access
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-slate-400 text-xs font-medium uppercase tracking-tighter leading-relaxed">
            By logging in, you agree to maintain the security of the NoteSea platform. 
            All actions are logged for security purposes.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
