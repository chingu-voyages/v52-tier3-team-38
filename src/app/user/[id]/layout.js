"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import UserLayout from "@/app/components/UserLayout";
import UnauthenticatedLayout from "@/app/components/UnauthenticatedLayout";

export default function UserRouteLayout({ children }) {
  const router = useRouter();
  const { user, role, isInitialized } = useSelector((state) => state.auth);

  // Wait for auth to be initialized
  if (!isInitialized) {
    return <div>Loading...</div>;
  }

  // If no user or not a regular user, show unauthenticated layout
  if (!user || role !== 'user') {
    return <UnauthenticatedLayout>{children}</UnauthenticatedLayout>;
  }

  // If user is admin, redirect to admin section
  if (role === 'admin') {
    router.push(`/admin/${user.id}/profile`);
    return <div>Redirecting...</div>;
  }

  return <UserLayout>{children}</UserLayout>;
}