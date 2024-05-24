import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios';

const ChatBox = ({ projectId }) => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const handleSendMessage = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/projects/${projectId}/chat`, { query: message });
      setChatHistory([...chatHistory, { query: message, response: response.data.response }]);
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <Box>
      <Box>
        {chatHistory.map((chat, index) => (
          <Box key={index} marginBottom={1}>
            <strong>Query:</strong> {chat.query}<br />
            <strong>Response:</strong> {chat.response}
          </Box>
        ))}
      </Box>
      <TextField
        label="Type your message"
        variant="outlined"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        fullWidth
        multiline
        rows={4}
        margin="normal"
      />
      <Button variant="contained" onClick={handleSendMessage}>Send</Button>
    </Box>
  );
};

export default ChatBox;
