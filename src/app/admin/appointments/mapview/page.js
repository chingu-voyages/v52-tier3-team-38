import AppointmentMapView from "@/app/components/AppointmentMapView"
import SwitchViewButton from "@/app/components/SwitchViewButton";

const MapView = () => {
  return (
    <>
     <AppointmentMapView/>
     <SwitchViewButton view={"listView"}/>
    </>
   
  )
}

export default Appointments;