"use client";

import { useParams } from "next/navigation"
import Link from "next/link"
import { Nav } from "react-bootstrap";
import { FaGithub } from "react-icons/fa";
import {  PiUserDuotone, PiNotePencilDuotone, PiQuestionMarkFill, PiCompassRoseDuotone } from "react-icons/pi";

const UserNavbar = () => {
  const { _id } = useParams();

  return (
    <div>
    <nav className="navbar navbar-expand-lg bg-body-tertiary dropdown">
  <div class="container-fluid">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <PiCompassRoseDuotone />
          </a>
          <ul class="dropdown-menu">
            <li><a className="dropdown-item" href={`/user/${_id}/profile`}><PiUserDuotone />Profile</a></li>
            <li><a className="dropdown-item" href={`/user/${_id}/submit-request`}><PiNotePencilDuotone />Submit Request</a></li>
            <li><a className="dropdown-item" href="/about"><PiQuestionMarkFill />About Us</a></li>
            <li><a className="dropdown-item" href="https://github.com/chingu-voyages/v52-tier3-team-38" target="_blank"><FaGithub /></a></li>
          </ul>
    </div>
</nav>

    {/* <Nav.Item>
      <Nav.Link href={`/user/${_id}/profile`}>Profile</Nav.Link>
    </Nav.Item>
    <Nav.Item>

    <Nav.Link href={`/user/${_id}/submit-request`}>Submit Request</Nav.Link>
    </Nav.Item>
    <Nav.Item>
    <PiQuestionMarkFill />
    <Nav.Link href="/about">About Us</Nav.Link>
    </Nav.Item>
    <Link href="https://github.com/chingu-voyages/v52-tier3-team-38" target="_blank">
    <FaGithub />
    </Link> */}
    </div>
  );
};

export default UserNavbar;