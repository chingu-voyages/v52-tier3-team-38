"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import AdminLayout from "@/app/components/AdminLayout";
import { useEffect } from "react";

export default function AdminRouteLayout({ children }) {
  const router = useRouter();
  const { user, role, isInitialized } = useSelector((state) => state.auth);

  useEffect(() => {
    // If auth is initialized and user is not an admin, redirect to admin login
    if (isInitialized && (!user || role !== 'admin')) {
      router.push('/admin/login');
    }
  }, [isInitialized, user, role, router]);

  // Wait for auth to be initialized
  if (!isInitialized) {
    return <div>Loading...</div>;
  }

  // If no user or not an admin, don't render anything while redirecting
  if (!user || role !== 'admin') {
    return <div>Redirecting to login...</div>;
  }

  return <AdminLayout>{children}</AdminLayout>;
}