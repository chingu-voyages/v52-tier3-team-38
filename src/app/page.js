"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { getUserDetails } from "../../utils/supabase/getUserDetails";
import { createClient } from "../../utils/supabase/client";
import { isAdmin } from "../../utils/supabase/isAdmin";

const GuestHome = dynamic(() => import("./GuestHome"));
const UserPage = dynamic(() => import("./user/[_id]/profile/page"));
const AdminPage = dynamic(() => import("./admin/[_id]/profile/page"));

export default function Root() {
  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    const supabase = createClient();

    const initializeAuth = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setAdmin(await isAdmin(user.email));

        if (!admin) {
          setUserDetails(await getUserDetails(user.id));
        }
      }
      setUser(user);
      setLoading(false);

      supabase.auth.onAuthStateChange(async (event, session) => {
        if (event === "SIGNED_IN" && session?.user) {
          setAdmin(await isAdmin(session.user.email));
          setUser(session.user);
          if (!admin) {
            setUserDetails(await getUserDetails(session.user.id));
          }
        } else if (event === "SIGNED_OUT") {
          setUser(null);
          setUserDetails(null);
        }
      });
    };

    initializeAuth();
  }, [admin]);

  if (loading) return <div>Loading...</div>;
  if (!user) return <GuestHome />;
  return admin ? <AdminPage /> : <UserPage />;
}


// "use client";

// import UserPage from "./user/[_id]/profile/page";
// import AdminPage from "./admin/[_id]/profile/page";
// import GuestHome from "./GuestHome";

// import { getUserDetails } from "../../utils/supabase/getUserDetails";
// import { createClient } from "../../utils/supabase/client";
// import { isAdmin } from "../../utils/supabase/isAdmin";

// import { useEffect, useState } from "react";

// export default function Root() {
//   const [user, setUser] = useState(null);
//   const [userDetails, setUserDetails] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [admin, setAdmin] = useState(null);

//   useEffect(() => {
//     let supabase;
//     let unsubscribe;

//     const initializeSupabase = async () => {
//       supabase = await createClient();

//       // Fetch initial user
//       const {
//         data: { user },
//       } = await supabase.auth.getUser();

//       if (user) {
//         const checkAdmin = await isAdmin(user.email);

//         if (!checkAdmin) {
//           const details = await getUserDetails(user.id);
//           setUserDetails(details);
//           console.log("User initialized:", { user, details });
//         }

//         setUser(user); //set user regardless if admin or not. 
//         setAdmin(checkAdmin)
//       }

//       else {
//         setUser(null);
//         setUserDetails(null);
//         console.log("No user logged in initially.");
//       }
//       setLoading(false);

//       // Subscribe to auth changes
//       const { data: subscription } = supabase.auth.onAuthStateChange(
//         async (event, session) => {
//           console.log("Auth state change detected:", event);

//           if (event === "SIGNED_IN") {
//             if (session?.user) {
//               const checkAdmin = await isAdmin(session.user.email)
//               setAdmin(checkAdmin)

//               if (!admin) {
//                 const details = await getUserDetails(session.user.id);
//                 setUserDetails(details);
//                 console.log("User signed in:", { session, details });
//               }

//               setUser(session.user);
//             }
//           } else if (event === "SIGNED_OUT") {
//             setUser(null);
//             setUserDetails(null);
//             console.log("User signed out. State cleared.");
//           }
//         }
//       );

//       unsubscribe = subscription?.unsubscribe;
//     };

//     initializeSupabase();

//     // Cleanup subscription on unmount
//     return () => {
//       if (unsubscribe) {
//         console.log("Cleaning up auth subscription...");
//         unsubscribe();
//       }
//     };
//   }, [admin]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!user) {
//     return <GuestHome />;
//   }

//   return admin ? <AdminPage /> : <UserPage />;
// }
