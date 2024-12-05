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