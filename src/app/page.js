"use client";

import UserPage from "./user/[_id]/profile/page";
import AdminPage from "./admin/[_id]/profile/page";
import GuestHome from "./GuestHome";

import { getUserDetails } from "../../utils/supabase/getUserDetails";
import { createClient } from "../../utils/supabase/client";

import { useEffect, useState } from "react";

export default function Root() {
  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let supabase;
    let unsubscribe;

    const initializeSupabase = async () => {
      supabase = await createClient();

      // Fetch initial user
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const details = await getUserDetails(user.id);
        setUser(user);
        setUserDetails(details);
        console.log("User initialized:", { user, details });
      } else {
        setUser(null);
        setUserDetails(null);
        console.log("No user logged in initially.");
      }
      setLoading(false);

      // Subscribe to auth changes
      const { data: subscription } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          console.log("Auth state change detected:", event);

          if (event === "SIGNED_IN") {
            if (session?.user) {
              const details = await getUserDetails(session.user.id);
              setUser(session.user);
              setUserDetails(details);
              console.log("User signed in:", { session, details });
            }
          } else if (event === "SIGNED_OUT") {
            setUser(null);
            setUserDetails(null);
            console.log("User signed out. State cleared.");
          }
        }
      );

      unsubscribe = subscription?.unsubscribe;
    };

    initializeSupabase();

    // Cleanup subscription on unmount
    return () => {
      if (unsubscribe) {
        console.log("Cleaning up auth subscription...");
        unsubscribe();
      }
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <GuestHome />;
  }

  return userDetails?.role === 1 ? <AdminPage /> : <UserPage />;
}




// "use client"

// import UserPage from "./user/[_id]/profile/page";
// import AdminPage from "./admin/[_id]/profile/page";
// import GuestHome from "./GuestHome";

// import { getUserDetails } from "../../utils/supabase/getUserDetails";

// import { createClient } from "../../utils/supabase/client";

// import { useEffect, useState } from "react";

// export default function Root() {
//   const [user, setUser] = useState(null);
//   const [userDetails, setUserDetails] = useState(null);

//   useEffect(() => {
//     async function fetchData() {
//       const supabase = await createClient();
//       const { data: { user } } = await supabase.auth.getUser();
//       if (user) {
//         const userDetails = await getUserDetails(user.id);
//         setUser(user);
//         setUserDetails(userDetails);
//         console.log("User details:", userDetails);
//       }
//     }
//     fetchData();
//   }, []);

//   if (!user) return <GuestHome />;
//   return userDetails.role === 1 ? <AdminPage /> : <UserPage />;
}
