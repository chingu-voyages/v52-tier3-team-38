import { redirect } from "next/navigation"
import { getUserDetails } from "../../../utils/supabase/getUserDetails"

import { createClient } from "../../../utils/supabase/server"

export default async function PrivatePage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data.user) {
    redirect('/login')
  }

  const userDetails = await getUserDetails(data.user.id);

  console.log(userDetails)
  console.log(data)

  return (
    <>
      <p>Hello {data.user.email}</p>
      <p>{userDetails.name}</p>
      <p>{userDetails.address}</p>
      <p>{userDetails.phone_number}</p>
    </>
  )
}