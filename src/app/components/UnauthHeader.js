"use client";

import { Button } from "react-bootstrap"
import { useRouter } from "next/navigation"
import Link from "next/link";

const UnauthHeader = () => {

  const router = useRouter()

  return (
    <>
    <div>Header</div>
    <Link href="/"><h1>Solarize</h1></Link>
    <Button variant="primary" onClick={() => router.push("/signup")}>Sign Up!</Button>
    <h3>Have an account?</h3>
    <Button variant="primary" onClick={() => router.push("/login")}>Log In</Button>
    </>
  )
}

export default UnauthHeader;