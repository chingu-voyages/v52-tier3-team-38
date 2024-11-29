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

  useEffect(() => {
    async function fetchData() {
      const supabase = await createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const userDetails = await getUserDetails(user.id);
        setUser(user);
        setUserDetails(userDetails);
        console.log("User details:", userDetails);
      }
    }
    fetchData();
  }, []);

  if (!user) return <GuestHome />;
  return userDetails.role === 1 ? <AdminPage /> : <UserPage />;
}
