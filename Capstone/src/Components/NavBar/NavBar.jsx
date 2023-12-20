// components/NavBar.js
import React from "react";
import "./NavBar.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Projects from "../ProjectsPage/Projects.jsx";

export default function NavBar() {
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container classsName="Navbar--">
          <Navbar.Brand
            href="/"
            style={{ color: "#3B71CA", fontWeight: "bold" }}
          >
            CAPSTONE
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/ProjectsPage">Projects</Nav.Link>
              <Nav.Link href="/GroupsPage">Groups</Nav.Link>
              <NavDropdown title="Settings" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Chat</NavDropdown.Item>
                <NavDropdown.Divider />
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
