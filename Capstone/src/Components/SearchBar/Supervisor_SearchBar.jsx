import React from "react";
import { MDBCol, MDBIcon } from "mdbreact";
import "./SearchBar.css";

export const Supervisor_SearchBar = () => {
  return (
    <div>
      <div className="search-bar-container">
        <MDBCol md="12">
          <div className="input-group md-form form-sm form-1 pl-0">
            <div className="input-group-prepend">
              <span
                className="input-group-text purple lighten-3"
                id="basic-text1"
              >
                <MDBIcon className="text-white" icon="search" />
              </span>
            </div>
            <input
              className="form-control my-0 py-1"
              type="text"
              placeholder="Search Supervisors"
              aria-label="Search"
            />
          </div>
        </MDBCol>
      </div>
    </div>
  );
};

export default Supervisor_SearchBar;
