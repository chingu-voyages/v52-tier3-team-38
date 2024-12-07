"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSession, clearSession } from "../redux/slices/authSlice";
import { createClient } from "../../utils/supabase/client";
import { isAdmin } from "../../utils/supabase/isAdmin";

export default function AuthProvider({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const supabase = createClient();
    let subscription;

    const initializeAuth = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();

        if (error) throw error;

        if (user) {
          const adminStatus = await isAdmin(user.email);
          dispatch(setSession({
            user,
            role: adminStatus ? "admin" : "user"
          }));
        } else {
          dispatch(clearSession());
        }

        subscription = supabase.auth.onAuthStateChange(async (event, session) => {
          if (event === "SIGNED_IN") {
            const adminStatus = await isAdmin(session.user.email);
            dispatch(setSession({
              user: session.user,
              role: adminStatus ? "admin" : "user",
              session
            }));
          } else if (event === "SIGNED_OUT") {
            dispatch(clearSession());
          }
        });
      } catch (error) {
        console.error("Auth initialization error:", error);
        dispatch(clearSession());
      }
    };

    initializeAuth();

    return () => {
      subscription?.unsubscribe();
    };
  }, [dispatch]);

  return children;
}