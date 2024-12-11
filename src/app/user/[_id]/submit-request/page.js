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
  <div className="d-flex flex-column py-5">
    <div className="w-100" style={{ maxWidth: "800px", margin: "0 auto" }}>

      <div className="d-flex flex-column gap-2 mb-4">
        {success && (
          <Alert variant="success" onClose={() => setSuccess(false)} dismissible>
            Your request has been submitted. We will email you if your appointment has been confirmed.
          </Alert>
        )}
        {error && (
          <Alert variant="danger" onClose={() => setError(false)} dismissible>
            {errorMessage}
          </Alert>
        )}
      </div>

      <Form className="p-4 bg-white rounded" onSubmit={handleSubmit}>

      <div className="d-flex justify-content-center mb-4">
        <h2>Appointment Request</h2>
      </div>


        <div className="d-flex flex-column gap-4">
          <div className="d-flex gap-4 flex-column flex-md-row">
            <Form.Group className="flex-grow-1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                placeholder="Enter your name"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="flex-grow-1">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                value={phoneNumber}
                placeholder="123-456-7890"
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                title="Phone number must be in the format 123-456-7890"
              />
            </Form.Group>
          </div>

          <AddressFormSection address={address} setAddress={setAddress} />

          <div className="d-flex gap-4 flex-column flex-md-row">
            <Form.Group className="flex-grow-1">
              <Form.Label>Appointment Date</Form.Label>
              <Form.Control
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="flex-grow-1">
              <Form.Label>Appointment Time</Form.Label>
              <Form.Control
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </Form.Group>
          </div>
        </div>

        <div className="d-flex gap-2 mt-4">
          <Link href={`/user/${_id}/profile`} className="w-50">
            <Button className="w-100" variant="danger">
              Cancel
            </Button>
          </Link>
          <Button className="w-50" variant="primary" type="submit">
            Submit Request
          </Button>
        </div>
      </Form>
    </div>
  </div>
);
};

export default AppointmentForm;
