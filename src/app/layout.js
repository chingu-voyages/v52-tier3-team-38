"use client";

import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSession, clearSession } from "../../redux/slices/authSlice";
import { useGetUserByIdQuery } from "../../redux/slices/usersApiSlice";
import { isAdmin } from "../../utils/supabase/isAdmin";
import UnauthenticatedLayout from "./components/UnauthenticatedLayout";
import AdminLayout from "./components/AdminLayout";
import UserLayout from "./components/UserLayout";

export const metadata = {
  title: "Solarize",
  description: "Developed by Gary Smith, Ross Clettenberg, and Mike Duffey",
};

export default function RootLayout({ children }) {
const dispatch = useDispatch();
  const { user, session } = useSelector((state) => state.auth);

  const { data: userDetails, isLoading } = useGetUserByIdQuery(user?.id, {
    skip: !user,
  });

  useEffect(() => {
    const supabase = createClient();

    const checkAuth = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        dispatch(setSession({ user, session: user.session }));
      } else {
        dispatch(clearSession());
      }

      supabase.auth.onAuthStateChange((event, session) => {
        if (event === "SIGNED_IN") {
          dispatch(setSession({ user: session.user, session }));
        } else if (event === "SIGNED_OUT") {
          dispatch(clearSession());
        }
      });
    };

    checkAuth();
  }, [dispatch]);

  if (isLoading || !user) {
    return <UnauthenticatedLayout>{children}</UnauthenticatedLayout>;
  }

 const checkAdmin = isAdmin(user.email);

  if (checkAdmin) { // Admin
    return (
      <html lang="en" suppressHydrationWarning>
        <body>
          <AdminLayout>{children}</AdminLayout>;
        </body>
      </html>
    );
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <UserLayout>{children}</UserLayout>
      </body>
    </html>
  );
}