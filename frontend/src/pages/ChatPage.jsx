import { useEffect, useState } from 'react';
import API from '../axios';

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  const fetchMessages = async () => {
    const res = await API.get('/chat');
    setMessages(res.data);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    await API.post('/chat', { text });
    setText('');
    fetchMessages();
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Global Chat</h2>
      <div className="bg-gray-100 p-4 h-[400px] overflow-y-auto rounded mb-4">
        {messages.map(msg => (
          <div key={msg._id} className="mb-2">
            <strong>{msg.user.name}:</strong> {msg.text}
            <div className="text-xs text-gray-500">{new Date(msg.createdAt).toLocaleString()}</div>
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage} className="flex gap-2">
        <input
          className="flex-1 border p-2 rounded"
          placeholder="Type your message..."
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Send</button>
      </form>
    </div>
  );
}
