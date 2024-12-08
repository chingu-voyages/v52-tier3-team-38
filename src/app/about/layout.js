"use client";

import { useSelector } from "react-redux";
import AdminHeader from "@/app/components/AdminHeader";
import AdminNavbar from "@/app/components/AdminNavbar";
import UserHeader from "@/app/components/UserHeader";
import UserNavbar from "@/app/components/UserNavbar";
import UnauthenticatedLayout from "@/app/components/UnauthenticatedLayout";

export default function AboutLayout({ children }) {
  const { user, role, isInitialized } = useSelector((state) => state.auth);

  if (!isInitialized) {
    return <div>Loading...</div>;
  }

  // If no user, show unauthenticated layout
  if (!user) {
    return <UnauthenticatedLayout>{children}</UnauthenticatedLayout>;
  }

  // Show admin layout for admin users
  if (role === 'admin') {
    return (
      <div className="d-flex flex-column min-vh-100">
      <AdminHeader />
        <main className="flex-grow-1">
          {children}
        </main>
        <AdminNavbar />
      </div>
    );
  }

  // Show user layout for regular users
  return (
    <div className="d-flex flex-column min-vh-100">
    <UserHeader />
      <main className="flex-grow-1">
        {children}
      </main>
      <UserNavbar />
    </div>
  );
}