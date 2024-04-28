import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import supabase from '../../CONFIG/supabaseClient'; // Assuming you've exported supabase instance correctly
import "./Groups.css";

function Groups() {
  const [groups, setGroups] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const groupsPerPage = 50; // Adjust the number of groups per page as needed

  useEffect(() => {
    async function fetchGroups() {
      try {
        const { data, error } = await supabase.from('groups').select('*');
        if (error) {
          console.error('Error fetching groups:', error.message);
        } else {
          setGroups(data);
        }
      } catch (error) {
        console.error('Error fetching groups:', error.message);
      }
    }
    fetchGroups();
  }, []);

  const filteredGroups = groups.filter(group =>
    group.project_domain.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const indexOfLastGroup = currentPage * groupsPerPage;
  const indexOfFirstGroup = indexOfLastGroup - groupsPerPage;
  const currentGroups = filteredGroups.slice(indexOfFirstGroup, indexOfLastGroup);

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
          placeholder="Search Groups"
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input" // Added class for styling
        />
      </div>
      <div className="groups-container">
        {currentGroups.map(group => (
          <Card key={group.groupId} className="group-card">
            <Card.Body>
              <Card.Title>{group.project_domain}</Card.Title>
              <Card.Text>
                <span className="text-muted">Supervisor:</span> {group.supervisor_name}
              </Card.Text>
              <ListGroup className="list-group">
                <ListGroup.Item>Student ID 1: {group.studentId1}</ListGroup.Item>
                <ListGroup.Item>Student ID 2: {group.studentId2}</ListGroup.Item>
                <ListGroup.Item>Student ID 3: {group.studentId3}</ListGroup.Item>
              </ListGroup>
              <Button variant="primary" className="open-button">Open</Button>
            </Card.Body>
          </Card>
        ))}
      </div>
      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: Math.ceil(filteredGroups.length / groupsPerPage) }, (_, i) => (
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

export default Groups;
