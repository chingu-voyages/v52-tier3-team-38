"use client";
import React, { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { useParams } from "next/navigation";
import AddressFormSection from "@/app/components/AddressFormSection";
import Link from "next/link";

const AppointmentForm = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { _id } = useParams();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const timeslot = `${date} ${time}:00`;
    try {
      const response = await fetch(`/api/user/${_id}/bookAppointment`, {
        method: "POST",
        body: JSON.stringify({ timeslot, address, phoneNumber, name }),
      });

      const data = await response.json();

      if (data.error) {
        setErrorMessage(data.error);
        setError(true);
      } else if (data.appointmentInsertInfo.status == 201) {
        console.log(data);
        setSuccess(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <h2 className="text-center mt-4">Appointment Form</h2>
      {success ? (
        <Alert
          className="mb-2"
          variant="success"
          onClose={() => setSuccess(false)}
          dismissible
        >
          Your request has been submitted. We will email you if your appointment
          has been confirmed.
        </Alert>
      ) : (
        ""
      )}

      {error ? (
        <Alert
          className="mb-2"
          variant="danger"
          onClose={() => setError(false)}
          dismissible
        >
          {errorMessage}
        </Alert>
      ) : (
        ""
      )}

      <Form
        onSubmit={handleSubmit}
        className="mt-4 shadow p-4 bg-white rounded"
      >
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

        <AddressFormSection address={address} setAddress={setAddress} />

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

        <Form.Group className="mb-2" controlId="phoneNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="tel"
            value={phoneNumber}
            placeholder="Phone Number ex: 123-456-789"
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            title="Phone number must be in the format 123-456-7890"
          />
        </Form.Group>
        <div className="d-flex gap-2">
        <Link href={`/user/${_id}/profile`}  className="w-50">
          <Button className="w-50" variant="danger">
            Cancel
          </Button>
        </Link>
          <Button className="w-50" variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default AppointmentForm;
