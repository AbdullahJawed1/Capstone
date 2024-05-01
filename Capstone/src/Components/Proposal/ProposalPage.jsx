// components/HomePage.js
import React from "react";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/footer"; // Import Footer component

const Proposal = () => {
  return (
    <>
      <NavBar />
      <div class="jumbotron">
        <div class="box">
        <h1 class="display-4">Welcome to CAPSTONE!</h1>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Proposal;
