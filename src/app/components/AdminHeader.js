"use client";

import { Button } from "react-bootstrap";
import { logout } from "../../../utils/supabase/actions";
import Link from "next/link";

const AdminHeader = () => {
  return (
    <>
    <div>Header</div>
    <Link href="/"><h1>Solarize</h1></Link>
    <h3>Logged in as admin!</h3>
    <Button variant="danger" onClick={logout}>Log Out</Button>
    </>
  )
}

export default AdminHeader;