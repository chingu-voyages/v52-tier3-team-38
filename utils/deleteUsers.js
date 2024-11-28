import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv'
dotenv.config();

//Purpose of this is to remove either fake or real user data with the id of the user to delete. You can only delete from the auth.users table with the external api.
//This will be converted into an actual rest api route at a later point. This is just a quick work around to not clog up the db in the meantime.
const deleteUsers = async(userIds) => {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL,process.env.SUPABASE_SERVICE_ROLE_KEY);

  await Promise.all(userIds.map( async id => {
    const { data, error } = await supabase.auth.admin.deleteUser(id);

    if (error) {
      console.log(error);
    }

  }));
}

const ids = [] //include id(s) you want to delete here/

deleteUsers(ids)
