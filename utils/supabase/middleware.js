import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import dotenv from "dotenv";
dotenv.config();

export async function updateSession(request) { // handles session management, makes sure user is authenticated by updating and managing cookies. ex: stores JWT token for every request without reauthenticating the user.
  let supabaseResponse = NextResponse.next()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            supabaseResponse.cookies.set(name, value, options);
          });
        }
      }
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  if ( !user && !request.nextUrl.pathname.startsWith("/login") && // if there is no user, redirect to login page
    !request.nextUrl.pathname.startsWith("/auth")
  ) {
    const url = request.nextUrl.clone()
    url.pathname = "/login"
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}