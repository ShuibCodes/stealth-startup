import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "./Card";

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

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, messagesEndRef]); // Added messagesEndRef to dependencies

  const handleSend = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: "user" }]);
      setInput("");
      setIsTyping(true);
      setError(null);

      // Simulate API call
      setTimeout(() => {
        try {
          // Simulating potential errors
          if (Math.random() < 0.1)
            throw new Error("Failed to get response from ChatGPT");

          const response =
            CHATGPT_RESPONSES[
              Math.floor(Math.random() * CHATGPT_RESPONSES.length)
            ];
          setMessages((messages) => [
            ...messages,
            { text: response, sender: "bot" },
          ]);
        } catch (err) {
          setError(
            "An error occurred while fetching the response. Please try again."
          );
        } finally {
          setIsTyping(false);
        }
      }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      handleSend(e);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-12 h-12 shadow-lg"
        >
          <MessageCircle />
        </button>
      )}
      {isOpen && (
        <Card className="w-96 h-[32rem] flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between">
            <h3 className="font-semibold">ChatGPT Assistant</h3>
            <button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </button>
          </CardHeader>
          <CardContent className="flex-grow p-4">
            <div className="h-full">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-4 ${
                    message.sender === "user" ? "text-right" : "text-left"
                  }`}
                >
                  <div
                    className={`inline-block p-2 rounded-lg ${
                      message.sender === "user"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-800"
                    } max-w-[80%]`}
                  >
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
              <div ref={messagesEndRef} />
            </div>
          </CardContent>
          <CardFooter>
            <form onSubmit={handleSend} className="flex w-full">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className="flex-grow mr-2"
                disabled={isTyping}
              />
              <button type="submit" disabled={isTyping}>
                <Send className="h-4 w-4" />
              </button>
            </form>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
