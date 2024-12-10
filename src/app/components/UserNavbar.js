"use client";

import { useParams } from "next/navigation"
import Link from "next/link"
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { FaGithub } from "react-icons/fa";
import {  PiUserDuotone, PiNotePencilDuotone, PiQuestionMarkFill, PiSunBold } from "react-icons/pi";

const UserNavbar = () => {
  const { _id } = useParams();

  return (


    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/"><PiSunBold className="me-2" />Solarize</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href={`/user/${_id}/profile`}><PiUserDuotone className="me-2" />Profile</NavDropdown.Item>
              <NavDropdown.Item href={`/user/${_id}/submit-request`}>
                <PiNotePencilDuotone className="me-2" />Submit Request
              </NavDropdown.Item>
              <NavDropdown.Item href="/about"><PiQuestionMarkFill className="me-2" />About Us</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="https://github.com/chingu-voyages/v52-tier3-team-38" target="_blank"><FaGithub className="me-2" />GitHub Repo</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default UserNavbar;