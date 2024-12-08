import UserPage from "./user/[_id]/profile/page";
import AdminPage from "./admin/[_id]/profile/page";
import GuestHome from "./GuestHome";

import { createClient } from "../../utils/supabase/server";
import { isAdmin } from "../../utils/supabase/isAdmin";

const Root = async () => {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return <GuestHome/>
  }

  const userIsAdmin = await isAdmin(user.email);

  return userIsAdmin ? <AdminPage /> : <UserPage />
}

export default Root;
