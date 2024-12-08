"use client";

import { Button } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { logout } from "../../../utils/supabase/actions";
import Link from "next/link";

const UserHeader = () => {
  const router = useRouter();

  return (
    <>
    <div>Header</div>
    <Link href="/"><h1>Solarize</h1></Link>
    <h3>Logged in as resident!</h3>
    <Button variant="danger" onClick={logout}>Log Out</Button>
    </>
  )
}

export default UserHeader