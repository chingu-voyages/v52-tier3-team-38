"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import initializeAuth from "../../utils/initializeAuth";
import { useDispatch } from "react-redux";
import { setSession, clearSession } from "../redux/slices/authSlice";

const GuestHome = dynamic(() => import("./GuestHome"), {
  loading: () => <div>Loading GuestHome component...</div>
});
const UserPage = dynamic(() => import("./user/[id]/profile/page"), {
  loading: () => <div>Loading UserPage component...</div>
});
const AdminPage = dynamic(() => import("./admin/[id]/profile/page"), {
  loading: () => <div>Loading AdminPage component...</div>
});

export default function Root() {
  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Starting auth initialization...");
    const initialize = async () => {
      try {
        await initializeAuth(
          setUser,
          setUserDetails,
          setAdmin,
          setLoading
        );
        console.log("Auth initialization complete");
      } catch (error) {
        console.error("Auth initialization error:", error);
        setLoading(false);
      }
    };

    initialize();
  }, []);

  useEffect(() => {
    console.log("User state changed:", { user, admin });
    if (user) {
      dispatch(setSession({
        user,
        role: admin ? 'admin' : 'user'
      }));
    } else {
      dispatch(clearSession());
    }
  }, [user, admin, dispatch]);

  console.log("Current state:", { loading, user, admin });

  if (loading) return <div>Loading initial auth state...</div>;
  if (!user) {
    console.log("No user, rendering GuestHome");
    return <GuestHome />;
  }

  console.log("Rendering user/admin page for user:", user.id);
  return admin ?
    <AdminPage params={{ id: user.id }} /> :
    <UserPage params={{ id: user.id }} />;
}
