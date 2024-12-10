import AppointmentMapView from "@/app/components/AppointmentMapView"
import SwitchViewButton from "@/app/components/SwitchViewButton";
import { createClient } from "../../../../../utils/supabase/server";

const MapView = async () => {
  const supabase = await createClient();
  const {data: appointments, error } = await supabase.from("appointments").select("*");
  return (
    <>
     <AppointmentMapView appointments={appointments}/>
     <SwitchViewButton view={"listView"}/>
    </>
   
  )
}

export default MapView;