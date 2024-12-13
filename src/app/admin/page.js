"use client"
import React, {useState} from "react"
import AppointmentListView from "../components/AppointmentListView"
import MapView from "../components/AppointmentMapView"

const Admin = ({searchParams}) => {
  const [view, setView] = useState(true)

  return view ? <AppointmentListView view={view} setView={setView} searchParams={searchParams}/> : <MapView view={view} setView={setView}/>

}

export default Admin;