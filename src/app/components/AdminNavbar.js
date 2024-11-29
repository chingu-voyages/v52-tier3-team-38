"use client";

import { Button } from "react-bootstrap";
import { FaGithub } from "react-icons/fa";

import { useRouter } from "next/navigation"
import Link from "next/link"

const AdminNavbar = () => {

  const router = useRouter()

  return (
    <>
    <div>Admin Navbar</div>
    <div>
    <Button variant="primary" onClick={() => router.push("/admin/_id/profile")}>Profile</Button>
    <Button variant="primary" onClick={() => router.push("/admin/_id/requests")}>Requests</Button>
    <Button variant="primary" onClick={() => router.push("/admin/_id/schedule")}>Schedule</Button>
    <Button variant="primary" onClick={() => router.push("/about")}>About Us</Button>
    </div>
    <Link href="https://github.com/chingu-voyages/v52-tier3-team-38" target="_blank">
    <FaGithub />
    </Link>
    </>
  )
}

export default AdminNavbar