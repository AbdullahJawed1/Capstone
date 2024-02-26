// components/NavBar.js
import React from "react";
import "./NavBar.css";
import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate, Link } from "react-router-dom";

export default function NavBar() {
  
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container className="Navbar--">
          <Navbar.Brand
            as={NavLink}
            to="/"
            style={{ color: "#3B71CA", fontWeight: "bold" }}
            activeClassName=""
          >
            CAPSTONE
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={NavLink} to="/" exact activeClassName="active">
                Home
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                to="/ProjectsPage"
                activeClassName="active"
              >
                Projects
              </Nav.Link>
              <Nav.Link as={NavLink} to="/GroupsPage" activeClassName="active">
                Groups
              </Nav.Link>
              <Nav.Link as={NavLink} to="/SupervisorsPage" activeClassName="active">
              Supervisors
              </Nav.Link>
              <NavDropdown title="Settings" id="basic-nav-dropdown">
                <NavDropdown.Item as={NavLink} to="/profile" activeClassName="active">
                  Profile

                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/Chat" activeClassName="active">
                  Chat
                </NavDropdown.Item>
                <NavDropdown.Divider />
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
        <a className="btn btn-primary btn-sml" href="#" role="button" onClick={handleSubmit} style={{ margin: '10px' }}>
          Sign Out
        </a>
      </Navbar>
    </>
  );
}
