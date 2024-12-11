"use client";

import { Container, Nav, Navbar, NavDropdown, Button } from "react-bootstrap";
import { useRouter, useParams } from "next/navigation";
import { logout } from "../../../utils/supabase/actions";
import { FaGithub } from "react-icons/fa";
import { PiUserDuotone, PiNotePencilDuotone, PiQuestionMarkFill, PiSunBold } from "react-icons/pi";

const UserNavbar = () => {
  const router = useRouter();
  const { _id } = useParams();

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/"><PiSunBold className="me-2" />Solarize</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Menu" id="basic-nav-dropdown">
              <NavDropdown.Item href={`/user/${_id}/profile`}>
                <PiUserDuotone className="me-2" />Profile
              </NavDropdown.Item>
              <NavDropdown.Item href={`/user/${_id}/submit-request`}>
                <PiNotePencilDuotone className="me-2" />Submit Request
              </NavDropdown.Item>
              <NavDropdown.Item href="/about">
                <PiQuestionMarkFill className="me-2" />About Us
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                href="https://github.com/chingu-voyages/v52-tier3-team-38"
                target="_blank"
              >
                <FaGithub className="me-2" />GitHub Repo
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <span className="navbar-text me-3">Logged in as resident</span>
            <Button variant="danger" onClick={logout}>Log Out</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default UserNavbar;