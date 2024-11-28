import { redirect } from 'next/navigation'
import { createClient } from "./client";

export const getUserDetails = async (userId) => { // Helper function to get user details of logged in user.
  const supabase = await createClient();

  const { data, error } = await supabase.from('user_details').select('*').eq('id', userId).single();

  if (error) {
    console.log(error);
    redirect('/error');
  }

  return data;
}