import React, { useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const ProjectForm = ({ onProjectCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/projects', formData);
      onProjectCreated(response.data);
      setTitle('');
      setDescription('');
      setFile(null);
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  return (
    <Box component={Paper} sx={{ padding: 3, marginBottom: 3 }} elevation={3}>
      <Typography variant="h5" component="h2" gutterBottom>
        Create a New Project
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          fullWidth
        />
        <TextField
          label="Description"
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          fullWidth
          multiline
          rows={4}
        />
        <Button
          variant="contained"
          component="label"
          fullWidth
        >
          Upload File
          <input
            type="file"
            hidden
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
        </Button>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Create Project
        </Button>
      </Box>
    </Box>
  );
};

export default ProjectForm;
