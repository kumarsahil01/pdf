// src/components/ChatInterface.js
import React, { useState } from 'react';
import axios from 'axios';

const ChatInterface = ({ projectId }) => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(`http://localhost:5000/projects/${projectId}/chat`, { query });
      setResponse(result.data.response);
    } catch (error) {
      console.error('Error fetching chat response:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Ask a question" required />
        <button type="submit">Submit</button>
      </form>
      <div>{response}</div>
    </div>
  );
};

export default ChatInterface;
