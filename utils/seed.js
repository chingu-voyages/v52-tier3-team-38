import { faker } from "@faker-js/faker"
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv'
dotenv.config();

const createFakeUser = () => {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    role: 0,
    password: faker.internet.password(),
    address: faker.location.streetAddress(), //will need to handle for LA
    phone_number: faker.phone.number()
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

  const users = generateFakeUsers(10);

  const response = await supabase.from('users').insert(users);

  if (response.error) {
    console.log(error);
  }

  const res = await supabase.from('users').select('*');

  console.log(res.data);
}

seed();