import React from "react";
import NavBar from "../NavBar/NavBar";

export default function SupervisorProfile() {
  return (
    <>
      <NavBar />
      <div className="container mt-5">
        <div className="card p-4 shadow-sm" style={{ backgroundColor: "#f8f9fa" }}>
          <div className="card-body">
            <h2 className="card-title mb-4 text-primary">Supervisor Profile</h2>
            <div className="row">
              <div className="col-md-4">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-2.webp"
                  alt="Supervisor"
                  className="img-fluid rounded-circle border border-primary"
                  style={{ width: "150px" }}
                />
              </div>
              <div className="col-md-8">
                <h3 className="card-title text-primary">Supervisor's Name</h3>
                <p className="card-text mb-4">
                  <strong>Introduction:</strong> Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit. Phasellus nec iaculis mauris.
                </p>
                <p className="card-text">
                  <strong>Domain:</strong> Supervisor's Domain
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="card mt-4 p-4 shadow-sm" style={{ backgroundColor: "#f8f9fa" }}>
          <div className="card-body">
            <h3 className="card-title mb-4 text-primary">Groups Under Supervisor</h3>
            <ul className="list-group">
              <li className="list-group-item bg-light">Group 1</li>
              <li className="list-group-item bg-light">Group 2</li>
              <li className="list-group-item bg-light">Group 3</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
