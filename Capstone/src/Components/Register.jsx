import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [userType, setUserType] = useState("student");

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    if (!displayName || !email || !password || !file) {
      // Display error message for missing fields
      alert("Please fill in all the required fields.");
      setLoading(false);
      return;
    }

    try {
      // Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      // Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            // Update profile
            await updateProfile(res.user, {
              displayName,
            //   photoURL: downloadURL,
            });

            // Create user on firestore based on userType
            if (userType === "student") {
              await setDoc(doc(db, "students", res.user.uid), {
                uid: res.user.uid,
                displayName,
                email,
                photoURL: downloadURL,
              });
            } else if (userType === "supervisor") {
              await setDoc(doc(db, "supervisors", res.user.uid), {
                uid: res.user.uid,
                displayName,
                email,
                photoURL: downloadURL,
              });
            }

            // Create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          } catch (err) {
            console.log(err);
            setError(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        alert("Email already in use. Please try with a different email.");
      } else {
        setError(true);
      }
      setLoading(false);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Capstone</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <input style={{ display: "none" }} type="file" id="imagefile" />
          <label htmlFor="imagefile">
            <img src="src\assets\addAvatar.png" alt="" />
            <span>Add an image</span>
          </label>

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

          <button disabled={loading}>Sign Up</button>
          {error && <span>Some error occurred!</span>}
        </form>
        <p>
          Already have an account?<Link style={{ textDecoration: "none" }} to="/Login"> Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
