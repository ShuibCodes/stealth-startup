import React, { useState } from 'react';
import './Sidebar.css';

function Sidebar() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Add user message to chat
    const newMessage = {
      content: inputMessage,
      role: 'user',
      timestamp: new Date().toISOString(),
    };
    setMessages([...messages, newMessage]);
    setInputMessage('');

    // TODO: Implement actual GPT API call here
    // For now, just simulate a response
    const botResponse = {
      content: "This is a placeholder response. Implement GPT API here.",
      role: 'assistant',
      timestamp: new Date().toISOString(),
    };
    setMessages(prev => [...prev, botResponse]);
  };

  return (
    <div className="sidebar">
      <div className="chat-container">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.role}`}>
            <div className="message-content">{message.content}</div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="input-form">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Ask GPT something..."
          className="message-input"
        />
        <button type="submit" className="send-button">Send</button>
      </form>
    </div>
  );
}

export default Sidebar; 