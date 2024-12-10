import MapView from "@/app/components/MapView";
import { createClient } from "../../../../utils/supabase/server";
import AppointmentListView from "@/app/components/AppointmentListView";

const Requests = async({searchParams}) => {
  const supabase = await createClient();
  const {data: appointments, error } = await supabase.from("appointments").select("*");

  console.log(appointments)
  return (
    <AppointmentListView searchParams={searchParams} appointments={appointments} />
  )
}

export default Requests;