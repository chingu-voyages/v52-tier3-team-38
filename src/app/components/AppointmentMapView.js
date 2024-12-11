"use client"
import React, { useState } from 'react';

import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api'

const containerStyle = {
  width: '100%',
  height: '70vh',
}

const center = { //I am assuming it should be city hall in LA
  lat: 34.0522,
  lng: -118.2437
}

const AppointmentMapView = ({appointments}) => {
  const [selectedAppointment, setSelectedAppointment] = useState("");
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  })

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={11}
    >
      {appointments.map((appointment) => (
        appointment.status === 'pending' ?
        <Marker
          key={appointment.id} // Use the appointment's unique ID
          position={{ lat: appointment.lat, lng: appointment.lon }}
          onClick={() => setSelectedAppointment(appointment)} // Set the selected appointment
        /> : null
      ))}

      {selectedAppointment && (
        <InfoWindow
          position={{ lat: selectedAppointment.lat, lng: selectedAppointment.lon }}
          onCloseClick={() => setSelectedAppointment(null)}
        >
          <div className="appointment-card">
            <h3>{selectedAppointment.name}</h3>
            <p><strong>Date: </strong>{new Date(selectedAppointment.timeslot).toDateString()}</p>
            <p><strong>Time: </strong>{new Date(selectedAppointment.timeslot).toTimeString()}</p>
            <p><strong>Status: </strong>{selectedAppointment.status}</p>
            <p><strong>Phone: </strong>{selectedAppointment.phone_number}</p>
            <p><strong>Address: </strong>{selectedAppointment.address}</p>
          </div>
        </InfoWindow>
      )}
      <></>
    </GoogleMap>
  ) : (
    <></>
  )
}

export default AppointmentMapView;