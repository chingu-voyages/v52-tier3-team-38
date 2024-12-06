"use client";

import { Button } from "react-bootstrap";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "../../../utils/supabase/client";

const UserHeader = () => {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = await createClient();
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <>
      <div>Header</div>
      <Link href="/"><h1>Solarize</h1></Link>
      <h3>Logged in as resident!</h3>
      <Button variant="danger" onClick={handleLogout}>Log Out</Button>
    </>
  )
}

export default UserHeader;