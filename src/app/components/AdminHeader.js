"use client";

import { Button } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { clientLogout } from "../../../utils/supabase/client-logout";
import Link from "next/link";

const AdminHeader = () => {

  const router = useRouter();

  const handleLogout = async () => {
    await clientLogout(router); // Call the client-side logout logic
  };

  return (
    <>
    <div>Header</div>
    <Link href="/"><h1>Solarize</h1></Link>
    <h3>Logged in as admin!</h3>
    <Button variant="danger" onClick={handleLogout}>Log Out</Button>
    </>
  )
}

export default AdminHeader