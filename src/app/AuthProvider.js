"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSession, clearSession } from "../redux/slices/authSlice";
import { createClient } from "../../utils/supabase/client";
import { isAdmin } from "../../utils/supabase/isAdmin";
import UnauthenticatedLayout from "./components/UnauthenticatedLayout";
import AdminLayout from "./admin/layout";
import UserLayout from "./user/layout";

export default function AuthProvider({ children }) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const { user, role } = useSelector((state) => state.auth);

  useEffect(() => {
    const supabase = createClient();
    let subscription;

   const initializeAuth = async () => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error) {
      // If it's just a missing session, handle it gracefully
      if (error.message === "Auth session missing!") {
        dispatch(clearSession());
      } else {
        // Log other unexpected errors
        console.error("Auth initialization error:", error.message);
        dispatch(clearSession());
      }
    } else if (user) {
      const adminStatus = await isAdmin(user.email);
      dispatch(setSession({
        user,
        role: adminStatus ? "admin" : "user"
      }));
    } else {
      dispatch(clearSession());
    }

    subscription = supabase.auth.onAuthStateChange(async (event, session) => {
      // ... rest of the code
    });
  } catch (error) {
    // Handle other errors that aren't from Supabase auth
    if (
      error?.message !== "NEXT_REDIRECT" &&
      error?.message !== "NEXT_NOT_FOUND"
    ) {
      console.error("Unexpected error:", error?.message || "Auth initialization failed");
    }
    dispatch(clearSession());
  } finally {
    setIsLoading(false);
  }
};

    initializeAuth();

    return () => {
      subscription?.unsubscribe();
    };
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>; // Or your loading component
  }

  // Choose the appropriate layout based on auth state
  if (!user) {
    return <UnauthenticatedLayout>{children}</UnauthenticatedLayout>;
  }

  if (role === "admin") {
    return <AdminLayout>{children}</AdminLayout>;
  }

  return <UserLayout>{children}</UserLayout>;
}
