"use client"
import React, { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";

const AppointmentForm = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async(event) => {
    event.preventDefault();

    const timeslot = `${date} ${time}:00`
    const userId = "dd110356-aa0e-45a6-9626-a7107ff75eed" // this is a hardcoded value and is only temporary. The idea here in the future is to get the id of the user from the url that was passed down when reaching this page.
    try {
      const response = await fetch(`/api/user/${userId}/bookAppointment`, {
        method: "POST",
        body: JSON.stringify({timeslot, address})
      })

      const data = await response.json()

      console.log(data)

      if (data.error) {
        setErrorMessage(data.error)
        setError(true)
      } 

      else if (data.appointmentInsertInfo.status == 201) {
        setSuccess(true)
      }

    } catch (err) {
      console.log(err)
    }
  };

  return (
    <Container>
      <h2 className="text-center mt-4">Appointment Form</h2>
      { success ? <Alert
            className="mb-2"
            variant="success"
            onClose={() => setSuccess(false)}
            dismissible
          >
            Your request has been submitted. We will email you if your appointment has been confirmed.
          </Alert> : "" }
      
      { error ? <Alert
            className="mb-2"
            variant="danger"
            onClose={() => setError(false)}
            dismissible
          >
            {errorMessage}
          </Alert> : "" }
        
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
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="timeSlot">
          <Form.Label>Appointment Time</Form.Label>
          <Form.Control
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
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