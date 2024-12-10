import React from "react";
import PaginationControls from './PaginationControls'

const AppointmentListView = async({ searchParams, appointments }) => {
    const page = await searchParams['page'] || '1'
    const per_page = await searchParams['per_page'] || '2'
  
    const start = (Number(page) - 1) * Number(per_page);
    const end = start + Number(per_page);
  
    const appointmentsPerPage = appointments.slice(start, end)
  
    return (
      <>
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
        </div>

        <div className="d-flex justify-content-center mt-3">
          <PaginationControls hasNextPage={end < appointments.length} hasPrevPage={start > 0} />
        </div>
      </>
  );
};

export default AppointmentListView;

