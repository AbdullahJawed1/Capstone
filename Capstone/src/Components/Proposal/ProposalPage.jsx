// components/HomePage.js
import React from "react";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/footer"; // Import Footer component
import Proposalcard from "./ProposalCard"
const Proposal = () => {
  return (
    <>
      <NavBar />
      <div class="jumbotron">
        <div class="box">
        <h1 class="display-4">Proposals Gallery!</h1>
        </div>
      </div>
      <Proposalcard/>


      <Footer />
    </>
  );
};

export default Proposal;
