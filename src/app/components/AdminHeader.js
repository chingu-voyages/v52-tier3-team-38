// AdminHeader.js
"use client";

import { Button } from "react-bootstrap";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { logout } from "../../../utils/supabase/actions";
import { clearSession } from "@/redux/slices/authSlice";
import { useDispatch } from "react-redux";

const AdminHeader = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // Clear client-side state first
      dispatch(clearSession());

      // Call the server action
      await logout();

      // Note: we don't need router.replace here because the server action handles redirect
    } catch (error) {
      if (error.message !== "NEXT_REDIRECT") {
        console.error("Error during logout:", error?.message || "Logout failed");
        router.refresh();
    }
  };

  return (
    <header className="p-3 bg-light">
      <div className="container d-flex justify-content-between align-items-center">
        <Link href="/" className="text-decoration-none text-dark">
          <h1 className="m-0">Solarize</h1>
        </Link>
        <div className="d-flex align-items-center gap-3">
          <h3 className="m-0">Logged in as admin!</h3>
          <Button variant="danger" onClick={handleLogout}>Log Out</Button>
        </div>
      </div>
    </header>
  );
};

};

export default AdminHeader;
