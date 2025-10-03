import { useState } from "react";
import API from "../utils/axios"; // adjust path if needed

export default function Chatbot() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {
        if (!input.trim()) return;

        setMessages((prev) => [...prev, { sender: "user", text: input }]);
        setLoading(true);

        try {
            const res = await API.post("/chatbot", { message: input });

            setMessages((prev) => [
                ...prev,
                { sender: "bot", text: res.data.reply || "No response" },
            ]);
        } catch (err) {
            console.error("Chatbot error:", err);
            setMessages((prev) => [
                ...prev,
                { sender: "bot", text: "⚠️ Something went wrong. Please try again." },
            ]);
        } finally {
            setLoading(false);
            setInput("");
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-6 text-emerald-700">
                Assignment Partner
            </h1>

            {/* Chat Messages Box */}
            <div className="bg-white rounded-2xl border border-emerald-100 shadow-md h-[34rem] p-5 overflow-y-auto mb-5">
                {messages.length === 0 && !loading && (
                    <p className="text-gray-400 text-center italic">
                        👋 Hi! I’m your Assignment Partner. Ask me about notes, doubts, or assignments.
                    </p>
                )}

                {messages.map((msg, i) => (
                    <div
                        key={i}
                        className={`mb-4 flex ${msg.sender === "user" ? "justify-end" : "justify-start"
                            }`}
                    >
                        <div
                            className={`px-4 py-2 rounded-2xl max-w-[75%] text-base shadow-md ${msg.sender === "user"
                                    ? "bg-emerald-600 text-white rounded-br-none"
                                    : "bg-gray-100 text-gray-800 rounded-bl-none"
                                }`}
                        >
                            {msg.text}
                        </div>
                    </div>
                ))}

                {loading && (
                    <p className="text-gray-500 italic text-center">Bot is typing...</p>
                )}
            </div>

            {/* Input Box */}
            <div className="flex gap-3">
                <input
                    type="text"
                    className="flex-1 border border-emerald-300 rounded-xl px-4 py-3 shadow-sm focus:ring-2 focus:ring-emerald-500 outline-none text-base"
                    placeholder="Ask your Assignment Partner..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                />
                <button
                    onClick={sendMessage}
                    disabled={loading}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl shadow-md transition-all text-base font-medium disabled:opacity-50"
                >
                    Send
                </button>
            </div>
        </div>
    );
}
