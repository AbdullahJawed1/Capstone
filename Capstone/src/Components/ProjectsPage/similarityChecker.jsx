import React, { useState } from "react";
import NavBar from "../NavBar/NavBar";
import axios from "axios"; // Import axios for making HTTP requests

const SimilarityChecker = () => {
  const [summary, setSummary] = useState("");
  const [similarityData, setSimilarityData] = useState(null);
  const [message, setMessage] = useState("");
  
  const handleChange = (e) => {
    setSummary(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Call the Flask route to check similarity
      const response = await axios.post("http://localhost:5000/check-similarity", {
        user_summary: summary
      });
      
      // Extract similarity data from response
      const { most_similar_project, similarity_percentage } = response.data;
      setSimilarityData({ most_similar_project, similarity_percentage });

      // Check if similarity percentage is more than 25%
      if (similarity_percentage > 0.20) {
        setMessage("Your project summary is quite similar to an existing project. Consider changing your project.");
      } else {
        setMessage("Your project summary is unique.");
      }
    } catch (error) {
      console.error('Error checking similarity:', error.message);
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
        
        {similarityData && (
          <div className="similar-projects">
            <h2>Most similar project:</h2>
            <h3>Title: {similarityData.most_similar_project.title}</h3>
            <p>Summary: {similarityData.most_similar_project.summary}</p>
            <h3>Similarity percentage: {(similarityData.similarity_percentage * 100).toFixed(2)}%</h3>
            <p>{message}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SimilarityChecker;
