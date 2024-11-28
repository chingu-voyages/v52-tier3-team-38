"use client"
import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";

const AppointmentForm = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", { name, address, appointmentDate, timeSlot });
  };

  return (
    <Container>
      <h2 className="text-center mt-4">Appointment Form</h2>
      <Form onSubmit={handleSubmit} className="mt-4 shadow p-4 bg-white rounded">
        
        {/* Can have this autofill to whatever the users name is */}
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name" 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

        {/* Can have this autofill to whatever the users name is */}
        <Form.Group className="mb-3" controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="appointmentDate">
          <Form.Label>Appointment Date</Form.Label>
          <Form.Control
            type="date"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="timeSlot">
          <Form.Label>Appointment Time</Form.Label>
          <Form.Control
            type="time"
            value={timeSlot}
            onChange={(e) => setTimeSlot(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default AppointmentForm;