"use client";

import { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { FaGithub } from "react-icons/fa";
<<<<<<< HEAD
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "../../../utils/supabase/client";

const UserNavbar = () => {
  const [userId, setUserId] = useState(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    async function getUserId() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
      } else {
        // If no user found, redirect to login
        router.push("/login");
      }
    }

    getUserId();
  }, [router]);

  if (!userId) {
    return null; // Don't render navbar until we have user
  }

  // Helper func to check if path is active
  const isActive = (path) => pathname === `/user/${userId}${path}`;

  return (
    <Nav
      fill
      variant="pills"
      className="fixed-bottom bg-light p-2"
    >
      <Nav.Item>
        <Nav.Link
          onClick={() => router.push(`/user/${userId}/profile`)}
          active={isActive("/profile")}
        >
          Profile
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          onClick={() => router.push(`/user/${userId}/submit-request`)}
          active={isActive("/submit-request")}
        >
          Submit Request
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          onClick={() => router.push(`/user/${userId}/service-history`)}
          active={isActive("/service-history")}
        >
          Service History
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          onClick={() => router.push("/about")}
          active={pathname === "/about"}
        >
          About Us
        </Nav.Link>
      </Nav.Item>
      <Link
        href="https://github.com/chingu-voyages/v52-tier3-team-38"
        target="_blank"
        className="nav-link"
      >
        <FaGithub />
      </Link>
=======

import { useParams } from "next/navigation"
import Link from "next/link"

const UserNavbar = () => {
  const { _id } = useParams();

  return (
    <Nav fill variant="pills" defaultActiveKey={"/user/_id/profile"}>
    <div>Navbar</div>
    <Nav.Item>
      <Nav.Link href={`/user/${_id}/profile`}>Profile</Nav.Link>
    </Nav.Item>
    <Nav.Item>
    <Nav.Link href={`/user/${_id}/submit-request`}>Submit Request</Nav.Link>
    </Nav.Item>
    <Nav.Item>
    <Nav.Link href={`/user/${_id}/service-history`}>Service History</Nav.Link>
    </Nav.Item>
    <Nav.Item>
    <Nav.Link href="/about">About Us</Nav.Link>
    </Nav.Item>
    <Link href="https://github.com/chingu-voyages/v52-tier3-team-38" target="_blank">
    <FaGithub />
    </Link>
>>>>>>> e717d63f5a7ce317b3a6d9bb9a101b4db11447fe
    </Nav>
  );
};

export default UserNavbar;