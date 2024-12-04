import UserHeader from "./UserHeader";
import UserNavbar from "./UserNavbar";


const UserLayout = () => {
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