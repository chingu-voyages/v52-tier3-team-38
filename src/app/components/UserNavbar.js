"use client";

import { Nav } from 'react-bootstrap';
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';

const UserNavbar = () => {
  const pathname = usePathname();
  const { user } = useSelector((state) => state.auth);
  const userId = user?.id;

  return (
    <Nav fill variant="pills" activeKey={pathname} className="p-3">
      <Nav.Item>
        <Link href={`/user/${userId}/profile`} passHref legacyBehavior>
          <Nav.Link>Profile</Nav.Link>
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link href={`/user/${userId}/submit-request`} passHref legacyBehavior>
          <Nav.Link>Submit Request</Nav.Link>
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link href={`/user/${userId}/service-history`} passHref legacyBehavior>
          <Nav.Link>Service History</Nav.Link>
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

export default UserNavbar;