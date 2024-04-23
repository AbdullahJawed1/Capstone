import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import supabase from '../../CONFIG/supabaseClient'; // Assuming you've exported supabase instance correctly
import "./Projects.css";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search Projects"
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input" // Added class for styling
        />
      </div>
      <div className="card_container">
        {filteredProjects.map(project => (
          <Card key={project.ProjectID} border="info" style={{ width: "18rem", height: "22rem", marginBottom: "20px" }}>
            <Card.Body>
              <Card.Title>{project.title}</Card.Title>
              <Card.Text>
                {project.domain}
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
