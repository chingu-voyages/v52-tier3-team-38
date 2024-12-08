"use client";

import { use } from 'react';
import { useGetUserByIdQuery } from "@/redux/slices/usersApiSlice";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function UserPage({ params }){
  // Resolve params first
  const resolvedParams = use(params);
  const id = resolvedParams?.id;
  const { user } = useSelector(state => state.auth);

  const {
    data: userData,
    error,
    isLoading,
    isError
  } = useGetUserByIdQuery(id, {
    skip: !id
  });

  // Move console logs to useEffect to prevent render issues
  useEffect(() => {
    console.log("UserPage mounted with id:", id);
    console.log("Current auth state:", user);
  }, [id, user]);

  useEffect(() => {
    console.log("Query state:", { isLoading, isError, userData, error });
    if (isError) {
      console.error('Detailed Query Error:', {
        status: error?.status,
        data: error?.data,
        message: error?.message
      });
    }
  }, [isLoading, isError, userData, error]);

  if (!id) {
    return <p>No user ID found. Please log in.</p>;
  }

  if (isLoading) {
    return <div>Loading user data...</div>;
  }

  if (isError) {
    return <div>
      Error loading user data:
      {error?.data?.message || error?.message || 'Unknown error'}
    </div>;
  }

  if (!userData) {
    return <div>No user data found.</div>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      <div>
        <h3>User Details</h3>
        <p>Name: {userData.name || 'N/A'}</p>
        <p>Address: {userData.address || 'N/A'}</p>
        <p>Phone: {userData.phone_number || 'N/A'}</p>
      </div>
    </div>
  );
}

export default UserPage;