import React, { useState } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBBtn,
  MDBIcon,
  MDBInput,
} from "mdb-react-ui-kit";
import NavBar from "../NavBar/NavBar";

export default function SendProposal() {
  const [members, setMembers] = useState([{ id: 1 }]);

  // Function to add a new member input set
  const addMember = () => {
    const newMember = {
      id: members.length + 1,
    };
    setMembers([...members, newMember]);
  };

  return (
    <>
      <NavBar />

      <MDBContainer className="py-5" >
        <MDBRow className="justify-content-center" >
          <MDBCol md="8">
            <MDBCard>
              <MDBCardBody style={{ backgroundColor: "#f8f9fa" }}>
                <form>

                <h2 className="mb-4 text-center text-primary">SEND PROPOSAL</h2>

                  {/* Input for Project Name */}
                  <h4 className="mb-4">Project Details</h4>
                  <MDBInput type="text" className="mb-3" placeholder="Enter project name" />
                  <MDBInput type="text" className="mb-3" placeholder="Enter project domain" />

                  {/* Input for Team Leader's Details */}
                  <h4 className="mb-4">Team Leader Details</h4>
                  <MDBInput type="text" className="mb-3" placeholder="Enter team leader's name" />
                  <MDBInput type="text" className="mb-3" placeholder="Enter team leader's roll number" />
                  <MDBInput type="email" className="mb-3" placeholder="Enter team leader's email" />

                  {/* Input for Group Members */}
                  <h4 className="mb-4">Group Member 1</h4>
                  {members.map((member) => (
                    <div key={member.id}>
                      <MDBInput type="text" className="mb-3" placeholder="Enter member's name" />
                      <MDBInput type="text" className="mb-3" placeholder="Enter member's roll number" />
                      <MDBInput type="email" className="mb-3" placeholder="Enter member's email" />
                    </div>
                  ))}

                    <h4 className="mb-4">Group Member 2</h4>
                  {members.map((member) => (
                    <div key={member.id}>
                      <MDBInput type="text" className="mb-3" placeholder="Enter member's name" />
                      <MDBInput type="text" className="mb-3" placeholder="Enter member's roll number" />
                      <MDBInput type="email" className="mb-3" placeholder="Enter member's email" />
                    </div>
                  ))}
                  

                  {/* Input for Why You Want Me as Your Supervisor */}
                  <h4 className="mt-4 mb-4">Why You Want Me as Your Supervisor</h4>
                  <MDBInput
                    type="textarea"
                    rows="4"
                    className="mb-3"
                    placeholder="Enter your reason for choosing this supervisor"
                  />

                  {/* Input for Proposal Attachment */}
                  <div className="mb-3">
                    <label htmlFor="formFile" className="form-label">
                      Attach Proposal Document
                    </label>
                    <input className="form-control" type="file" id="formFile" />
                  </div>

                  {/* Submit Button */}
                  {/* <Link to="/SupervisorsPage/SendProposal"> */}
                  <button
                      className="btn btn-outline-dark rounded block"
                      style={{ backgroundColor: "#DC4C64", width: "100%" }}
                    >
                      <i className="far fa-clock me-2"></i> Send proposal
                    </button>
                  {/* </Link> */}
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
}
