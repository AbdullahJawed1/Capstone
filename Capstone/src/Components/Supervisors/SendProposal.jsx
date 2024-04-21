import React, { useState } from "react";
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

      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-body" style={{ backgroundColor: "#f8f9fa" }}>
                <form>

                <h2 className="mb-4 text-center text-primary">SEND PROPOSAL</h2>

                  {/* Input for Project Name */}
                  <h4 className="mb-4">Project Details</h4>
                  <input type="text" className="form-control mb-3" placeholder="Enter project name" />
                  <input type="text" className="form-control mb-3" placeholder="Enter project domain" />

                  {/* Input for Team Leader's Details */}
                  <h4 className="mb-4">Team Leader Details</h4>
                  <input type="text" className="form-control mb-3" placeholder="Enter team leader's name" />
                  <input type="text" className="form-control mb-3" placeholder="Enter team leader's roll number" />
                  <input type="email" className="form-control mb-3" placeholder="Enter team leader's email" />

                 

                  {/* Input for Why You Want Me as Your Supervisor */}
                  <h4 className="mt-4 mb-4">Why You Want Me as Your Supervisor</h4>
                  <textarea
                    rows="4"
                    className="form-control mb-3"
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
                  <button
                    type="submit"
                    className="btn btn-danger"
                    style={{ width: "100%" }}
                  >
                    Send Proposal
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
