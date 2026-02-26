import api from "@/api";
import { useState, useRef, useEffect } from "react";
import { FaMicrophone, FaPaperPlane } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Chating() {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto scroll to bottom jab bhi naya message aaye
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const submit = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input;
    setInput("");
    setLoading(true);

    setMessages((prev) => [
      ...prev,
      {
        type: "sender",
        text: userMsg,
        date: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);

    try {
      const res = await api.post("/api/ai/generate", {
        prompt: userMsg,
        systemint: `You are a customer service assistant for 'Zenith Cloud Services'. " +
                       "Only answer questions related to cloud hosting and billing. " +
                       "If a user asks about anything else, politely decline.`,
      });
      setMessages((prev) => [
        ...prev,
        {
          type: "receiver",
          text: res.data.result,
          showBookingButton: res.data.showBookingButton || false,
          date: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          type: "receiver",
          text: "❌ Error aaya, dobara try karo.",
          date: "now",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header - fixed */}
      <div className="bg-blue-600 p-3 flex justify-center items-center shadow-md z-10">
        <p className="text-white text-xl sm:text-2xl uppercase font-bold tracking-wide text-center">
          Yuvnexeus Digital AI Assistant
        </p>
      </div>

      {/* Messages area - scrollable, pb for bottom bar */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-3">
        {messages.length === 0 && (
          <div className="flex justify-center items-center h-full">
            <p className="text-gray-400 text-sm text-center">
              Kuch bhi pucho, main hoon na! 🤖
            </p>
          </div>
        )}

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.type === "sender" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`p-3 rounded-2xl shadow max-w-[80%] sm:max-w-[70%] ${
                msg.type === "sender"
                  ? "bg-blue-500 text-white rounded-br-sm"
                  : "bg-white text-gray-800 rounded-bl-sm"
              }`}
            >
              <p className="text-sm sm:text-base whitespace-pre-wrap break-words">
                {msg.text}
              </p>
              {msg.showBookingButton && (
                <button
                  onClick={() => navigate("/bookingsystem")}
                  className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Book Appointment
                </button>
              )}
              <span
                className={`block text-xs mt-1 text-right ${msg.type === "sender" ? "text-blue-100" : "text-gray-400"}`}
              >
                {msg.date}
              </span>
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white p-3 rounded-2xl rounded-bl-sm shadow max-w-[80%]">
              <div className="flex gap-1 items-center h-5">
                <span
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0ms" }}
                ></span>
                <span
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "150ms" }}
                ></span>
                <span
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "300ms" }}
                ></span>
              </div>
            </div>
          </div>
        )}

        {/* Scroll anchor */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input bar - fixed at bottom */}
      <div className="bg-white border-t px-3 py-2 flex items-center gap-2 shadow-lg">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          type="text"
          placeholder="Type your message..."
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm outline-none focus:border-blue-400 bg-gray-50"
          disabled={loading}
        />

        {/* Mic button - hamesha dikhega */}
        <button className="bg-blue-600 text-white p-2.5 rounded-full flex-shrink-0 hover:bg-blue-700 transition">
          <FaMicrophone size={18} />
        </button>

        {/* Send button - mobile pe sirf icon, desktop pe text bhi */}
        <button
          onClick={submit}
          disabled={loading}
          className="bg-blue-600 text-white p-2.5 sm:px-4 sm:py-2 rounded-full sm:rounded-lg flex-shrink-0 hover:bg-blue-700 transition disabled:opacity-50 flex items-center gap-2"
        >
          <FaPaperPlane size={16} />
          <span className="hidden sm:inline text-sm font-medium">Send</span>
        </button>
      </div>
    </div>
  );
}
