import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import ChatBox from './ChatBox';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [openChat, setOpenChat] = useState({});
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:5000/projects');
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  const handleClick = (projectId) => {
    setOpenChat((prevState) => ({
      ...prevState,
      [projectId]: !prevState[projectId],
    }));
    setSelectedProjectId(projectId);
  };

  return (
    <Box sx={{ width: '80%', margin: '10px auto' }}>
      <Stack spacing={2}>
        {projects.map((project) => (
          <Item key={project.id}>
            <Box display="flex" justifyContent="space-between" alignItems="flex-start">
              <Box flex={1}>
                <h1>{project.title}</h1>
                <p>{project.description}</p>
                <p>Status: {project.status}</p>
                <Stack spacing={2} style={{ width: '20%' }}>
                  <Button variant="contained" onClick={() => handleClick(project.id)}>Chat</Button>
                </Stack>
              </Box>
              {openChat[project.id] && (
                <Box flex={1} marginLeft={2}>
                  <ChatBox projectId={selectedProjectId} />
                </Box>
              )}
            </Box>
          </Item>
        ))}
      </Stack>
    </Box>
  );
};

export default ProjectList;
