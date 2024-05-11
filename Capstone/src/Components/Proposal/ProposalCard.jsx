import React, { useState, useEffect } from 'react';
import supabase from '../../CONFIG/supabaseClient'; // Import the Supabase client instance
import Modal from 'react-bootstrap/Modal'; // Import modal component from Bootstrap
import Button from 'react-bootstrap/Button'; // Import button component from Bootstrap

const ProposalCard = () => {
  const [proposal, setProposal] = useState(null);
  const [error, setError] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  useEffect(() => {
    async function fetchEmail() {
      try {
        // Correctly fetching the user data using supabase.auth.getUser()
        const { data: { user } } = await supabase.auth.getUser();

        // Store user email in state
        const userEmail = user?.email || ''; // Get user email from user object
        setUserEmail(userEmail);
      } catch (error) {
        console.error('Error fetching user type:', error.message);
      }
    }

    fetchEmail();
  }, []);

  useEffect(() => {
    const fetchProposal = async () => {
      if (!userEmail) {
        setError('User email is undefined.');
        return;
      }
    
      try {
        const { data, error } = await supabase
          .from('Proposals')
          .select('*') // Select all columns
          .eq('supervisor_email', userEmail)
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
  }, [userEmail]);
  
  const handleAccept = async (proposalId) => {
    try {
      await supabase
        .from('Proposals')
        .update({ status: true }) // Set status to true for acceptance
        .eq('Proposal_Id', proposalId);
      // Refresh proposal data after update
      fetchProposal();
    } catch (error) {
      console.error('Error accepting proposal:', error.message);
    }
  };

  const handleReject = async (proposalId) => {
    try {
      await supabase
        .from('Proposals')
        .update({ status: false }) // Set status to false for rejection
        .eq('Proposal_Id', proposalId);
      // Refresh proposal data after update
      fetchProposal();
    } catch (error) {
      console.error('Error rejecting proposal:', error.message);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  if (!proposal) {
    return <div>No Proposals</div>;
  }

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Project Name: {proposal.project_name}</h5>
        <p className="card-text">Project Domain: {proposal.project_domain}</p>
        <p className="card-text">Team Leader Name: {proposal.team_lead_name}</p>
        <Button variant="primary" onClick={handleShowModal}>
          View Proposal
        </Button>

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Proposal Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Project Name: {proposal.project_name}</p>
            <p>Project Domain: {proposal.project_domain}</p>
            <p>Team Leader Name: {proposal.team_lead_name}</p>
            <p>Team Leader Email: {proposal.team_lead_email}</p>
            <p>Reason: {proposal.reason}</p>
            <p>Proposal: {proposal.proposal}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="success" onClick={() => handleAccept(proposal.Proposal_Id)}>
              Accept
            </Button>
            <Button variant="danger" onClick={() => handleReject(proposal.Proposal_Id)}>
              Reject
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default ProposalCard;
