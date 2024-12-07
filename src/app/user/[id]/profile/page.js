"use client";

import { useGetUserByIdQuery } from "@/redux/slices/usersApiSlice";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function UserPage({ params }) {
   const id = params?.id;
   const { user } = useSelector(state => state.auth);

   console.log("UserPage mounted with id:", id);
   console.log("Current auth state:", user);

   const {
     data: userData,
     error,
     isLoading,
     isError
   } = useGetUserByIdQuery(id, {
     skip: !id
   });

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
     console.log("No user ID found");
     return <p>No user ID found. Please log in.</p>;
   }

   if (isLoading) {
     console.log("Loading user data...");
     return <div>Loading user data...</div>;
   }

   if (isError) {
     console.error("Error state reached:", error);
     return <div>
       Error loading user data:
       {error?.data?.message || error?.message || 'Unknown error'}
     </div>;
   }

   if (!userData) {
     console.log("No user data found");
     return <div>No user data found.</div>;
   }

   console.log("Rendering user profile with data:", userData);
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