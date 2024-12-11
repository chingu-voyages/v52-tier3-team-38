import React from "react";
import PaginationControls from './PaginationControls'
import MarkVisitedButton from "./MarkVisitedButton";

const AppointmentListView = async({ searchParams, appointments }) => {
    const search = await searchParams;
  
    const page = search["page"] || '1'
    const per_page = search["per_page"] || '2'
  
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
                <p><strong>Date: </strong>{new Date(appointment.timeslot).toDateString()}</p>
                <p><strong>Time: </strong>{new Date(appointment.timeslot).toTimeString()}</p>
                <p><strong>Status: </strong> {appointment.status}</p>
                <p><strong>Phone: </strong> {appointment.phone_number}</p>
                <p><strong>Address:</strong> {appointment.address}</p>
                {appointment.status === 'pending' ? (
                <MarkVisitedButton appointmentId={appointment.id}/>
              ) : ""}
              </div>
            ))
          ) : (
          <div className="no-appointments">No appointments scheduled at the moment.</div>
        )}
        </div>

        <div className="d-flex justify-content-center mt-3">
          <PaginationControls hasNextPage={end < appointments.length} hasPrevPage={start > 0} totalAppointments={appointments.length} />
        </div>
      </>
  );
};

export default AppointmentListView;

