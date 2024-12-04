import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { createClient } from "../../utils/supabase/server";
import { getUserDetails } from "../../utils/supabase/getUserDetails";

import UnauthenticatedLayout from "./components/UnauthenticatedLayout";
import AdminLayout from "./components/AdminLayout";
import UserLayout from "./components/UserLayout";

export const metadata = {
  title: "Solarize",
  description: "Developed by Gary Smith, Ross Clettenberg, and Mike Duffey",
};

export default async function RootLayout({ children }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <UnauthenticatedLayout>{children}</UnauthenticatedLayout>;
  }

  const userDetails = await getUserDetails(user.id);

  if (userDetails.role === 1) {
    return <AdminLayout>{children}</AdminLayout>;
  }

  return <UserLayout>{children}</UserLayout>;
}