import { NextResponse } from "next/server"
import { createClient } from "../../../../../../utils/supabase/server";

export const POST = async(request, { params }) => {
  try {
    const supabase = await createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
    const body = await request.json();
    const { userId } = await params;

    const alreadyHasAppointment = await supabase.from("appointments").select("*").eq("resident_id", userId)

    if (alreadyHasAppointment.data.length > 0) return NextResponse.json({error: `Error: You already have an appointment booked.`}, {status: 403});

    //Make sure the address is valid
    const addressInfo = body.address.split(" ");
    const addressNumber = addressInfo[0]
    const addressName = addressInfo[1]

    const checkAddress = await fetch(`https://data.lacity.org/resource/4ca8-mxuh.json?$query=SELECT%20%60hse_nbr%60,%20%60str_nm%60,%20%60str_sfx_cd%60,%20%60zip_cd%60,%20%60lat%60,%20%60lon%60%20WHERE%20%60hse_nbr%60=${addressNumber}%20AND%20LOWER(%60str_nm%60)=LOWER('${addressName}')%20LIMIT%2010`);
    const validAddress = await checkAddress.json();


    if (validAddress.length === 0) {
      return NextResponse.json({error: "The address submitted is not a valid address in LA. Please try again."}, {status:404})
    }

    const { data: user, error } = await supabase.from("user_details").select("*").eq("id", userId).single();

    if (error) return NextResponse.json({error: "A user with this id does not exist "}, {status: 404});

    // if (user.role === 1) return NextResponse.json({error: "Admins cannot book appointments."}, {status: 403});

    const appointmentInsertInfo = await supabase.from('appointments').insert({
      resident_id: userId,
      timeslot: body.timeslot,
      address:  body.address,
      email: user.email,
      // include coordinates into database
    })

    return NextResponse.json({ message: `Appointment for ${user.name} sucessfully created`, appointmentInsertInfo }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 400 });
  }
}