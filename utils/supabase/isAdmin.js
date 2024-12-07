import { createClient } from "./client";

export async function isAdmin(email) {
  if (!email) {
    console.warn("No email provided for admin check");
    return false;
  }

  try {
    const supabase = createClient();

    // Use select without .single() to handle potential no-rows scenario
    const { data, error } = await supabase
      .from("approved_admin_emails")
      .select("*")
      .eq("email", email)
      .maybeSingle(); // Use maybeSingle to handle zero or one rows

    if (error) {
      console.error("Admin check Supabase error:", error);
      return false;
    }

    // Return true if data exists, false otherwise
    return !!data;
  } catch (catchError) {
    console.error("Unexpected error in isAdmin:", catchError);
    return false;
  }
}