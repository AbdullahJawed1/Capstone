import React from 'react'
import NavBar from '../NavBar/NavBar'
import SupervisorsCard from './SupervisorCard'
import Footer from "../Footer/footer";

const SupervisorsPage = () => {
  return (
    <div>
      <NavBar />
      <div class="jumbotron">
      <div class="box">
        <h1 class="display-4">Supervisor Gallery!</h1>
      </div>  
      </div>
      <SupervisorsCard/>
      <Footer/>      
    </div>
  );
};

export default SupervisorsPage;
