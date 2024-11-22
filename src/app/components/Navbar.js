"use client";

import { Button } from "react-bootstrap";
import { FaGithub } from "react-icons/fa";

import { useRouter } from "next/navigation"
import Link from "next/link"

const Navbar = () => {

  const router = useRouter()

  return (
    <>
    <div>Navbar
    {/* unauthenticated */}
    <Button variant="primary" onClick={() => router.push("/signup")}>Sign Up!</Button>
    <Button variant="primary" onClick={() => router.push("/services")}>Services</Button>
    <Button variant="primary" onClick={() => router.push("/about")}>About Us</Button>

    {/* regular resident user */}
    <Button variant="primary" onClick={() => router.push("/user/_id/profile")}>Profile</Button>
    <Button variant="primary" onClick={() => router.push("/user/_id/submit-request")}>Submit Request</Button>
    <Button variant="primary" onClick={() => router.push("/user/_id/service-history")}>Service History</Button>
    <Button variant="primary" onClick={() => router.push("/about")}>About Us</Button>

    {/* admin city employee user */}
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

export default Navbar