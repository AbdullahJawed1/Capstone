import React, { useState, useEffect } from "react";
import supabase from '../../CONFIG/supabaseClient';

const Proposalcard = ({ userId=76 }) => {
  const [proposal, setProposal] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    console.log('userId:', userId);
    const fetchProposal = async () => {
      if (!userId) {
        setError('User ID is undefined.');
        return;
      }
  
      try {
        const { data, error } = await supabase
          .from('Proposals')
          .select('id, project_name, project_domain, team_lead_name')
          .eq('id', userId)
          .single();
  
        if (error) {
          throw error;
        }
  
        setProposal(data || null);
      } catch (error) {
        setError('Error fetching proposal.');
        console.error('Error fetching proposal:', error.message);
      }
    };
  
    fetchProposal();
  }, [userId]);
  
  const handleAccept = (proposalId) => {
    console.log('Proposal accepted:', proposalId);
  };

  const handleReject = (proposalId) => {
    console.log('Proposal rejected:', proposalId);
  };

  if (!proposal) {
    return <div>Loading...</div>;
  }

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{proposal.project_name}</h5>
        <p className="card-text">Domain: {proposal.project_domain}</p>
        <p className="card-text">Team Leader: {proposal.team_lead_name}</p>
        <button onClick={() => handleAccept(proposal.id)} className="btn btn-success">Accept</button>
        <button onClick={() => handleReject(proposal.id)} className="btn btn-danger">Reject</button>
      </div>
    </div>
  );
};

export default Proposalcard;
