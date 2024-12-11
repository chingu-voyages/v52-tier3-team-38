import GuestHome from "./GuestHome";

import { createClient } from "../../utils/supabase/server";
import { isAdmin } from "../../utils/supabase/isAdmin";
import { redirect } from "next/navigation";

const Root = async () => {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return <GuestHome/>
  }

  const userIsAdmin = await isAdmin(user.email);

  userIsAdmin ? redirect(`/admin/requests`) : redirect(`/user/${user.id}/profile`)
}

export default Root;
