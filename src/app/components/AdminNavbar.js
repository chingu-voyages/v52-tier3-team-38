"use client";

import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { logout } from "../../../utils/supabase/actions";
import { FaGithub } from "react-icons/fa";
import { PiSunBold, PiCalendarDuotone, PiQuestionMarkFill } from "react-icons/pi";

const AdminNavbar = () => {
  const router = useRouter();

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        {/* Brand - stays the same on all views */}
        <Navbar.Brand href="/" className="fs-4">
          <PiSunBold className="me-2 fs-3" />Solarize
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          {/* Main navigation items */}
          <Nav className="ms-auto me-3">
            {/* Desktop view: Horizontal list without icons */}
            <div className="d-none d-lg-flex">
              <Nav.Link href="/admin/appointments/listView" className="px-3">Appointments</Nav.Link>
              <Nav.Link href="/about" className="px-3">About Us</Nav.Link>
              <Nav.Link
                href="https://github.com/chingu-voyages/v52-tier3-team-38"
                target="_blank"
                className="px-3"
              >
                GitHub Repo
              </Nav.Link>
            </div>

            {/* Mobile view: Vertical list with icons and labels */}
            <div className="d-lg-none">
              <Nav.Link href="/admin/appointments/listView" className="py-3 d-flex align-items-center">
                <PiCalendarDuotone className="me-3 fs-2" />
                <span className="fs-6">Appointments</span>
              </Nav.Link>
              <Nav.Link href="/about" className="py-3 d-flex align-items-center">
                <PiQuestionMarkFill className="me-3 fs-2" />
                <span className="fs-6">About Us</span>
              </Nav.Link>
              <Nav.Link
                href="https://github.com/chingu-voyages/v52-tier3-team-38"
                target="_blank"
                className="py-3 d-flex align-items-center"
              >
                <FaGithub className="me-3 fs-2" />
                <span className="fs-6">GitHub Repo</span>
              </Nav.Link>
              <hr className="my-2" />
              <div className="py-2 text-center">
                <Button variant="danger" onClick={logout} className="px-4">Log Out</Button>
              </div>
            </div>
          </Nav>

          {/* Desktop view: Logout button */}
          <div className="d-none d-lg-block">
            <Button variant="danger" onClick={logout}>Log Out</Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AdminNavbar;