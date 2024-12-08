"use client";

import { use } from "react";
import { useGetUserByIdQuery } from "@/redux/slices/usersApiSlice";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { useRouter } from "next/navigation";

function AdminPage({ params }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const id = resolvedParams?.id;
  const { user, role, isInitialized } = useSelector(state => state.auth);

  const {
    data: adminData,
    error,
    isLoading,
    isError
  } = useGetUserByIdQuery(id, {
    skip: !id
  });

  // Auth check effect
  useEffect(() => {
    if (!isInitialized) return;

    if (!user || role !== "admin") {
      router.push("/admin/login");
      return;
    }

    if (user.id !== id) {
      router.push("/");
      return;
    }
  }, [user, role, isInitialized, id, router]);

  useEffect(() => {
    console.log("AdminPage mounted with id:", id);
    console.log("Current auth state:", user);
  }, [id, user]);

  useEffect(() => {
    console.log("Query state:", { isLoading, isError, adminData, error });
    if (isError) {
      console.error("Detailed Query Error:", {
        status: error?.status,
        data: error?.data,
        message: error?.message
      });
    }
  }, [isLoading, isError, adminData, error]);

  // Wait for auth to be initialized
  if (!isInitialized) {
    return <div>Loading...</div>;
  }

  // Auth redirects are handled in useEffect, but we still need to prevent render
  if (!user || role !== "admin") {
    return <div>Redirecting to login...</div>;
  }

  if (!id) {
    return <p>No admin ID found. Please log in.</p>;
  }

  if (isLoading) {
    return <div>Loading admin data...</div>;
  }

  if (isError) {
    return <div>
      Error loading admin data:
      {error?.data?.message || error?.message || "Unknown error"}
    </div>;
  }

  if (!adminData) {
    return <div>No admin data found.</div>;
  }

  return (
    <div className="container mt-4">
      <h2>Admin Profile</h2>
      <div className="mb-4">
        <h3>Admin Details</h3>
        <p>Name: {adminData.name || "N/A"}</p>
        <p>Email: {adminData.email || "N/A"}</p>
        <p>Phone: {adminData.phone_number || "N/A"}</p>
      </div>

      <div className="mb-4">
        <h3>Quick Links</h3>
        <Button
          variant="primary"
          className="me-2"
          onClick={() => router.push(`/admin/${id}/requests`)}
        >
          View Service Requests
        </Button>
        <Button
          variant="outline-primary"
          onClick={() => router.push(`/admin/${id}/schedule`)}
        >
          View Schedule
        </Button>
      </div>
    </div>
  );
}

export default AdminPage;