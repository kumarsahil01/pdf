// src/App.js
import React, { useState } from 'react';
import ProjectForm from './components/ProjectForm';
import ProjectList from './components/ProjectList';
import ChatInterface from './components/chatInterface';

const App = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div>
      <h1>PDF Chat App</h1>
      <ProjectForm onProjectCreated={(project) => setSelectedProject(project)} />
      <ProjectList onProjectSelect={(project) => setSelectedProject(project)} />
      {selectedProject && <ChatInterface projectId={selectedProject.id} />}
    </div>
  );
};

export default App;
