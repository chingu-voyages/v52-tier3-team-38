import User from '../models/User.js';
import dbConnect from "./dbConnect.js";
import { faker } from "@faker-js/faker"

const createFakeUser = () => {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    role: 0,
    address: faker.location.streetAddress(), //will need to handle for LA
    phoneNumber: faker.phone.number()
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
  await dbConnect();

  const users = generateFakeUsers(10);

  await User.insertMany(users);
  
  const data = await User.find();
  console.log(data);
}

seed();