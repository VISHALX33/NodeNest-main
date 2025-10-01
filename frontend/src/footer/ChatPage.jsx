import { useEffect, useState } from 'react';
import API from '../utils/axios';

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  const fetchMessages = async () => {
    try {
      const res = await API.get('/chat');
      setMessages(res.data);
    } catch (err) {
      console.error('Error fetching messages:', err);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    try {
      await API.post('/chat', { text });
      setText('');
      fetchMessages();
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center text-emerald-700">Global Chat Room</h2>

      <div className="bg-white border border-emerald-200 p-4 h-[400px] overflow-y-auto rounded-2xl shadow mb-4">
        {messages.length === 0 ? (
          <p className="text-gray-400 text-center mt-10">No messages yet. Be the first to say hi </p>
        ) : (
          messages.map((msg) => {
            const userName = msg.user?.name || 'Unknown User';
            return (
              <div key={msg._id} className="mb-3">
                <div className="bg-emerald-50 p-3 rounded-lg">
                  <p className="font-semibold text-emerald-700">{userName}</p>
                  <p className="text-gray-800">{msg.text}</p>
                </div>
                <p className="text-xs text-gray-500 mt-1 ml-1">
                  {new Date(msg.createdAt).toLocaleString()}
                </p>
              </div>
            );
          })
        )}
      </div>

      <form onSubmit={sendMessage} className="flex gap-2">
        <input
          className="flex-1 border border-emerald-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-sm"
          placeholder="Type your message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          type="submit"
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-full shadow-sm transition-all duration-200"
        >
          Send
        </button>
      </form>
    </div>
  );
}
