"use client";

import UserHeader from "../components/UserHeader";
import UserNavbar from "../components/UserNavbar";

const UserLayout = ({ children }) => {

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