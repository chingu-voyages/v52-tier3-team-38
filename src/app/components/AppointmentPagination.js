import React from 'react'
import PaginationControls from './PaginationControls'

const AppointmentPagination = ({searchParams, appointments}) => {
  const page = searchParams['page'] || '1'
  const per_page = searchParams['per_page'] || '2'

  const start = (Number(page) - 1) * Number(per_page);
  const end = start + Number(per_page);

  const appointmentsPerPage = appointments.slice(start, end)

  return (
    <div className="card-container">
    {appointments && appointments.length > 0 ? (
      appointmentsPerPage.map((appointment) => (
        <div className="appointment-card" key={appointment.id}>
          <h3>{appointment.name}</h3>
          <p><strong>Time Slot:</strong> {appointment.timeslot}</p>
          <p><strong>Status:</strong> {appointment.status}</p>
          <p><strong>Phone:</strong> {appointment.phone_number}</p>
        </div>
      ))
    ) : (
      <div className="no-appointments">No appointments scheduled at the moment.</div>
    )}

    <PaginationControls/>
  </div>
  )

}

export default AppointmentPagination;