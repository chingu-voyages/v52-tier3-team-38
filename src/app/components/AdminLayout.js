import AdminHeader from "./AdminHeader";
import AdminNavbar from "./AdminNavbar";
import UnauthenticatedLayout from "./UnauthenticatedLayout";
import { useSelector } from "react-redux";

const AdminLayout = ({ children }) => {
   const { user } = useSelector((state) => state.auth);

    if (!user) {
    return <UnauthenticatedLayout>{children}</UnauthenticatedLayout>; // Redirect or fallback
  }

  return (
    <main>
        <AdminHeader />
        {children}
        <AdminNavbar />
    </main>
  );
}

export default AdminLayout