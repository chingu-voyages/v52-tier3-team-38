"use client";

import UserHeader from "../components/UserHeader";
import UserNavbar from "../components/UserNavbar";
import UnauthenticatedLayout from "../components/UnauthenticatedLayout";
import { useSelector } from "react-redux";

const UserLayout = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return <UnauthenticatedLayout>{children}</UnauthenticatedLayout>;
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <UserHeader />
      <main className="flex-grow-1">
        {children}
      </main>
      <UserNavbar />
    </div>
  );
};

export default UserLayout;