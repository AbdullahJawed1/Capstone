import React from "react";
import NavBar from "../NavBar/NavBar";
import Groups from "./Groups";
import Footer from "../Footer/footer"; 

const GroupsPage = () => {
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
          Add Group
        </a>
      </div>
      
      <Groups/>
      <Footer />


    </div>
  );
};

export default GroupsPage;
