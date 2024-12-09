import React from "react";

//Pagination

const AppointmentListView = ({ appointments }) => {
  return (
    <div className="card-container">
      {appointments && appointments.length > 0 ? (
        appointments.map((appointment) => (
          <div className="appointment-card" key={appointment.id}>
            <h3>{appointment.name}</h3>
            <p><strong>Time Slot:</strong> {appointment.timeslot}</p>
            <p><strong>Status:</strong> {appointment.status}</p>
            <p><strong>Phone:</strong> {appointment.phone_number}</p>
          </div>
        ))
      ) : (
        <div className="no-appointments">No appointments available at the moment.</div>
      )}
    </div>
  );
};

export default AppointmentListView;

