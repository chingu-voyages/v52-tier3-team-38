"use client";

import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { FaGithub } from "react-icons/fa";
import { PiSunBold, PiLightning, PiQuestionMarkFill } from "react-icons/pi";

const UnauthNavbar = () => {
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
            <div className="d-none d-lg-flex align-items-center">
              <Nav.Link href="/services" className="px-3">Services</Nav.Link>
              <Nav.Link href="/about" className="px-3">About Us</Nav.Link>
              <Nav.Link
                href="https://github.com/chingu-voyages/v52-tier3-team-38" 
                target="_blank"
                className="px-3"
              >
                GitHub Repo
              </Nav.Link>
            </div>

            {/* Mobile view: Vertical list with labels */}
            <div className="d-lg-none">
              <Nav.Link href="/services" className="py-3 d-flex align-items-center">
                <PiLightning className="me-3 fs-2" />
                <span className="fs-6">Services</span>
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
              <div className="py-2 d-flex flex-column align-items-center gap-3">
                <Button
                  variant="primary"
                  onClick={() => router.push("/login")}
                  className="px-4"
                >
                  Log In
                </Button>
                <Button
                  variant="outline-primary"
                  onClick={() => router.push("/signup")}
                  className="px-4"
                >
                  Sign Up
                </Button>
              </div>
            </div>
          </Nav>

          {/* Desktop view: Auth buttons */}
          <div className="d-none d-lg-flex gap-2">
            <Button
              variant="primary"
              onClick={() => router.push("/login")}
            >
              Log In
            </Button>
            <Button
              variant="outline-primary"
              onClick={() => router.push("/signup")}
            >
              Sign Up
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default UnauthNavbar;