"use client";

import Nav from 'react-bootstrap/Nav';

import { FaGithub } from "react-icons/fa";

import Link from "next/link"

const AdminNavbar = () => {

  return (
    <Nav fill variant="pills" defaultActiveKey={"/admin/_id/profile"}>
    <div>Admin Navbar</div>
    <Nav.Item>
    <Nav.Link href="/admin/_id/profile">Profile</Nav.Link>
    </Nav.Item>
     <Nav.Item>
    <Nav.Link href="/admin/_id/requests">Requests</Nav.Link>
    </Nav.Item>
     <Nav.Item>
      <Nav.Link href="/admin/_id/schedule">Schedule</Nav.Link>
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

export default AdminNavbar