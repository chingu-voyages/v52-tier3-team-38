"use client";

import { Button } from "react-bootstrap";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { logout } from "../../../utils/supabase/actions";
import { clearSession } from "@/redux/slices/authSlice";
import { useDispatch } from "react-redux";

const UserHeader = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = async () => {
  const { error } = await logout();  // Call the logout function

  if (error) {
    console.log("Error during logout:", error.message);
  } else {
    dispatch(clearSession());  // Reset the user state
    router.push("/");  // Ensure you redirect after successful logout
  }
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