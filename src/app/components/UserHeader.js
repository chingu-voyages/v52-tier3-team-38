"use client";

import { Button } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { clientLogout } from "../../../utils/supabase/client-logout";

const UserHeader = () => {

  const router = useRouter();

  const handleLogout = async () => {
    await clientLogout(router); // Call the client-side logout logic
  };

  return (
    <>
    <div>Header</div>
    <h1>Solarize</h1>
    <h3>Logged in as resident!</h3>
    <Button variant="danger" onClick={handleLogout}>Log Out</Button>
    </>
  )
}

export default UserHeader