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
import NavBar from "./NavBar/NavBar";

export default function Proposals() {
  // State to manage the list of proposals
  const [proposals, setProposals] = useState([]);

  // Function to handle proposal acceptance
  const acceptProposal = (proposalId) => {
    // Update the proposal status to accepted
    const updatedProposals = proposals.map((proposal) => {
      if (proposal.id === proposalId) {
        return { ...proposal, status: "Accepted" };
      }
      return proposal;
    });
    setProposals(updatedProposals);
  };

  // Function to handle proposal rejection
  const rejectProposal = (proposalId) => {
    // Update the proposal status to rejected
    const updatedProposals = proposals.map((proposal) => {
      if (proposal.id === proposalId) {
        return { ...proposal, status: "Rejected" };
      }
      return proposal;
    });
    setProposals(updatedProposals);
  };

  return (
    <>
      <NavBar />
      <MDBContainer className="py-5">
        <MDBRow className="justify-content-center">
          <MDBCol md="8">
            <MDBCard>
              <MDBCardBody style={{ backgroundColor: "#f8f9fa" }}>
                <h2 className="mb-4 text-center text-primary">Proposals</h2>
                {/* Displaying proposals */}
                {proposals.map((proposal) => (
                  <div key={proposal.id}>
                    <h4>Project: {proposal.projectName}</h4>
                    <p>Domain: {proposal.projectDomain}</p>
                    <p>Team Leader: {proposal.teamLeaderName}</p>
                    <p>Status: {proposal.status}</p>
                    {/* Accept and reject buttons */}
                    <div className="d-flex justify-content-between">
                      <MDBBtn
                        onClick={() => acceptProposal(proposal.id)}
                        color="success"
                      >
                        Accept
                      </MDBBtn>
                      <MDBBtn
                        onClick={() => rejectProposal(proposal.id)}
                        color="danger"
                      >
                        Reject
                      </MDBBtn>
                    </div>
                    <hr />
                  </div>
                ))}
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
}
