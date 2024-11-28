import { NextResponse } from "next/server"
import { createClient } from "../../../../../../utils/supabase/server";

export const POST = async(request, { params }) => {
  try {
    const supabase = await createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

    const body = await request.json();

    const { userId } = await params;

    const { data: user, error } = await supabase.from("user_details").select("*").eq("id", userId).single();

    if (error) return NextResponse.json({error: "A user with this id does not exist "}, {status: 404});

    // if (user.role === 1) return NextResponse.json({error: "Admins cannot book appointments."}, {status: 403});

    const alreadyHasAppointment = await supabase.from("appointments").select("*").eq("resident_id", userId)

    if (alreadyHasAppointment.data.length > 0) return NextResponse.json({error: `${user.name} cannot have more than one appointment booked.`}, {status: 403});

    const createdAppointment = await supabase.from('appointments').insert({
      resident_id: userId,
      timeslot: body.timeslot,
      address:  body.address
      //status is not needed here as it is pending by default
    })

    return NextResponse.json({ message: `Appointment for ${user.name} sucessfully created`, createdAppointment }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 400 });
  }
}