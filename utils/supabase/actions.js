'use server'

import { revalidatePath } from "next/cache"
import { redirect } from 'next/navigation'
import { createClient } from "./server"

export async function login(formData) {
  const supabase = await createClient();

  const credentials = {
    email: formData.get('email'),
    password: formData.get('password')
  }

  const { data, error } = await supabase.auth.signInWithPassword(credentials)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
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
    redirect('/error')
  }

  console.log(data)

  const additonalCredentials = { //after the user is signed up store the additional info in the users table
    id: data.user.id,
    name: formData.get('name'),
    address: formData.get('address'),
    phone_number: formData.get('phoneNumber'),
  }

  const { error: insertError } = await supabase.from('user_details').insert(additonalCredentials)

  if (insertError) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function logout() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.log(error);
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}
  
