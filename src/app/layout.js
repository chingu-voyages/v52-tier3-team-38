import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

import UserHeader from "./components/UserHeader";
import UserNavbar from "./components/UserNavbar";
import UnauthHeader from "./components/UnauthHeader";
import UnauthNavbar from "./components/UnauthNavbar";

import { getUserDetails } from "../../utils/supabase/getUserDetails";

import { createClient } from "../../utils/supabase/server";
import AdminHeader from "./components/AdminHeader";
import AdminNavbar from "./components/AdminNavbar";

export const metadata = {
  title: "Solarize",
  description: "Developed by Gary Smith, Ross Clettenberg, and Mike Duffey",
};

export default async function RootLayout({ children }) {
  const supabase = await createClient();

  const { data: { user }} = await supabase.auth.getUser();

  if (!user) {
    return (
      <html lang="en" suppressHydrationWarning>
        <body>
          <UnauthHeader />
          {children}
          <UnauthNavbar />
        </body>
      </html>
    );
  }

  // const userDetails = await getUserDetails(user.id);
  // console.log("User details:", userDetails);

  // if (userDetails.role === 1) {
  //   return (
  //     <html lang="en" suppressHydrationWarning>
  //       <body>
  //         <AdminHeader />
  //         {children}
  //         <AdminNavbar />
  //       </body>
  //     </html>
  //   );
  // }

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
