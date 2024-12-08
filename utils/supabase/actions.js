'use server'
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "./server"

export async function login(formData) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email: formData.get('email'),
    password: formData.get('password')
  });

  if (error) {
    return {
      error: {
        message: error.message,
        status: error.status
      }
    };
  }

  if (!data?.session) {
    return {
      error: {
        message: "No session created",
        status: 400
      }
    };
  }

  // Don't need to dispatch here since AuthProvider will handle it
  revalidatePath('/', 'layout');
  redirect('/');
}

export async function signup(formData) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: formData.get('email'),
      password: formData.get('password'),
      options: {
        data: {
          name: formData.get('name'),
          address: formData.get('address'),
          phoneNumber: formData.get('phoneNumber'),
        },
      },
    });

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
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
