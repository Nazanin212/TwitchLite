import React, { useState, useEffect, useRef } from "react";

export default function App() {
  const [messages, setMessages] = useState([
    { id: 1, user: "System", text: "Welcome to the chat!" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessages((msgs) => [
        ...msgs,
        { id: msgs.length + 1, user: "Bot", text: "Hello from the bot!" },
      ]);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  function sendMessage() {
    if (!input.trim()) return;
    setMessages((msgs) => [...msgs, { id: msgs.length + 1, user: "You", text: input }]);
    setInput("");
  }

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-[#0e0e10] text-white relative">
      {/* Chat Messages */}
      <div className="flex-grow overflow-y-auto px-4 pt-4 pb-32 space-y-3 scrollbar-thin scrollbar-thumb-gray-700">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`w-fit max-w-[75%] px-4 py-2 rounded-2xl text-sm ${
              msg.user === "You"
                ? "ml-auto bg-blue-500"
                : msg.user === "Bot"
                ? "bg-purple-600"
                : "bg-gray-700"
            }`}
          >
            <span className="font-semibold">{msg.user}:</span> {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="absolute bottom-0 left-0 w-full bg-[#1f1f23] p-4 border-t border-gray-700">
        <div className="flex gap-3">
          <input
            type="text"
            className="flex-grow rounded-full bg-gray-800 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Send a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-full font-semibold"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
