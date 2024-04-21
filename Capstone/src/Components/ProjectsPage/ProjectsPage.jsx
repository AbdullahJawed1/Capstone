// components/ProjectsPage.js
import React from "react";
import { Link } from "react-router-dom"; // Assuming you're using React Router for navigation
import NavBar from "../NavBar/NavBar";
import Projects from "./Projects";
import Projects_SearchBar from "../SearchBar/Projects_SearchBar";

export default function ProjectsPage() {
  return (
    <div>
      <NavBar />
      <div className="jumbotron">
        <h1 className="display-4">CAPSTONE'S Project Library!</h1>
        <p className="lead">
          This is a simple hero unit, a simple jumbotron-style component for
          calling extra attention to featured content or information.
        </p>
        <hr className="my-4" />
        <p>
          It uses utility classes for typography and spacing to space content
          out within the larger container.
        </p>
        <Link to="/addproject" className="btn btn-primary btn-lg" role="button">
          Add Project
        </Link>
      </div>
      <Projects_SearchBar />
      <Projects/>
    </div>
  );
}