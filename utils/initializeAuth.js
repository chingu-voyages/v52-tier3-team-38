import { createClient } from "./supabase/client";
import { isAdmin } from "./supabase/isAdmin";
import { getUserDetails } from "./supabase/getUserDetails";

export default async function initializeAuth(setUser, setUserDetails, setAdmin, setLoading) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const adminStatus = await isAdmin(user.email);
    setAdmin(adminStatus);

    if (!adminStatus) {
      const details = await getUserDetails(user.id);
      setUserDetails(details);
    }

    setUser(user);
  }

  setLoading(false);

  supabase.auth.onAuthStateChange(async (event, session) => {
    if (event === "SIGNED_IN" && session?.user) {
      const adminStatus = await isAdmin(session.user.email);
      setAdmin(adminStatus);
      setUser(session.user);

      if (!adminStatus) {
        const details = await getUserDetails(session.user.id);
        setUserDetails(details);
      }
    } else if (event === "SIGNED_OUT") {
      setUser(null);
      setUserDetails(null);
      setAdmin(false);
    }
  });
}