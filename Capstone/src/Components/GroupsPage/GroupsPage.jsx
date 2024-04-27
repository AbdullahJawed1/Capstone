import React from "react";
import NavBar from "../NavBar/NavBar";
import Groups from "./Groups";
import Footer from "../Footer/footer"; 

const GroupsPage = () => {
  return (
    <div>
      <NavBar />
      <div class="jumbotron">
      <div class="box">
        <h1 class="display-4">Group's Library!</h1>
        <a class="btn btn-primary btn-lg" href="#" role="button">
          Add Group
        </a>
      </div>
      </div>
      <Groups/>
      <Footer/>
    </div>
  );
};

export default GroupsPage;
