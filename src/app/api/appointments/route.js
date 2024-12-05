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

