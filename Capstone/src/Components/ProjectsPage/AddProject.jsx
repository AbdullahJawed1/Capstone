import React, { useState } from "react";
import NavBar from "../NavBar/NavBar";
import supabase from '../../CONFIG/supabaseClient'; // Assuming you've exported supabase instance correctly
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const AddProject = () => {
  const [projectData, setProjectData] = useState({
    title: "",
    summary: "",
    domain: "",
    tag: "",
    fyp_id: "",
    supervisor_name: "",
    authors: ""
  });

  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData({
      ...projectData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const { data, error } = await supabase.from('projects').insert([
        {
          title: projectData.title,
          summary: projectData.summary,
          domain: projectData.domain,
          tag: projectData.tag,
          fyp_id: projectData.fyp_id,
          supervisor_name: projectData.supervisor_name,
          authors: projectData.authors
        },
      ]);
      
      if (error) {
        throw error;
      }
      
      // Redirect to the projects page after successful submission
      navigate("/projects"); // Use navigate to redirect
    } catch (error) {
      console.error('Error adding project:', error.message);
    }
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
            <label htmlFor="summary">Summary:</label>
            <textarea
              className="form-control"
              id="summary"
              name="summary"
              value={projectData.summary}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="domain">Domain:</label>
            <input
              type="text"
              className="form-control"
              id="domain"
              name="domain"
              value={projectData.domain}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="tag">Tag:</label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              value={projectData.tag}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="fyp_id">FYP ID:</label>
            <input
              type="text"
              className="form-control"
              id="fyp_id"
              name="fyp_id"
              value={projectData.fyp_id}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="supervisor_name">Supervisor Name:</label>
            <input
              type="text"
              className="form-control"
              id="supervisor_name"
              name="supervisor_name"
              value={projectData.supervisor_name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="authors">Authors:</label>
            <input
              type="text"
              className="form-control"
              id="authors"
              name="authors"
              value={projectData.authors}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProject;
