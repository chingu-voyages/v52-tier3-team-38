import AppointmentListView from "@/app/components/AppointmentListView";
import SwitchViewButton from "@/app/components/SwitchViewButton";
import { createClient } from "../../../../../utils/supabase/server";


const ListView = async ({searchParams}) => {
  const supabase = await createClient();
  const {data: appointments, error } = await supabase.from("appointments").select("*");
  return (
    <>
      <AppointmentListView searchParams={searchParams} appointments={appointments}/>
      <SwitchViewButton view={"mapView"}/>
    </>
  )
}

export default ListView;