// components/ProjectsPage.js
import React from "react";
import { Link } from "react-router-dom"; // Assuming you're using React Router for navigation
import NavBar from "../NavBar/NavBar";
import ProjectsWithSearchBar from "./ProjectsWithSearchBar";
import Footer from "../Footer/footer";


export default function ProjectsPage() {
  return (
    <div>
      <NavBar />
      <div className="jumbotron">
       <div class="box">
        <h1 className="display-4">Project Library!</h1>
        <Link to="/SimilarityChecker" className="btn btn-primary btn-lg" role="button">
        Similarity Checker
        </Link>
      </div>  
      </div>
      <ProjectsWithSearchBar/>
      <Footer />

    </div>
  );
}
