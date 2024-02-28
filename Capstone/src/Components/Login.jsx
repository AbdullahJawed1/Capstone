import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState("student"); // Default to student
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      if (userType === "supervisor") {
        navigate("/Sup_HomePage");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(true);
      setLoading(false);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Capstone</span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />

          {/* Option to choose user type */}
          <div>
            <input
              type="radio"
              id="student"
              value="student"
              checked={userType === "student"}
              onChange={() => setUserType("student")}
            />
            <label htmlFor="student">Student</label>

            <input
              type="radio"
              id="supervisor"
              value="supervisor"
              checked={userType === "supervisor"}
              onChange={() => setUserType("supervisor")}
            />
            <label htmlFor="supervisor">Supervisor</label>
          </div>

          <button disabled={loading}>Sign In</button>
          {error && <span>Invalid email or password.</span>}
        </form>
        <p>
          Don't have an account?<Link style={{ textDecoration: "none" }} to="/register"> Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
