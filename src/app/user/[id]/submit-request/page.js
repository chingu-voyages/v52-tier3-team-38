"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { Form, Button, Container, Alert } from "react-bootstrap";
import { useParams, useRouter } from "next/navigation";

const AppointmentForm = () => {
  const router = useRouter();
  const params = useParams();
  const { user, isInitialized } = useSelector((state) => state.auth);
  
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    date: "",
    time: ""
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Auth check
  useEffect(() => {
    if (!isInitialized) return;
    if (!user || user.id !== params.id) {
      router.push('/');
    }
  }, [user, isInitialized, params.id, router]);

  // Auto-fill user data
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || "",
        address: user.address || ""
      }));
    }
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const timeslot = `${formData.date} ${formData.time}:00`;

    try {
      const response = await fetch(`/api/user/${params.id}/bookAppointment`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          timeslot,
          address: formData.address
        })
      });

      const data = await response.json();

      if (data.error) {
        setErrorMessage(data.error);
        setError(true);
      } else if (data.appointmentInsertInfo?.status === 201) {
        setSuccess(true);
        // Reset form after successful submission
        setFormData({
          name: user?.name || "",
          address: user?.address || "",
          date: "",
          time: ""
        });
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("An unexpected error occurred. Please try again.");
      setError(true);
    }
  };

  if (!isInitialized || !user) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <h2 className="text-center mt-4">Appointment Form</h2>
      {success && (
        <Alert
          className="mb-2"
          variant="success"
          onClose={() => setSuccess(false)}
          dismissible
        >
          Your request has been submitted. We will email you if your appointment has been confirmed.
        </Alert>
      )}
      
      {error && (
        <Alert
          className="mb-2"
          variant="danger"
          onClose={() => setError(false)}
          dismissible
        >
          {errorMessage}
        </Alert>
      )}
        
      <Form onSubmit={handleSubmit} className="mt-4 shadow p-4 bg-white rounded">
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name" 
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your address"
            value={formData.address}
            onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="appointmentDate">
          <Form.Label>Appointment Date</Form.Label>
          <Form.Control
            type="date"
            value={formData.date}
            onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="timeSlot">
          <Form.Label>Appointment Time</Form.Label>
          <Form.Control
            type="time"
            value={formData.time}
            onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
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