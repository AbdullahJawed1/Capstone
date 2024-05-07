import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import Groups from "./Groups";
import Footer from "../Footer/footer"; 

export default function GroupsPage() {
  return (
    <div>
      <NavBar />
      <div class="jumbotron">
      <div class="box">
        <h1 class="display-4">Group's Library!</h1>
        <Link to="/AddGroups" className="btn btn-primary btn-lg" role="button">
        Add Group
        </Link>
        <h6 class="display-6">1 person can only create 1 group</h6>
      </div>
      </div>
      <Groups/>
      <Footer/>
    </div>
  );
}

