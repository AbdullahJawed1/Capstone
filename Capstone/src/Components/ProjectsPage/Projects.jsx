import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import supabase from '../../CONFIG/supabaseClient';
import "./Projects.css";

function Projects() {
  const [profile, setProfile] = useState(null);
const [userInterests, setUserInterests] = useState([]);  // We'll use this for projects fetching
const [userTable, setUserType] = useState('');
const [loading, setLoading] = useState(true);  // To manage loading state during asynchronous operations
const [projects, setProjects] = useState([]);  // State to store fetched projects

useEffect(() => {
  async function fetchProfile() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user logged in.");

      const userTable = user.user_metadata.type === "student" ? "student" : "supervisors";
      setUserType(userTable);

      const { data, error } = await supabase.from(userTable)
        .select('*')
        .eq('email', user.email)
        .single();
      if (error) throw error;
      
      setProfile(data);

      setUserInterests([
        data['Area of Interest 1'],
        data['Area of Interest 2'],
        data['Area of Interest 3'],
        data['Area of Interest 4']
      ].map(interest => String(interest).trim()) // Convert everything to string and trim spaces
        .filter(interest => interest.length > 0)  // Filter out empty strings
      );
      
    } catch (error) {
      console.error('Error fetching profile:', error.message);
      setLoading(false);  // Ensure loading is set to false on error
    }
  }
  fetchProfile();
}, []);
  /*
  useEffect(() => {
    async function fetchEmailAndInterests() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          console.error('No user logged in.');
          return;
        }
        const userEmail = user?.email || '';
        const { data, error } = await supabase
          .from('student')
          .select('"Area of Interest 1", "Area of Interest 2", "Area of Interest 3", "Area of Interest 4"')
          .eq('email', userEmail);

        if (error) throw error;

        if (data.length > 0) {
          const userInterests = data[0];
          setUserInterests([
            userInterests['Area of Interest 1'], 
            userInterests['Area of Interest 2'],
            userInterests['Area of Interest 3'], 
            userInterests['Area of Interest 4']
          ]);
        }
      } catch (error) {
        console.error('Error fetching user email and interests:', error.message);
      }
    }

    fetchEmailAndInterests();
  }, []);*/

  useEffect(() => {
    async function fetchProjects() {
      if (userInterests.length === 0) {
        console.log('No user interests to use for fetching projects.');
        return;
      }
    
      try {
        const response = await fetch('http://127.0.0.1:5000/recommend-projects', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ user_interests: userInterests })
        });
    
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
    
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error.message);
      } finally {
        setLoading(false);
      }
    }
    
  if (userInterests.length > 0) {  // Ensuring we call fetchProjects only when interests are available
      fetchProjects();
    }
  }, [userInterests]);  // Dependency array ensures this effect runs when userInterests are set/updated

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