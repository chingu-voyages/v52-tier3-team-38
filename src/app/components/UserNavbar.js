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
        <Navbar.Brand href="/" className="fs-4">
          <PiSunBold className="me-2 fs-3" />Solarize
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Menu" id="basic-nav-dropdown">
              {/* Mobile view: Icons in a row */}
              <div className="d-lg-none d-flex justify-content-around py-4">
                <NavDropdown.Item href={`/user/${_id}/profile`} className="text-center mx-2">
                  <PiUserDuotone className="fs-1" />
                </NavDropdown.Item>
                <NavDropdown.Item href={`/user/${_id}/submit-request`} className="text-center mx-2">
                  <PiNotePencilDuotone className="fs-1" />
                </NavDropdown.Item>
                <NavDropdown.Item href="/about" className="text-center mx-2">
                  <PiQuestionMarkFill className="fs-1" />
                </NavDropdown.Item>
                <NavDropdown.Item
                  href="https://github.com/chingu-voyages/v52-tier3-team-38"
                  target="_blank"
                  className="text-center mx-2"
                >
                  <FaGithub className="fs-1" />
                </NavDropdown.Item>
              </div>

              {/* Desktop view: Icons with text */}
              <div className="d-none d-lg-block">
                <NavDropdown.Item href={`/user/${_id}/profile`} className="d-flex align-items-center">
                  <PiUserDuotone className="me-2 fs-4" />Profile
                </NavDropdown.Item>
                <NavDropdown.Item href={`/user/${_id}/submit-request`} className="d-flex align-items-center">
                  <PiNotePencilDuotone className="me-2 fs-4" />Submit Request
                </NavDropdown.Item>
                <NavDropdown.Item href="/about" className="d-flex align-items-center">
                  <PiQuestionMarkFill className="me-2 fs-4" />About Us
                </NavDropdown.Item>
                <NavDropdown.Item
                  href="https://github.com/chingu-voyages/v52-tier3-team-38"
                  target="_blank"
                  className="d-flex align-items-center"
                >
                  <FaGithub className="me-2 fs-4" />GitHub Repo
                </NavDropdown.Item>
              </div>
            </NavDropdown>
          </Nav>

          {/* Login status and button in a row */}
          <Nav className="d-flex flex-row align-items-center">
            <span className="navbar-text me-3">Logged in as resident</span>
            <Button variant="danger" onClick={logout} className="my-2">Log Out</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default UserNavbar;