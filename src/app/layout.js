"use client";

import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSession, clearSession } from "../redux/slices/authSlice";
import { useGetUserByIdQuery } from "../redux/slices/usersApiSlice";
import { isAdmin } from "../../utils/supabase/isAdmin";
import UnauthenticatedLayout from "./components/UnauthenticatedLayout";
import AdminLayout from "./components/AdminLayout";
import UserLayout from "./components/UserLayout";
import { createClient } from "../../utils/supabase/client";

const jsonLd = {
  title: "Solarize",
  description: "Developed by Gary Smith, Ross Clettenberg, and Mike Duffey",
};

export default function RootLayout({ children }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

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
    return (
      <html lang="en" suppressHydrationWarning>
        <head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        </head>
        <UnauthenticatedLayout>{children}</UnauthenticatedLayout>
      </html>
    );
  }

  const checkAdmin = isAdmin(user.email);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      {checkAdmin ? (
        <AdminLayout>{children}</AdminLayout>
      ) : (
        <UserLayout>{children}</UserLayout>
      )}
    </html>
  );
}



// "use client";

// import "./globals.css";
// import "bootstrap/dist/css/bootstrap.min.css";

// import { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { setSession, clearSession } from "../redux/slices/authSlice";
// import { useGetUserByIdQuery } from "../redux/slices/usersApiSlice";
// import { isAdmin } from "../../utils/supabase/isAdmin";
// import UnauthenticatedLayout from "./components/UnauthenticatedLayout";
// import AdminLayout from "./components/AdminLayout";
// import UserLayout from "./components/UserLayout";
// import store from "../redux/store";

// import { Provider } from "react-redux";

// const jsonLd = {
//   title: "Solarize",
//   description: "Developed by Gary Smith, Ross Clettenberg, and Mike Duffey",
// };

// export default function RootLayout({ children }) {

// <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
//       />
// const dispatch = useDispatch();
//   const { user, session } = useSelector((state) => state.auth);

//   const { data: userDetails, isLoading } = useGetUserByIdQuery(user?.id, {
//     skip: !user,
//   });

//   useEffect(() => {
//     const supabase = createClient();

//     const checkAuth = async () => {
//       const {
//         data: { user },
//       } = await supabase.auth.getUser();

//       if (user) {
//         dispatch(setSession({ user, session: user.session }));
//       } else {
//         dispatch(clearSession());
//       }

//       supabase.auth.onAuthStateChange((event, session) => {
//         if (event === "SIGNED_IN") {
//           dispatch(setSession({ user: session.user, session }));
//         } else if (event === "SIGNED_OUT") {
//           dispatch(clearSession());
//         }
//       });
//     };

//     checkAuth();
//   }, [dispatch]);

//   if (isLoading || !user) {
//     return (
//     <html lang="en" suppressHydrationWarning>
//     <Provider store={store}>
//     <UnauthenticatedLayout>{children}</UnauthenticatedLayout>;
//     </Provider>
//   </html>
//     );
//   }

//  const checkAdmin = isAdmin(user.email);

//   if (checkAdmin) { // Admin
//     return (
//       <html lang="en" suppressHydrationWarning>
//       <Provider store={store}>
//           <AdminLayout>{children}</AdminLayout>
//       </Provider>
//       </html>
//     );
//   }

//   return (
//     <html lang="en" suppressHydrationWarning>
//     <Provider store={store}>
//         <UserLayout>{children}</UserLayout>
//     </Provider>
//     </html>
//   );
// }