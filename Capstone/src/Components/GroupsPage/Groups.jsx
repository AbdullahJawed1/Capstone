import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import supabase from '../../CONFIG/supabaseClient'; // Assuming you've exported supabase instance correctly
import SearchBar from '../SearchBar/searchbar'; // Import the SearchBar component
import "./Groups.css";

function Groups() {
  const [groups, setGroups] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [currentTab, setCurrentTab] = useState('approved'); // Default tab
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
    group.project_domain.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (currentTab === 'approved' ? group.confirmed : !group.confirmed) // Filter by tab
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

  const handleTabChange = (tab) => {
    setCurrentTab(tab);
    setCurrentPage(1); // Reset to first page when tab changes
  };

  return (
    <>
      <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} /> {/* Use the SearchBar component */}
      <Tabs
        id="group-tabs"
        activeKey={currentTab}
        onSelect={(tab) => handleTabChange(tab)}
        className="mb-3 justify-content-center" // Center the tabs
      >
        <Tab eventKey="approved" title="Approved Groups" className="tab-style">
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
        </Tab>
        <Tab eventKey="pending" title="Pending Groups" className="tab-style">
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
        </Tab>
      </Tabs>
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
