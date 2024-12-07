import { createClient } from "./supabase/client";
import { isAdmin } from "./supabase/isAdmin";
import { getUserDetails } from "./supabase/getUserDetails";

export default async function initializeAuth(setUser, setUserDetails, setAdmin, setLoading) {
  try {
    const supabase = createClient();

    const {
      data: { user },
      error: userError
    } = await supabase.auth.getUser();

    if (userError) {
      console.error("Error getting user:", userError);
      setLoading(false);
      return;
    }

    if (user) {
      try {
        const adminStatus = await isAdmin(user.email);
        setAdmin(adminStatus);

        if (!adminStatus) {
          try {
            const details = await getUserDetails(user.id);
            setUserDetails(details);
          } catch (detailsError) {
            console.error("Error getting user details:", detailsError);
            setUserDetails(null);
          }
        }

        setUser(user);
      } catch (adminCheckError) {
        console.error("Error checking admin status:", adminCheckError);
        setAdmin(false);
      }
    }

    setLoading(false);

    supabase.auth.onAuthStateChange(async (event, session) => {
      try {
        if (event === "SIGNED_IN" && session?.user) {
          const adminStatus = await isAdmin(session.user.email);
          setAdmin(adminStatus);
          setUser(session.user);

          if (!adminStatus) {
            try {
              const details = await getUserDetails(session.user.id);
              setUserDetails(details);
            } catch (detailsError) {
              console.error("Error getting user details on auth change:", detailsError);
              setUserDetails(null);
            }
          }
        } else if (event === "SIGNED_OUT") {
          setUser(null);
          setUserDetails(null);
          setAdmin(false);
        }
      } catch (authStateError) {
        console.error("Error in auth state change:", authStateError);
        setUser(null);
        setUserDetails(null);
        setAdmin(false);
      }
    });
  } catch (globalError) {
    console.error("Unexpected error in initializeAuth:", globalError);
    setLoading(false);
  }
}