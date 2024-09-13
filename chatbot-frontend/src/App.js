import React from 'react';
import Chatbot from './components/chatBot';
import './App.css'; // Optional: Global styles for the app

const App = () => {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Retail Analytics Chatbot</h1>
      </header>
      <main>
        <Chatbot />
      </main>
      <footer className="app-footer">
        <p>&copy; 2024 Retail Analytics Platform</p>
      </footer>
    </div>
  );
}

export default App;
