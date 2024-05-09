import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import "./Projects.css";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch('http://127.0.0.1:5000/recommend-projects', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ user_interests: 'machine learning, Corporate ' }) // Provide user interests here
        });
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setProjects(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching projects:', error.message);
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  const handleClose = () => {
    setSelectedProject(null);
  };

  const handleOpen = (project) => {
    setSelectedProject(project);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (projects.length === 0) {
    return <div>No projects found.</div>;
  }

  return (
    <>
      <div className="card_container">
        {projects.map((project, index) => (
          <Card key={index} border="info" style={{ width: "18rem", height: "22rem", marginBottom: "20px" }}>
            <Card.Body>
              <Card.Title>{project.title}</Card.Title>
              <Card.Text>{project.domain}</Card.Text>
              <Button variant="primary" onClick={() => handleOpen(project)}>Open</Button>
            </Card.Body>
          </Card>
        ))}
      </div>
      <Modal show={selectedProject !== null} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedProject && selectedProject.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProject && (
            <div>
              <p><strong>Domain:</strong> {selectedProject.domain}</p>
              <p><strong>Summary:</strong> {selectedProject.summary}</p>
              <p><strong>Tag:</strong> {selectedProject.tag}</p>
              <p><strong>Authors:</strong> {selectedProject.authors}</p>
              {/* Add other project details here */}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Projects;