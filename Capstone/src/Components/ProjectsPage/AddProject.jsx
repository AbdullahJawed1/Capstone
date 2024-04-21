// components/AddProjectPage.js
import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
import NavBar from "../NavBar/NavBar";

const AddProject = () => {
//   const history = useHistory();
  const [projectData, setProjectData] = useState({
    title: "",
    description: "",
    // Add more fields as needed
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData({
      ...projectData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform actions like submitting the project data to a backend API
    // Example: axios.post('/api/projects', projectData);

    // Redirect to the projects page after successful submission
    history.push("/projects");
  };

  return (
    <div>
      <NavBar />
      <div className="container">
        <h1>Add New Project</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={projectData.title}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              value={projectData.description}
              onChange={handleChange}
            ></textarea>
          </div>
          {/* Add more input fields for other project details as needed */}
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProject;
