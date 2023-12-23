// components/ProjectsPage.js
import React from "react";
import NavBar from "../NavBar/NavBar";
import Projects from "./Projects";
import Projects_SearchBar from "../SearchBar/Projects_SearchBar";

export default function ProjectsPage() {
  return (
    <div>
      <NavBar />
      <div class="jumbotron">
        <h1 class="display-4">CAPSTONE'S Project Library!</h1>
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
      <SearchBar/>
      <Projects_SearchBar />
    </div>
  );
}
