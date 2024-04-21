import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import supabase from '../../CONFIG/supabaseClient'; // Assuming you've exported supabase instance correctly

export default function SupervisorsCard() {
  const [supervisors, setSupervisors] = useState([]);

  useEffect(() => {
    async function fetchSupervisors() {
      try {
        const { data, error } = await supabase.from('supervisors').select('*');
        if (error) {
          throw error;
        }
        setSupervisors(data);
      } catch (error) {
        console.error('Error fetching supervisors:', error.message);
      }
    }
    fetchSupervisors();
  }, []);

  return (
    <div className="vh-100" style={{ backgroundColor: "#eee" }}>
      <div className="container supervisorCards">
        <div className="row justify-content-center">
          {supervisors.map((supervisor, index) => (
            <div className="col-md-4 mt-5" key={index}>
              <div
                className="card"
                style={{ borderRadius: "15px", backgroundColor: "#fff" }}
              >
                <div className="card-body p-4 text-black">
                  <div>
                    <h6>
                      {supervisor.Name}
                    </h6>
                  </div>
                  <div className="d-flex align-items-center mb-4">
                    <div className="flex-shrink-0">
                      <img
                        src="./src/assets/Capstone.png"
                        alt="Profile"
                        style={{ width: "70px" }}
                        className="img-fluid rounded-circle border border-dark border-3"
                      />
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <div className="d-flex flex-row align-items-center mb-2">
                        <p className="mb-0 me-2">{supervisor.Domain}</p>
                        {/* You can add stars or any other information here */}
                      </div>
                      <div>
                        {/* Link to SupervisorProfile */}
                        <Link to={`/SupervisorsPage/SupervisorProfile/${supervisor.id}`}>
                          <button className="btn btn-outline-dark rounded mx-1">See profile</button>
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
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
