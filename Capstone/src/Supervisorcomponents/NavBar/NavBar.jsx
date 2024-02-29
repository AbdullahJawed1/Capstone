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
            activeClassName=""
          >
            CAPSTONE
          </Navbar.Brand>
          {/* Add the text "SUPERVISOR's PANEL" in black color */}
          <span style={{ color: "black", fontWeight: "bold" }}>             SUPERVISOR's PANEL</span>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={NavLink} to="/Sup_HomePage" exact activeClassName="active">
                Home
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                to="/Sup_ProjectsPage"
                activeClassName="active"
              >
                Projects
              </Nav.Link>

              <Nav.Link
                as={NavLink}
                to="/proposals"
                activeClassName="active"
              >
                proposals
              </Nav.Link>





              
              <NavDropdown title="Settings" id="basic-nav-dropdown">
                {/* <NavDropdown.Item as={NavLink} to="/Sup_profile" activeClassName="active">
                  Profile

                </NavDropdown.Item> */}
                <NavDropdown.Item as={NavLink} to="/Sup_Chat" activeClassName="active">
                  Chat
                </NavDropdown.Item>
                <NavDropdown.Divider />
              </NavDropdown>
              <Nav.Link as={NavLink} to="/Login" activeClassName="active">
                Login
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
