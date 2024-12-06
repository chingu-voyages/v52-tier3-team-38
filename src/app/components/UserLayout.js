import { RedirectType } from "next/navigation";
import UserHeader from "./UserHeader";
import UserNavbar from "./UserNavbar";
import { useSelector } from "react-redux";


const UserLayout = ({ children }) => {
   const { user } = useSelector((state) => state.auth);

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <UserHeader />
        {children}
        <UserNavbar />
      </body>
    </html>
  );
}

export default UserLayout