"use client";

import { useSelector } from "react-redux";
import dynamic from "next/dynamic";

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
  const { user, role, isInitialized } = useSelector((state) => state.auth);

  // Wait for auth to be initialized
  if (!isInitialized) {
    return <div>Loading initial auth state...</div>;
  }

  // Show guest home if no user
  if (!user) {
    return <GuestHome />;
  }

  // Show admin or user page based on role
  return role === 'admin' ?
    <AdminPage params={{ id: user.id }} /> :
    <UserPage params={{ id: user.id }} />;
}