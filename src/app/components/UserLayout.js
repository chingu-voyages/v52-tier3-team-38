import UserHeader from "./UserHeader";
import UserNavbar from "./UserNavbar";
import UnauthenticatedLayout from "./UnauthenticatedLayout";
import { useSelector } from "react-redux";


const UserLayout = ({ children }) => {
   const { user } = useSelector((state) => state.auth);

      if (!user) {
      return <UnauthenticatedLayout>{children}</UnauthenticatedLayout>; // Redirect or fallback
    }

  return (
    <main>
        <UserHeader />
        {children}
        <UserNavbar />
    </main>
  );
}

export default UserLayout