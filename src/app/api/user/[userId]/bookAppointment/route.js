import { NextResponse } from "next/server"
import Appointment from "../../../../../../models/Appointment";
import User from "../../../../../../models/User";
import dbConnect from "../../../../../../utils/dbConnect";

export const POST = async(request, { params }) => {
  try {
    await dbConnect();

    const body = await request.json();
    const { userId } = await params;

    const user = await User.findById(userId);

    if (!user) return NextResponse.json({error: "A user does not exist with this id."}, {status: 404});

    if (user.role === 1) return NextResponse.json({error: "Admins cannot book appointments."}, {status: 403});

    const alreadyHasAppointment = await Appointment.find({residentId: userId})

    if (alreadyHasAppointment.length > 0) return NextResponse.json({error: `${user.name} cannot have more than one appointment booked.`}, {status: 403});

    const createdAppointment = await Appointment.create({
      residentId: userId,
      timeslot: body.timeslot,
      address:  body.address
      //status is not needed here as it is pending by default
    })

    return NextResponse.json({ message: `Appointment for ${user.name} sucessfully created`, createdAppointment }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 400 });
  }
}