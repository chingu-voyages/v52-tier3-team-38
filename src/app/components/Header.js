"use client";

import { Button } from "react-bootstrap"
import { useRouter } from "next/navigation"
import { logout } from "../../../utils/supabase/actions";

const Header = () => {

  const router = useRouter()

  return (
    <>
    <div>Header</div>
    <h1>Solarize</h1>
    <Button variant="primary" onClick={() => router.push("/signup")}>Sign Up!</Button>
    <Button variant="primary" onClick={() => router.push("/login")}>Log In</Button>
    <Button variant="danger" onClick={() => logout()}>Log Out</Button>
    </>
  )
}

export default Header