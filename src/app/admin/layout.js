"use client";

import AdminHeader from "../components/AdminHeader";
import AdminNavbar from "../components/AdminNavbar";

const AdminLayout = ({ children }) => {

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