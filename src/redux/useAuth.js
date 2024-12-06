import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSession, clearSession } from "./slices/authSlice";
import { createClient } from "../utils/supabase/client";

const useAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    let supabase;
    let authListener;

    const initializeAuth = async () => {
      supabase = await createClient();

      // Initial session check
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        dispatch(setSession({ 
          user: session.user, 
          session 
        }));
      } else {
        dispatch(clearSession());
      }

      // Set up auth state change listener
      authListener = supabase.auth.onAuthStateChange((event, session) => {
        switch (event) {
          case "SIGNED_IN":
            if (session?.user) {
              dispatch(setSession({ 
                user: session.user, 
                session 
              }));
            }
            break;
          case "SIGNED_OUT":
            dispatch(clearSession());
            break;
          case "TOKEN_REFRESHED":
            if (session?.user) {
              dispatch(setSession({ 
                user: session.user, 
                session 
              }));
            }
            break;
        }
      });
    };

    initializeAuth();

    // Cleanup function
    return () => {
      if (authListener) {
        authListener.unsubscribe();
      }
    };
  }, [dispatch]);

  return null;
};

export default useAuth;