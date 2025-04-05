import React, { useState } from "react";
import { createPortal } from "react-dom";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";

const CHATGPT_RESPONSES = [
  "That's an interesting point. Can you elaborate on that?",
  "I understand. Have you considered looking at it from a different perspective?",
  "Based on the information you've provided, I'd suggest...",
  "That's a complex issue. Let's break it down step by step.",
  "I'm not sure I have enough information to answer that fully. Could you provide more context?",
  "That's a great question! Here's what I know about that topic...",
  "I see where you're coming from. However, it's also worth considering...",
  "Let me think about that for a moment... Okay, here's my take on it:",
  "That's fascinating! I'd love to learn more about your experience with this.",
  "I'm afraid I don't have a definitive answer for that, but here's what current research suggests:",
];

const ChatWindow = ({ isOpen, onClose, messages, isTyping, error, input, onInputChange, onSubmit }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed bottom-4 right-4 z-50 w-96 h-[32rem] flex flex-col bg-white rounded-lg shadow-xl">
      <div className="flex flex-row items-center justify-between p-4 border-b">
        <h3 className="font-semibold">ChatGPT Assistant</h3>
        <button onClick={onClose} className="hover:bg-gray-100 rounded-full p-1">
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="flex-grow p-4 overflow-hidden">
        <div className="h-full overflow-y-auto flex flex-col-reverse">
          <div>
            {messages.map((message, index) => (
              <div key={index} className={`mb-4 ${message.sender === "user" ? "text-right" : "text-left"}`}>
                <div className={`inline-block p-2 rounded-lg ${message.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"} max-w-[80%]`}>
                  {message.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-center text-gray-500 mb-4">
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ChatGPT is typing...
              </div>
            )}
            {error && <div className="text-red-500 mb-4">{error}</div>}
          </div>
        </div>
      </div>
      <div className="border-t p-4">
        <form onSubmit={onSubmit} className="flex w-full">
          <input
            value={input}
            onChange={onInputChange}
            placeholder="Type a message..."
            className="flex-grow mr-2 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isTyping}
          />
          <button 
            type="submit" 
            disabled={isTyping}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>,
    document.body
  );
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);

  const handleSend = (e) => {
    e.preventDefault();
    if (input.trim()) {
      const newMessages = [...messages, { text: input, sender: "user" }];
      setMessages(newMessages);
      setInput("");
      setIsTyping(true);
      setError(null);

      setTimeout(() => {
        try {
          const response = CHATGPT_RESPONSES[Math.floor(Math.random() * CHATGPT_RESPONSES.length)];
          setMessages([...newMessages, { text: response, sender: "bot" }]);
        } catch (err) {
          setError("An error occurred while fetching the response. Please try again.");
        } finally {
          setIsTyping(false);
        }
      }, 1000);
    }
  };

  return (
    <>
      {!isOpen && (
        <button onClick={() => setIsOpen(true)} className="fixed bottom-4 right-4 z-50 rounded-full w-12 h-12 shadow-lg">
          <MessageCircle />
        </button>
      )}
      <ChatWindow
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        messages={messages}
        isTyping={isTyping}
        error={error}
        input={input}
        onInputChange={(e) => setInput(e.target.value)}
        onSubmit={handleSend}
      />
    </>
  );
};

export default Chatbot;