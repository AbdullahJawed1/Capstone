import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import supabase from '../../CONFIG/supabaseClient';
import "./supervisorCard.css"; // Import CSS file

export default function SupervisorsCard() {
  const [supervisors, setSupervisors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const supervisorsPerPage = 50; // Adjust as needed

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

  const filteredSupervisors = supervisors.filter(supervisor =>
    supervisor.Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const indexOfLastSupervisor = currentPage * supervisorsPerPage;
  const indexOfFirstSupervisor = indexOfLastSupervisor - supervisorsPerPage;
  const currentSupervisors = filteredSupervisors.slice(indexOfFirstSupervisor, indexOfLastSupervisor);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to first page when search term changes
  };

  return (
    <>
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search Supervisors"
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
      <div className="card_container">
        {currentSupervisors.map(supervisor => (
          <Card key={supervisor.supervisorId} border="info" style={{ width: "18rem", height: "20rem", marginBottom: "20px" }}>
            <Card.Body>
              <Card.Title>{supervisor.Name}</Card.Title>
              <Card.Text>
                {supervisor.Domain}
              </Card.Text>
              <Link to={`/SupervisorsPage/SupervisorProfile/${supervisor.supervisorId}`}>
                <Button variant="outline-dark" className="btn-profile">See Profile</Button>
              </Link>
              <Link to="/SupervisorsPage/SendProposal">
                <Button variant="outline-dark" className="btn-send-proposal">
                  <i className="far fa-clock me-2"></i> Send Proposal
                </Button>
              </Link>
            </Card.Body>
          </Card>
        ))}
      </div>
      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: Math.ceil(filteredSupervisors.length / supervisorsPerPage) }, (_, i) => (
          <Button
            key={i}
            variant="outline-primary"
            className={currentPage === i + 1 ? "active" : ""}
            onClick={() => paginate(i + 1)}
          >
            {i + 1}
          </Button>
        ))}
      </div>
    </>
  );
}
