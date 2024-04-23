import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import supabase from '../../CONFIG/supabaseClient'; // Assuming you've exported supabase instance correctly
import Footer from "../Footer/footer";

export default function SupervisorProfile() {
  const { id } = useParams();
  const [supervisor, setSupervisor] = useState(null);

  useEffect(() => {
    async function fetchSupervisor() {
      try {
        const { data, error } = await supabase
          .from('supervisors')
          .select('Name, Email, Domain, "Area of Interest 2", "Area of Interest 3", "Area of Interest 4"')
          .eq('supervisorId', id)
          .single();
        if (error) {
          throw error;
        }
        setSupervisor(data);
      } catch (error) {
        console.error('Error fetching supervisor:', error.message);
      }
    }
    fetchSupervisor();
  }, [id]);

  if (!supervisor) {
    return <div>Loading...</div>;
  }

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
                <h3 className="card-title text-primary">{supervisor.Name}</h3>
                <p className="card-text mb-4">
                  <strong>Email:</strong> {supervisor.Email}
                </p>
                <p className="card-text">
                  <strong>Domain:</strong> {supervisor.Domain}
                </p>
                <p className="card-text">
                  <strong>Area of Interest 2:</strong> {supervisor['Area of Interest 2']}
                </p>
                <p className="card-text">
                  <strong>Area of Interest 3:</strong> {supervisor['Area of Interest 3']}
                </p>
                <p className="card-text">
                  <strong>Area of Interest 4:</strong> {supervisor['Area of Interest 4']}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

    </>
  );
}
