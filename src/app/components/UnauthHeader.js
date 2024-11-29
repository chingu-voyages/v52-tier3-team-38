"use client";

import { Button } from "react-bootstrap"
import { useRouter } from "next/navigation"

const UnauthHeader = () => {

  const router = useRouter()

  return (
    <>
    <div>Header</div>
    <h1>Solarize</h1>
    <Button variant="primary" onClick={() => router.push("/signup")}>Sign Up!</Button>
    <h3>Have an account?</h3>
    <Button variant="primary" onClick={() => router.push("/login")}>Log In</Button>
    </>
  )
}

export default UnauthHeader