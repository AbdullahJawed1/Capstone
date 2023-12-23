// components/HomePage.js
import React from "react";
import "./Homepage.css";
import NavBar from "../NavBar/NavBar";
import Projects from "../ProjectsPage/Projects";

const HomePage = () => {
  return (
    <>
      <NavBar />

      <div class="jumbotron">
        <h1 class="display-4">Welcome to CAPSTONE!</h1>
        <p class="lead">
          This is a simple hero unit, a simple jumbotron-style component for
          calling extra attention to featured content or information.
        </p>
        <hr class="my-4" />
        <p>
          It uses utility classes for typography and spacing to space content
          out within the larger container.
        </p>
        <a class="btn btn-primary btn-lg" href="#" role="button">
          Learn more
        </a>
      </div>

      <h4 className="sub-project-heading">TOP PICKS FOR YOU</h4>

      <Projects />

      
    </>
  );
};

export default HomePage;
