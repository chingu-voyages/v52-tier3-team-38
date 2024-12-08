"use client";

import { useEffect } from 'react';
import { useSelector } from "react-redux";
import { useRouter } from 'next/navigation';
import dynamic from "next/dynamic";

const GuestHome = dynamic(() => import("./GuestHome"), {
  loading: () => <div>Loading GuestHome component...</div>
});

export default function Root() {
  const router = useRouter();
  const { user, role, isInitialized } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isInitialized) return;

    if (user) {
      const path = role === 'admin' ?
        `/admin/${user.id}/profile` :
        `/user/${user.id}/profile`;
      router.push(path);
    }
  }, [user, role, isInitialized, router]);

  // Wait for auth to be initialized
  if (!isInitialized) {
    return <div>Loading initial auth state...</div>;
  }

  // Show guest home if no user
  if (!user) {
    return <GuestHome />;
  }

  // Show loading while redirect happens
  return <div>Redirecting to dashboard...</div>;
}