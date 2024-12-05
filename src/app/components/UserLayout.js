import UserHeader from "./UserHeader";
import UserNavbar from "./UserNavbar";


const UserLayout = ({ children }) => {
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