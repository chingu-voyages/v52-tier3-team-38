import { createClient } from "./client";

export const isAdmin = async (email) => { // Helper function to get user details of logged in user.
  const supabase = await createClient();

  const response = await supabase.from('approved_admin_emails').select('*').eq('email', email).single(); // checks if the email from the form is a approved admin

  if (response.error) {
    console.log('An error occured', response.error)
    return false
  }

  return true;
}