import React, { useState } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";
import firebase from "firebase/app";
import "firebase/firestore";
import NavBar from "../NavBar/NavBar";

// Initialize Firebase with your project configuration
const firebaseConfig = {
  // Your Firebase config details here
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export default function SendProposal() {
  const [projectName, setProjectName] = useState("");
  const [projectDomain, setProjectDomain] = useState("");
  const [teamLeaderName, setTeamLeaderName] = useState("");
  const [teamLeaderRollNumber, setTeamLeaderRollNumber] = useState("");
  const [teamLeaderEmail, setTeamLeaderEmail] = useState("");
  const [members, setMembers] = useState([{ id: 1 }]);

  // Function to add a new member input set
  const addMember = () => {
    const newMember = {
      id: members.length + 1,
    };
    setMembers([...members, newMember]);
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Save proposal data to Firebase Firestore
      await db.collection("proposals").add({
        projectName,
        projectDomain,
        teamLeaderName,
        teamLeaderRollNumber,
        teamLeaderEmail,
        members,
      });
      // Clear form fields after submission
      setProjectName("");
      setProjectDomain("");
      setTeamLeaderName("");
      setTeamLeaderRollNumber("");
      setTeamLeaderEmail("");
      setMembers([{ id: 1 }]);
      alert("Proposal sent successfully!");
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Failed to send proposal. Please try again later.");
    }
  };

  return (
    <>
      <NavBar />
      <MDBContainer className="py-5">
        <MDBRow className="justify-content-center">
          <MDBCol md="8">
            <MDBCard>
              <MDBCardBody style={{ backgroundColor: "#f8f9fa" }}>
                <form onSubmit={handleSubmit}>
                  <h2 className="mb-4 text-center text-primary">SEND PROPOSAL</h2>
                  {/* Input for Project Name */}
                  <h4 className="mb-4">Project Details</h4>
                  <MDBInput
                    type="text"
                    className="mb-3"
                    placeholder="Enter project name"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                  />
                  <MDBInput
                    type="text"
                    className="mb-3"
                    placeholder="Enter project domain"
                    value={projectDomain}
                    onChange={(e) => setProjectDomain(e.target.value)}
                  />
                  {/* Input for Team Leader's Details */}
                  <h4 className="mb-4">Team Leader Details</h4>
                  <MDBInput
                    type="text"
                    className="mb-3"
                    placeholder="Enter team leader's name"
                    value={teamLeaderName}
                    onChange={(e) => setTeamLeaderName(e.target.value)}
                  />
                  <MDBInput
                    type="text"
                    className="mb-3"
                    placeholder="Enter team leader's roll number"
                    value={teamLeaderRollNumber}
                    onChange={(e) => setTeamLeaderRollNumber(e.target.value)}
                  />
                  <MDBInput
                    type="email"
                    className="mb-3"
                    placeholder="Enter team leader's email"
                    value={teamLeaderEmail}
                    onChange={(e) => setTeamLeaderEmail(e.target.value)}
                  />
                  {/* Input for Group Members */}
                  {members.map((member, index) => (
                    <div key={index}>
                      <h4 className="mb-4">Group Member {index + 1}</h4>
                      <MDBInput type="text" className="mb-3" placeholder="Enter member's name" />
                      <MDBInput type="text" className="mb-3" placeholder="Enter member's roll number" />
                      <MDBInput type="email" className="mb-3" placeholder="Enter member's email" />
                    </div>
                  ))}
                  <MDBBtn
                    type="button"
                    onClick={addMember}
                  >
                    Add Member
                  </MDBBtn>
                  {/* Submit Button */}
                  <MDBBtn
                    type="submit"
                    className="btn btn-outline-dark rounded block"
                    style={{ backgroundColor: "#DC4C64", width: "100%" }}
                  >
                    <i className="far fa-clock me-2"></i> Send proposal
                  </MDBBtn>
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
}
