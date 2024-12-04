import AdminHeader from "./AdminHeader";
import AdminNavbar from "./AdminNavbar";

const AdminLayout = () => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AdminHeader />
        {children}
        <AdminNavbar />
      </body>
    </html>
  );
}

export default AdminLayout