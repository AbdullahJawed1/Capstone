// components/HomePage.js
import React from "react";
import "./Homepage.css";
import NavBar from "../NavBar/NavBar";
import Projects from "../ProjectsPage/Projects";
import Footer from "../Footer/footer"; // Import Footer component

const HomePage = () => {
  return (
    <>
      <NavBar />
      <div class="jumbotron">
        <div class="box">
        <h1 class="display-4">Welcome to CAPSTONE!</h1>
        </div>
      </div>
      <h4 className="sub-project-heading">TOP PICKS FOR YOU</h4>
      <Projects />
      <Footer />
    </>
  );
};

export default HomePage;
