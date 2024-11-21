import dotenv from 'dotenv';
dotenv.config();

import mongoose from "mongoose";

const connection = {};

async function dbConnect() {
  if (connection.isConnected) {
    return;
  }

  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI environment variable is not set.');
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Mongodb connected")
    
  } catch(error) {
    console.log(error)
  }
}

export default dbConnect;