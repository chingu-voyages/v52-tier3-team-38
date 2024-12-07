"use client";

import AdminHeader from "./AdminHeader";
import AdminNavbar from "./AdminNavbar";
import UnauthenticatedLayout from "./UnauthenticatedLayout";
import { useSelector } from "react-redux";

const AdminLayout = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return <UnauthenticatedLayout>{children}</UnauthenticatedLayout>;
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <AdminHeader />
      <main className="flex-grow-1">
        {children}
      </main>
      <AdminNavbar />
    </div>
  );
};

export default AdminLayout;