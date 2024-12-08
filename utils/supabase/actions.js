'use server'
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "./server";

export async function login(formData) {
  const supabase = await createClient();

  const credentials = {
    email: formData.get('email'),
    password: formData.get('password')
  }

  const { error } = await supabase.auth.signInWithPassword(credentials)

  if (error) {
    return { error }
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

  const { error } = await supabase.auth.signUp({
    ...credentials,
    options: {
      data: {
        name: formData.get('name')
      }
    }
  });

  if (error) {
    console.log(error)
    return { error }
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
      redirectTo: `${process.env.BASE_URL}/auth/callback`
    },
  });

  if (error) {
    console.log(error);
    redirect("/error");
  }

  redirect(data.url);
}
