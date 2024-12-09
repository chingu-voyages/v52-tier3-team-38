"use client";

import { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { FaGithub } from "react-icons/fa";
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
        // If no user is found, redirect to login
        router.push("/login");
      }
    }

    getUserId();
  }, [router]);

  if (!userId) {
    return null; // Don't render navbar until we have the user ID
  }

  // Helper function to check if a path is active
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
    </Nav>
  );
};

export default UserNavbar;