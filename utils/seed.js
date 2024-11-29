import { faker } from "@faker-js/faker"
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv'
dotenv.config();

const createFakeUser = () => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  const email = `${firstName}.${lastName}@gmail.com`
  return {
    credentials: {
      email: email,
      password: process.env.FAKE_PASSWORD,
    },

    userDetails: {
      name: `${firstName} ${lastName}`,
      address: faker.location.streetAddress(), //will need to handle for LA
      phone_number: faker.phone.number()
      //role is not necessary here as it is 0 by default in the db
    }
  }
};

export const generateFakeUsers = (length) => {
  const users = []

  for (let i = 0; i < length; i++) {
    users.push(createFakeUser());
  }

  return users;
};

export const seed = async() => {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL,process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  const users = generateFakeUsers(5);

  for ( const user of users ) {
    const { credentials, userDetails } = user;
    
    const { data, error } = await supabase.auth.signUp(credentials); // signs up user

    if ( error ) {
      console.log('ERROR: ', error);
      return;
    }

    userDetails["id"] = data.user.id // adds id of created user to userDetails to be stored in user_details table.
    const res = await supabase.from('user_details').insert(userDetails);

    if ( res.error ) {
      console.log('ERROR: ', res.error);
      return;
    }

    console.log(res);
  }
}

seed();