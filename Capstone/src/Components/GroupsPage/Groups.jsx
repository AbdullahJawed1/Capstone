import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal"; // Import Modal from react-bootstrap
import supabase from '../../CONFIG/supabaseClient'; // Assuming your Supabase instance is correctly set up
import SearchBar from '../SearchBar/searchbar'; // Import your custom SearchBar component
import "./Groups.css";

export default function Groups() {
  const [groups, setGroups] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const groupsPerPage = 50;
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function fetchGroups() {
      try {
        const { data, error } = await supabase.from('groups').select('*');
        if (error) throw error;
        setGroups(data);
      } catch (error) {
        console.error('Error fetching groups:', error.message);
      }
    }
    fetchGroups();
  }, []);

  const filteredGroups = groups.filter(group =>
    group.project_domain.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastGroup = currentPage * groupsPerPage;
  const indexOfFirstGroup = indexOfLastGroup - groupsPerPage;
  const currentGroups = filteredGroups.slice(indexOfFirstGroup, indexOfLastGroup);
  
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleOpenDetails = (group) => {
    setSelectedGroup(group);
    setShowModal(true);
    if (group) {
      // Format the created_at timestamp
      const createdAt = new Date(group.created_at).toLocaleString();
      setSelectedGroup({ ...group, createdAt });
    }
  };

  const handleCloseDetails = () => {
    setShowModal(false);
  };

  return (
    <>
      <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
      <div className="groups-container">
        {currentGroups.map(group => (
          <Card key={group.groupId} className="group-card">
            <Card.Body>
              <Card.Title>{group.project_name}</Card.Title>
              <Card.Text>Project Domain: {group.project_domain}</Card.Text>
              <Card.Text>Student 1 Email: {group.studentId1}</Card.Text>
              <Card.Text>Student 2 Email: {group.studentId2}</Card.Text>
              <Card.Text>Student 3 Email: {group.studentId3}</Card.Text>
              <Button variant="primary" onClick={() => handleOpenDetails(group)}>Open</Button>
            </Card.Body>
          </Card>
        ))}
      </div>
      
      <Modal show={showModal} onHide={handleCloseDetails}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedGroup ? selectedGroup.project_name : 'Group Details'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedGroup && (
            <div>
              <p><strong>Project Name:</strong> {selectedGroup.project_name}</p>
              <p><strong>Project Domain:</strong> {selectedGroup.project_domain}</p>
              <p><strong>Student 1 Email:</strong> {selectedGroup.studentId1}</p>
              <p><strong>Student 2 Email:</strong> {selectedGroup.studentId2}</p>
              <p><strong>Student 3 Email:</strong> {selectedGroup.studentId3}</p>
              <p><strong>Project Description</strong> {selectedGroup.project_description}</p>
              <p><strong>Date and Time Completed:</strong> {selectedGroup.createdAt}</p>
              {/* Include more details as necessary */}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDetails}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}