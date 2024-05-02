import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";
import supabase from '../../CONFIG/supabaseClient';
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

export default function NavBar() {
  const [userType, setUserType] = useState("");

  useEffect(() => {
    async function fetchUserType() {
      // Correctly fetching the user data using supabase.auth.getUser()
      const { data: { user } } = await supabase.auth.getUser();

      // Accessing the user metadata correctly based on your last message
      if (user && user.user_metadata && user.user_metadata.type) {
        const metadata = user.user_metadata; // Storing user metadata
        setUserType(metadata.type);  // Using the 'type' field from user_metadata
      }
    }

    fetchUserType();
  }, []);

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container className="Navbar--">
          <Navbar.Brand
            as={NavLink}
            to="/"
            style={{ color: "#3B71CA", fontWeight: "bold" }}
            activeclassname=""
          >
            CAPSTONE
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={NavLink} to="/" exact activeclassname="active">Home</Nav.Link>
              <Nav.Link as={NavLink} to="/ProjectsPage" activeclassname="active">Projects</Nav.Link>
              <Nav.Link as={NavLink} to="/GroupsPage" activeclassname="active">Groups</Nav.Link>
              {userType === "supervisor" ? (
                <Nav.Link as={NavLink} to="/Proposals" activeclassname="active">Proposal</Nav.Link>
              ) : userType === "student" ? (
                <Nav.Link as={NavLink} to="/SupervisorsPage" activeclassname="active">Supervisors</Nav.Link>
              ) : null}
              <NavDropdown title="Settings" id="basic-nav-dropdown">
                <NavDropdown.Item as={NavLink} to="/profile" activeclassname="active">Profile</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/Chat" activeclassname="active">Chat</NavDropdown.Item>
                <NavDropdown.Divider />
              </NavDropdown>
              <Nav.Link as={NavLink} to="/Login" activeclassname="active">Login</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}