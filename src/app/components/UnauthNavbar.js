"use client";

import { Nav } from "react-bootstrap";
import { FaGithub } from "react-icons/fa";

import Link from "next/link"

const UnauthNavbar = () => {


  return (
    <Nav fill variant="pills" defaultActiveKey={"/admin/_id/profile"}>
    <div>Resident Navbar</div>
    <Nav.Item>
      <Nav.Link href="/signup">Sign Up</Nav.Link>
    </Nav.Item>
    <Nav.Item>
    <Nav.Link href="/services">Services</Nav.Link>
    </Nav.Item>
    <Nav.Item>
    <Nav.Link href="/about">About Us</Nav.Link>
    </Nav.Item>
    <Link href="https://github.com/chingu-voyages/v52-tier3-team-38" target="_blank">
    <FaGithub />
    </Link>
    </Nav>
  )
}

export default UnauthNavbar