import React from "react"

const AppointmentListView = ({appointments}) => {
  return <>
  {appointments.map(appointment => {
    return (
      <div key={appointment.id}>
        <div>{appointment.name}</div>
        <div>{appointment.timeslot}</div>
        <div>{appointment.status}</div>
        <div>{appointment.phone_number}</div>
      </div>
    )
  })}
  </>
}

export default AppointmentListView;