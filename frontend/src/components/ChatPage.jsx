import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Sparkles,
  Send,
  MessageCircle,
  Bot,
  Users,
  Loader2,
} from "lucide-react";
import API from "../utils/axios";
import { getStoredUser } from "../utils/auth";

function formatTime(dateStr) {
  const d = new Date(dateStr);
  const now = new Date();
  const isToday = d.toDateString() === now.toDateString();
  const time = d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  if (isToday) return time;
  return `${d.toLocaleDateString([], { month: "short", day: "numeric" })} · ${time}`;
}

function getInitials(name) {
  return (name || "U")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);
  const currentUser = getStoredUser();

  const fetchMessages = async () => {
    try {
      const res = await API.get("/chat");
      setMessages(res.data);
    } catch (err) {
      console.error("Error fetching messages:", err);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() || sending) return;
    setSending(true);
    try {
      await API.post("/chat", { text: text.trim() });
      setText("");
      await fetchMessages();
    } catch (err) {
      console.error("Error sending message:", err);
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const isOwnMessage = (msg) => {
    const msgUserId = msg.user?._id || msg.user;
    return currentUser?._id && msgUserId && String(msgUserId) === String(currentUser._id);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-emerald-50/50 via-white to-white overflow-hidden">
      <div className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 bg-emerald-200/25 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute bottom-20 -left-20 w-64 h-64 bg-teal-200/20 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 relative z-10">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-700 via-emerald-800 to-teal-900 p-6 md:p-8 mb-6 text-white shadow-xl"
        >
          <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-emerald-100 text-xs font-bold uppercase tracking-wider mb-3 border border-white/20">
                <Sparkles size={12} /> Community
              </span>
              <h1 className="text-2xl md:text-3xl font-black tracking-tight flex items-center gap-2">
                <MessageCircle size={28} className="opacity-90" />
                Global Chat Room
              </h1>
              <p className="mt-2 text-emerald-50/90 text-sm max-w-lg">
                Connect with fellow NoteSea students — ask doubts, share tips, and stay in the loop.
              </p>
            </div>
            <Link
              to="/chatbot"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-white text-emerald-800 rounded-xl font-bold text-sm hover:bg-emerald-50 transition-colors shadow-lg shrink-0"
            >
              <Bot size={18} /> AI Assistant
            </Link>
          </div>
        </motion.div>

        {/* Stats strip */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-white border border-emerald-100 rounded-2xl p-4 flex items-center gap-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Users size={18} />
            </div>
            <div>
              <p className="text-lg font-black text-emerald-900">{messages.length}</p>
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Messages</p>
            </div>
          </div>
          <div className="bg-white border border-emerald-100 rounded-2xl p-4 flex items-center gap-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <MessageCircle size={18} />
            </div>
            <div>
              <p className="text-lg font-black text-emerald-900">Live</p>
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Auto-refresh</p>
            </div>
          </div>
        </div>

        {/* Chat panel */}
        <div className="bg-white border border-emerald-100 rounded-3xl shadow-lg overflow-hidden flex flex-col h-[calc(100vh-22rem)] min-h-[420px] max-h-[640px]">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 custom-scrollbar bg-gradient-to-b from-emerald-50/30 to-white">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-full gap-3">
                <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
                <p className="text-sm text-gray-500 font-medium">Loading messages…</p>
              </div>
            ) : messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center px-6">
                <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                  <MessageCircle size={28} />
                </div>
                <p className="font-bold text-emerald-900 text-lg">No messages yet</p>
                <p className="text-sm text-gray-500 mt-1 max-w-xs">
                  Be the first to say hi! Your message will appear here for everyone.
                </p>
              </div>
            ) : (
              messages.map((msg, i) => {
                const own = isOwnMessage(msg);
                const userName = msg.user?.name || "Unknown User";
                return (
                  <motion.div
                    key={msg._id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(i * 0.02, 0.3) }}
                    className={`flex gap-3 ${own ? "flex-row-reverse" : ""}`}
                  >
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black shrink-0 ${
                        own
                          ? "bg-emerald-600 text-white"
                          : "bg-emerald-100 text-emerald-700"
                      }`}
                    >
                      {getInitials(userName)}
                    </div>
                    <div className={`max-w-[75%] sm:max-w-[65%] ${own ? "items-end" : "items-start"} flex flex-col`}>
                      <div className="flex items-baseline gap-2 mb-1 px-1">
                        <span className={`text-xs font-bold ${own ? "text-emerald-700" : "text-gray-600"}`}>
                          {own ? "You" : userName}
                        </span>
                        <span className="text-[10px] text-gray-400">{formatTime(msg.createdAt)}</span>
                      </div>
                      <div
                        className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                          own
                            ? "bg-emerald-600 text-white rounded-tr-md"
                            : "bg-white border border-emerald-100 text-gray-800 rounded-tl-md"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={sendMessage}
            className="p-4 border-t border-emerald-100 bg-white flex gap-2 sm:gap-3 items-center"
          >
            <input
              className="flex-1 border border-emerald-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 bg-emerald-50/30 placeholder:text-gray-400"
              placeholder="Type your message…"
              value={text}
              onChange={(e) => setText(e.target.value)}
              disabled={sending}
            />
            <button
              type="submit"
              disabled={!text.trim() || sending}
              className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-300 disabled:cursor-not-allowed text-white px-5 py-3 rounded-2xl font-bold text-sm shadow-md shadow-emerald-600/20 transition-all active:scale-95 shrink-0"
            >
              {sending ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
              <span className="hidden sm:inline">Send</span>
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          Be respectful. Messages are visible to all logged-in NoteSea members.
        </p>
      </div>
    </div>
  );
}
