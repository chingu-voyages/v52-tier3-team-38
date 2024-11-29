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
  description: "Created by Gary Smith, Ross Clettenberg, Mike Duffy",
};

export default async function RootLayout({ children }) {
  const supabase = await createClient();

  const { data: { user }, error } = await supabase.auth.getUser();

  if (error) {
    console.error("Error fetching user or no user found:", error);
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

  const userDetails = await getUserDetails(user.id);
  console.log("User details:", userDetails);

  if (userDetails.role === 1) {
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
