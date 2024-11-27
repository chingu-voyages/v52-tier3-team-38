import { NextResponse } from 'next/server'
import dbConnect from '../../../../../utils/dbConnect';
import User from '../../../../../models/User';

export const POST = async(req) => { //needs be rewritten to handle transition to supabase
  try {
    await dbConnect();

    const body = await req.json();

    const userExists = await User.find({email: body.email});

    if (userExists.length > 0) return NextResponse.json({error: "User with this email already exists"}, {status: 409});

    const user = await User.create({
      name: body.name,
      email: body.email,
      address: body.address,
      phoneNumber: body.phoneNumber,
      role: body.role ? body.role : 0
    })

    return NextResponse.json({message: `${user.name} has been registered successfully`}, user, {status: 201});

  } catch (err) {
    return NextResponse.json({error: err});
  }
}