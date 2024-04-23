import React, { useState } from "react";
import NavBar from "../NavBar/NavBar";
import supabase from '../../CONFIG/supabaseClient'; // Assuming you've exported supabase instance correctly

const SimilarityChecker = () => {
  const [summary, setSummary] = useState("");
  const [similarProjects, setSimilarProjects] = useState([]);

  const handleChange = (e) => {
    setSummary(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Call an API endpoint to compare the summary with existing projects
      const { data, error } = await supabase.from('projects').select('*').ilike('summary', `%${summary}%`);
      if (error) {
        throw error;
      }
      setSimilarProjects(data);
    } catch (error) {
      console.error('Error fetching similar projects:', error.message);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="container">
        <h1>Similarity Checker</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="summary">Enter Your Project Summary:</label>
            <textarea
              className="form-control"
              id="summary"
              name="summary"
              value={summary}
              onChange={handleChange}
              rows="6"
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">
            Check Similarity
          </button>
        </form>
        
        {similarProjects.length > 0 && (
          <div className="similar-projects">
            <h2>Similar Projects Found:</h2>
            <ul>
              {similarProjects.map(project => (
                <li key={project.id}>
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SimilarityChecker;
