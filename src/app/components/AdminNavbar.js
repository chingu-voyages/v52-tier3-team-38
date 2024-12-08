"use client";

import { Nav } from 'react-bootstrap';
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';

const AdminNavbar = () => {
  const pathname = usePathname();
  const { user } = useSelector((state) => state.auth);
  const userId = user?.id;

  return (
    <Nav fill variant="pills" activeKey={pathname} className="p-3">
      <Nav.Item>
        <Link href={`/admin/${userId}/profile`} passHref legacyBehavior>
          <Nav.Link>Profile</Nav.Link>
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link href={`/admin/${userId}/requests`} passHref legacyBehavior>
          <Nav.Link>Requests</Nav.Link>
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link href={`/admin/${userId}/schedule`} passHref legacyBehavior>
          <Nav.Link>Schedule</Nav.Link>
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link href="/about" passHref legacyBehavior>
          <Nav.Link>About Us</Nav.Link>
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link href="https://github.com/chingu-voyages/v52-tier3-team-38" target="_blank" rel="noopener noreferrer">
          <FaGithub className="mx-2" />
        </Link>
      </Nav.Item>
    </Nav>
  );
};

export default AdminNavbar;