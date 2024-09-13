import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../App.css'; // You'll style the chatbot using this CSS file

const Chatbot = () => {
  const [messages, setMessages] = useState([]); // Stores chat history
  const [userInput, setUserInput] = useState(''); // Stores user input
  const [isTyping, setIsTyping] = useState(false); // Typing indicator
  const chatWindowRef = useRef(null);

  // Function to handle sending messages
  const handleSend = async () => {
    if (!userInput.trim()) return;

    const newMessage = { text: userInput, sender: 'user' };
    setMessages([...messages, newMessage]);
    setUserInput('');

    // Simulate chatbot typing
    setIsTyping(true);

    // Call backend API to get chatbot response
    try {
      const response = await axios.post('http://localhost:5000/query', { query: userInput });
      const botMessage = { text: response.data.reply, sender: 'bot' };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error fetching response from API:', error);
    } finally {
      setIsTyping(false);
    }
  };

  // Scroll to the bottom of the chat when new messages arrive
  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chatbot-container">
      <div className="chat-window" ref={chatWindowRef}>
        {messages.map((message, index) => (
          <div key={index} className={`chat-message ${message.sender}`}>
            {message.text}
          </div>
        ))}
        {isTyping && <div className="typing-indicator">Chatbot is typing...</div>}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your message here..."
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
