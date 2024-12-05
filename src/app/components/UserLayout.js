import { RedirectType } from "next/navigation";
import UserHeader from "./UserHeader";
import UserNavbar from "./UserNavbar";
import { useSelector } from "react-redux";


const UserLayout = ({ children }) => {
   const { user } = useSelector((state) => state.auth);

  // If someone tries to access a page that requires authentication, or authentication goes wrong, they get redirected to login.
    if (!user) {
    return <RedirectType to="/login" />;
  }

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