import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

import UserHeader from "./components/UserHeader";
import UserNavbar from "./components/UserNavbar";
import UnauthHeader from "./components/UnauthHeader";
import UnauthNavbar from "./components/UnauthNavbar";

import { isAdmin } from "../../utils/supabase/isAdmin";

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

  if (!user) { // No current user
    return (
      <html lang="en" suppressHydrationWarning>
        <body>
        <UnauthNavbar />
          {children}
        </body>
      </html>
    );
  }

  const checkAdmin = await isAdmin(user.email);

  if (checkAdmin) { // Admin
    return (
      <html lang="en" suppressHydrationWarning>
        <body>
        <AdminNavbar />
          {children}
        </body>
      </html>
    );
  }

  return ( // User
    <html lang="en" suppressHydrationWarning>
      <body>
        <UserNavbar/>
        {children}
      </body>
    </html>
  );
}
