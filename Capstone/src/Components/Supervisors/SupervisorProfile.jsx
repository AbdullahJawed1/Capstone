import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import supabase from '../../CONFIG/supabaseClient';
import Footer from "../Footer/footer";

export default function SupervisorProfile() {
  const { id } = useParams();
  const [supervisor, setSupervisor] = useState(null);
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    async function fetchSupervisor() {
      try {
        const { data, error } = await supabase
          .from('supervisors')
          .select('name, email, "Area of Interest 1", "Area of Interest 2", "Area of Interest 3", "Area of Interest 4"')
          .eq('id', id)
          .single();
        if (error) {
          throw error;
        }
        setSupervisor(data);
      } catch (error) {
        console.error('Error fetching supervisor:', error.message);
      }
    }

    async function fetchProposals() {
      try {
        const { data: proposalsData, error: proposalsError } = await supabase
          .from('Proposals')
          .select('project_name, team_lead_email, team_lead_name')
          .eq('supervisor_id', id)
          .eq('status', true);
        if (proposalsError) {
          throw proposalsError;
        }
        setProposals(proposalsData);
      } catch (error) {
        console.error('Error fetching proposals:', error.message);
      }
    }

    fetchSupervisor();
    fetchProposals();
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
              <div className="col-md-8">
                <h3 className="card-title text-primary">{supervisor.name}</h3>
                <p className="card-text mb-4">
                  <strong>Email:</strong> {supervisor.email}
                </p>
                <p className="card-text">
                  <strong>Area of Interest 1:</strong> {supervisor['Area of Interest 1']}
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

        <div className="mt-5">
          <h2 className="text-primary mb-3">Projects Under Supervision</h2>
          {proposals.length === 0 ? (
            <p>No projects under supervision</p>
          ) : (
            proposals.map((proposal, index) => (
              <div className="card mb-3" key={index}>
                <div className="card-body">
                  <h5 className="card-title">{proposal.project_name}</h5>
                  <p className="card-text">
                    <strong>Team Leader Name:</strong> {proposal.team_lead_name}
                  </p>
                  <p className="card-text">
                    <strong>Team Leader Email:</strong> {proposal.team_lead_email}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}
