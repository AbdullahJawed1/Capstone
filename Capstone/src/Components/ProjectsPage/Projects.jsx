import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import supabase from '../../CONFIG/supabaseClient'; // Assuming you've exported supabase instance correctly
import "./Projects.css";

function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function fetchProjects() {
      const { data, error } = await supabase.from('projects').select('*');
      if (error) {
        console.error('Error fetching projects:', error.message);
      } else {
        setProjects(data);
      }
    }
    fetchProjects();
  }, []);

  return (
    <>
      <div className="card_container">
        {projects.map(project => (
          <Card key={project.ProjectID} border="info" style={{ width: "18rem", height: "22rem", marginBottom: "20px" }}>
            <Card.Body>
              <Card.Title>{project.Title}</Card.Title>
              <Card.Text>
                {project.Subjects}
              </Card.Text>
              <Button variant="primary">Open</Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </>
  );
}

export default Projects;
