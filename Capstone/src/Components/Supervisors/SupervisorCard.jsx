import React from "react";
import { Link } from "react-router-dom";
import SupervisorProfile from './SupervisorProfile';

import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBTypography,
  MDBIcon,
} from "mdb-react-ui-kit";

export default function SupervisorsCard() {
  // Define availability status for supervisors
  const supervisorsAvailability = [
    { name: "Supervisor name", status: ["available", "booked", "available"] },
    { name: "Supervisor name", status: ["booked", "available", "available"] },
    { name: "Supervisor name", status: ["available", "available", "available"] },
    { name: "Supervisor name", status: ["booked", "booked", "booked"] },
    { name: "Supervisor name", status: ["available", "booked", "available"] },
    { name: "Supervisor name ", status: ["available", "booked", "available"] },

  ];

  return (
    <div className="vh-100" style={{ backgroundColor: "#eee" }}>
      <MDBContainer className="supervisorCards">
        <MDBRow className="justify-content-center">
          {supervisorsAvailability.map((supervisor, index) => (
            <MDBCol md="4" className="mt-5" key={index}>
              <MDBCard
                style={{ borderRadius: "15px", backgroundColor: "#fff" }}
              >
                <MDBCardBody className="p-4 text-black">
                  <div>
                    <MDBTypography tag="h6">
                      {supervisor.name}
                      {/* Display multiple color dots based on status */}
                      {supervisor.status.map((status, idx) => (
                        <span
                          key={idx}
                          className="ms-2 me-1"
                          style={{
                            width: "10px",
                            height: "10px",
                            borderRadius: "50%",
                            display: "inline-block",
                            backgroundColor:
                              status === "available"
                                ? "#1B7B2C" // green for available
                                : "#DC4C64", // red for booked
                          }}
                        ></span>
                      ))}
                    </MDBTypography>
                  </div>
                  <div className="d-flex align-items-center mb-4">
                    <div className="flex-shrink-0">
                      <MDBCardImage
                        style={{ width: "70px" }}
                        className="img-fluid rounded-circle border border-dark border-3"
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-2.webp"
                        alt="Generic placeholder image"
                        fluid
                      />
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <div className="d-flex flex-row align-items-center mb-2">
                        <p className="mb-0 me-2">Supervisor's Name</p>
                        <ul
                          className="mb-0 list-unstyled d-flex flex-row"
                          style={{ color: "#1B7B2C" }}
                        >
                          <li>
                            <MDBIcon fas icon="star fa-xs" />
                          </li>
                          <li>
                            <MDBIcon fas icon="star fa-xs" />
                          </li>
                          <li>
                            <MDBIcon fas icon="star fa-xs" />
                          </li>
                          <li>
                            <MDBIcon fas icon="star fa-xs" />
                          </li>
                          <li>
                            <MDBIcon fas icon="star fa-xs" />
                          </li>
                        </ul>
                      </div>
                      <div>
                        {/* Link to SupervisorProfile */}
                        <Link to="/SupervisorsPage/SupervisorProfile">
                        <button className="btn btn-outline-dark rounded mx-1">
                            See profile
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <Link to="/SupervisorsPage/SendProposal">
                  <button
                      className="btn btn-outline-dark rounded block"
                      style={{ backgroundColor: "#DC4C64", width: "100%" }}
                    >
                      <i className="far fa-clock me-2"></i> Send proposal
                    </button>
                  </Link>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          ))}
        </MDBRow>
      </MDBContainer>
    </div>
  );
}