import { NextResponse } from "next/server";
import { createClient } from "../../../../utils/supabase/server";

export const GET = async() => {
  try {
    const supabase = await createClient();

    const { data } = await supabase.from("appointments").select("*");

    return NextResponse.json({success: true, appointments: data}, {status: 200});
  } catch (err) {
    return NextResponse.json({error})
  }
}

export const DELETE = async(request) => { //handle cancelled appointments
    const supabase = await createClient();

    const body = await request.json(); 
    const { id } = body

    const response = await supabase.from("appointments").delete("*").eq("resident_id", id);

    if (response.status != 204) {
      return NextResponse.json({error: response.error})
    }

    return NextResponse.json({success: true, message: 'Appointment was successfully deleted'}, {status: 200});

}


export const PUT = async(request) => { //Looking to make this useful for both users updating info and admins updating status
  const supabase = await createClient();

  const body = await request.json(); 
  const { appointmentId } = body;

  console.log(appointmentId)

  const { data: appointment, error} = await supabase.from('appointments').select("*").eq("id", appointmentId).single()

  if (error) {
    return NextResponse.json({error}, {status: 404})
  }

  const appointmentBody = {
      timeslot: body.timeSlot ? body.timeSlot: appointment.timeSlot,
      address:  body.address ? body.address : appointment.address,
      email: body.email ? body.email : appointment.email,
      status: body.status ? body.status : appointment.status
  }

  const response = await supabase.from('appointments').update(appointmentBody).eq("id", appointmentId).select("*")

  if (response.error) {
    return NextResponse.json({error: response.error}, {status: 400})
  }

  return NextResponse.json({success: true, message: "Appointment successfully updated", appointment: response.data})
}
