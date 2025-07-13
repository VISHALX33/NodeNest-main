import { useEffect, useState } from 'react';
import API from '../axios';

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
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">💬 Global Chat Room</h2>

      <div className="bg-white border border-indigo-100 p-4 h-[400px] overflow-y-auto rounded-2xl shadow-sm mb-4">
        {messages.length === 0 ? (
          <p className="text-gray-400 text-center mt-10">No messages yet. Be the first to say hi 👋</p>
        ) : (
          messages.map((msg) => {
            const userName = msg.user?.name || 'Unknown User';
            return (
              <div key={msg._id} className="mb-3">
                <div className="bg-indigo-50 p-2 rounded-lg">
                  <p className="font-semibold text-indigo-700">{userName}</p>
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
          className="flex-1 border border-indigo-200 rounded-full px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="Type your message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-5 py-2 rounded-full hover:bg-indigo-700 transition-all duration-200 shadow-sm"
        >
          Send
        </button>
      </form>
    </div>
  );
}
