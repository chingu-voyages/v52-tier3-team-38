import MapView from "@/app/components/MapView";
import { createClient } from "../../../../../utils/supabase/server"

const Requests = async() => {
  const supabase = await createClient();
  const {data: appointments, error } = await supabase.from("appointments").select("*");

  console.log(appointments)
  return (
    <MapView/>
  )
}

export default Requests