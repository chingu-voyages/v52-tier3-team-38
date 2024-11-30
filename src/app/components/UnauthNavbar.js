"use client";

import { Button } from "react-bootstrap";
import { FaGithub } from "react-icons/fa";

import { useRouter } from "next/navigation"
import Link from "next/link"

const UnauthNavbar = () => {

  const router = useRouter()

  return (
    <>
    <div>Resident Navbar</div>
    <div>
    <Button variant="primary" onClick={() => router.push("/signup")}>Sign Up!</Button>
    <Button variant="primary" onClick={() => router.push("/services")}>Services</Button>
    <Button variant="primary" onClick={() => router.push("/about")}>About Us</Button>
    </div>
    <Link href="https://github.com/chingu-voyages/v52-tier3-team-38" target="_blank">
    <FaGithub />
    </Link>
    </>
  )
}

export default UnauthNavbar