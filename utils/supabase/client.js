import { createBrowserClient } from '@supabase/ssr'
import dotenv from 'dotenv';
dotenv.config();


export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}