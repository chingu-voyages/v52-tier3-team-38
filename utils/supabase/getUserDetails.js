import { redirect } from 'next/navigation'
import { createClient } from "./client";

export const getUserDetails = async (userId) => {
  const supabase = await createClient();

  const { data, error } = await supabase.from('user_details').select('*').eq('id', userId).single();

  if (error) {
    console.log(error);
    redirect('/error');
  }

  // console.log(data)
  return data;
}