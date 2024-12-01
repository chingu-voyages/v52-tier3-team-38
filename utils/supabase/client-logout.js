import { createClient } from "./client"; // Use the client-side Supabase instance
import { logout as serverLogout } from "./actions"; // Import the server-side logout

export async function clientLogout(router) {
  const supabase = await createClient();

  // Sign out on the client side
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.log("Client-side logout error:", error);
    return { error };
  }

  // Optional: Call the server-side logout for additional server-side cleanup
  try {
    await serverLogout();
  } catch (serverError) {
    console.log("Server-side logout encountered an error:", serverError);
  }

  // Redirect to the home page on the client side
  router.push("/");
}