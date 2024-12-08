"use client";

import { useEffect, useTransition, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSession, clearSession } from "../redux/slices/authSlice";
import { createClient } from "../../utils/supabase/client";
import { isAdmin } from "../../utils/supabase/isAdmin";
import UnauthenticatedLayout from "./components/UnauthenticatedLayout";
import AdminLayout from "./admin/layout";
import UserLayout from "./user/layout";

// Constants
const SESSION_REFRESH_INTERVAL = 10 * 60 * 1000; // 10 minutes

export default function AuthProvider({ children }) {
  const dispatch = useDispatch();
  const [isPending, startTransition] = useTransition();
  const [showLoader, setShowLoader] = useState(true);
  const [loadingState, setLoadingState] = useState('initial');
  const { user, role, isInitialized } = useSelector((state) => state.auth);
  const supabase = createClient();

  // Session refresh logic
  useEffect(() => {
    let refreshInterval;

    const refreshSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Session refresh error:', error);
          dispatch(clearSession());
          return;
        }

        if (session) {
          const adminStatus = await isAdmin(session.user.email);
          dispatch(setSession({
            user: session.user,
            session: session,
            role: adminStatus ? "admin" : "user"
          }));
        }
      } catch (error) {
        console.error('Session refresh failed:', error);
      }
    };

    refreshSession();
    refreshInterval = setInterval(refreshSession, SESSION_REFRESH_INTERVAL);

    return () => {
      if (refreshInterval) {
        clearInterval(refreshInterval);
      }
    };
  }, [dispatch]);

  // Auth state subscription and cleanup
  useEffect(() => {
    const cleanupSubscriptions = new Set();

    const initializeAuth = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();

        if (error) {
          if (error.message === "Auth session missing!") {
            dispatch(clearSession());
          } else {
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

        const subscription = supabase.auth.onAuthStateChange(async (event, session) => {
          console.log("Auth event:", event, session); // Temporary logging

          try {
            switch (event) {
              case 'SIGNED_OUT':
              case 'USER_DELETED':
                dispatch(clearSession());
                break;
                
              case 'SIGNED_IN':
              case 'TOKEN_REFRESHED':
              case 'USER_UPDATED':
                if (session?.user) {
                  const adminStatus = await isAdmin(session.user.email);
                  dispatch(setSession({
                    user: session.user,
                    session: session,
                    role: adminStatus ? "admin" : "user"
                  }));
                }
                break;
                
              default:
                break;
            }
          } catch (error) {
            if (error?.message !== "NEXT_REDIRECT") {
              console.error("Auth state change error:", error);
            }
          }
        });

        cleanupSubscriptions.add(subscription);

      } catch (error) {
        if (
          error?.message !== "NEXT_REDIRECT" &&
          error?.message !== "NEXT_NOT_FOUND"
        ) {
          console.error("Unexpected error:", error?.message || "Auth initialization failed");
        }
        dispatch(clearSession());
      } finally {
        startTransition(() => {
          setLoadingState('loading');
          
          // Add a minimum delay to prevent flash
          const timer = setTimeout(() => {
            setLoadingState('complete');
            setShowLoader(false);
          }, 300);

          window._authTimeouts = window._authTimeouts || [];
          window._authTimeouts.push(timer);
        });
      }
    };

    initializeAuth();

    // Cleanup function
    return () => {
      cleanupSubscriptions.forEach(subscription => {
        if (subscription?.unsubscribe) {
          subscription.unsubscribe();
        }
      });
      
      if (window._authTimeouts) {
        window._authTimeouts.forEach(timeout => clearTimeout(timeout));
        window._authTimeouts = [];
      }
    };
  }, [dispatch]);

  // Loading state handling
  if (showLoader || isPending || loadingState !== 'complete') {
    return (
      <div className="auth-loading" data-state={loadingState}>
        <div className="spinner"></div>
        <style jsx>{`
          .auth-loading {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            opacity: ${loadingState === 'complete' ? 0 : 1};
            transition: opacity 0.2s ease-out;
          }
        `}</style>
      </div>
    );
  }

  // Layout selection based on auth state
  if (!user) {
    return <UnauthenticatedLayout>{children}</UnauthenticatedLayout>;
  }

  if (role === "admin") {
    return <AdminLayout>{children}</AdminLayout>;
  }

  return <UserLayout>{children}</UserLayout>;
}