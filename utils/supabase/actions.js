'use server'
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "./server"

export async function login(formData) {
  const supabase = await createClient();

  const credentials = {
    email: formData.get('email'),
    password: formData.get('password')
  }

  const { error } = await supabase.auth.signInWithPassword(credentials)

 if (error) {
    return {
      error: {
        message: error.message,
        status: error.status
      }
    }
  }

  revalidatePath('/', 'layout')
  redirect('/') //redirects to landing page if login was successful.
}

export async function signup(formData) {
  const supabase = await createClient()

  const credentials = {
    email: formData.get('email'),
    password: formData.get('password')
  }

  const { data, error } = await supabase.auth.signUp(credentials);

  if (error) {
    console.log(error)
    return { error }
  }

  console.log(data)

  const additonalCredentials = { // after the user is signed up store the additional info in the user_details table which is connected to auth.users in a 1 to 1 relationship.
    id: data.user.id,
    name: formData.get('name'),
    address: formData.get('address'),
    phone_number: formData.get('phoneNumber'),
  }

  const { error: insertError } = await supabase.from('user_details').insert(additonalCredentials)

  if (insertError) {
    return { insertError }
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function logout() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.log(error);
    return {error: error}
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signInWithGoogle() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });

  if (error) {
    console.log(error);
    redirect("/error");
  }


  redirect(data.url);
}
