"use client";

import UserHeader from "./UserHeader";
import UserNavbar from "./UserNavbar";
import UnauthenticatedLayout from "./UnauthenticatedLayout";
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