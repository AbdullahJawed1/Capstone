import React, { useContext } from "react";
import NavBar from '../NavBar/NavBar';
import { AuthContext } from "../Context/AuthContext";
import {signOut} from "firebase/auth"
import {auth} from "../../firebase"
import { useNavigate, Link } from "react-router-dom";

export const Profile = () => {
  const {currUser} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  return (
    <div>
        <NavBar />
        <div class="jumbotron">
        <div className="user">
              <h2>{currUser.displayName}</h2>
              <img style={{ borderRadius: '50%', width: '100px', height: '100px' }} src={currUser.photoURL} alt="image" />
        </div>
        <hr class="my-4" />
        <p> 
          Welcome {currUser.displayName} to your profile page!
          Here, you can showcase your projects,
          share your achievements,
          and connect with fellow members of our community. 
          Feel free to update your information, add new projects, 
          and engage with others. Your profile is your space to shine and inspire.
        </p>
        <a class="btn btn-primary btn-lg" href="#" role="button" onClick={handleSubmit}>
          Sign Out
        </a>
      </div>



    </div>
  );
};

export default Profile;
