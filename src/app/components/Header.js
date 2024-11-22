"use client";

import { Button } from "react-bootstrap"

import { useRouter } from "next/navigation"

const Header = () => {

  const router = useRouter()

  return (
    <>
    <div>Header</div>
    <h1>Solarize</h1>
    <Button variant="primary" onClick={() => router.push("/user/signup")}>Sign Up!</Button>
    <Button variant="primary" onClick={() => router.push("/user/login")}>Log In</Button>
    <Button variant="danger">Log Out</Button>
    </>
  )
}

export default Header