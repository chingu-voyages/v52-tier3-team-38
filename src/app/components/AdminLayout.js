import { RedirectType } from "next/navigation";
import AdminHeader from "./AdminHeader";
import AdminNavbar from "./AdminNavbar";
import { useSelector } from "react-redux";

const AdminLayout = ({ children }) => {
   const { user } = useSelector((state) => state.auth);

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