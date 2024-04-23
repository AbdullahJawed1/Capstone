// components/NavBar.js
import React from "react";
import "./NavBar.css";
import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

export default function NavBar() {
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
              <Nav.Link as={NavLink} to="/" exact activeclassname="active">
                Home
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                to="/ProjectsPage"
                activeclassname="active"
              >
                Projects
              </Nav.Link>
              <Nav.Link as={NavLink} to="/GroupsPage" activeclassname="active">
                Groups
              </Nav.Link>
              <Nav.Link as={NavLink} to="/SupervisorsPage" activeclassname="active">
              Supervisors
              </Nav.Link>
              <NavDropdown title="Settings" id="basic-nav-dropdown">
                <NavDropdown.Item as={NavLink} to="/profile" activeclassname="active">
                  Profile

                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/Chat" activeclassname="active">
                  Chat
                </NavDropdown.Item>
                <NavDropdown.Divider />
              </NavDropdown>
              <Nav.Link as={NavLink} to="/Login" activeclassname="active">
                Login
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
