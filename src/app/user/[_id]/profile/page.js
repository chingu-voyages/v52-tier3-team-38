"use client";

import { useState, useEffect } from "react";
import { Card, Button, Container } from "react-bootstrap";
import { createClient } from "../../../../../utils/supabase/client";

const UserPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserAndAppointments = async () => {
      try {
        const supabase = createClient();

        // Get user session
        const { data: { user: currentUser } } = await supabase.auth.getUser();
        setUser(currentUser);

        // Fetch appointments
        const response = await fetch("/api/appointments");
        const data = await response.json();

        if (!data.success) {
          throw new Error(data.error || "Failed to fetch appointments");
        }

        setAppointments(data.appointments || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndAppointments();
  }, []);

  const handleCancel = async (appointmentId) => {
    try {
      const response = await fetch("/api/appointments", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          appointmentId: appointmentId,
          status: "Cancelled"
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Failed to cancel appointment");
      }

      // Update the appointment in the local state
      setAppointments(appointments.map(app => 
        app.id === appointmentId 
          ? { ...app, status: "Cancelled" }
          : app
      ));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <Container>
        <div>{error}</div>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </Container>
    );
  }

  return (
    <Container>
      {user && (
        <Card>
          <Card.Header>User Profile</Card.Header>
          <Card.Body>
            <div>Name: {user.user_metadata?.name}</div>
            <div>Email: {user.email}</div>
          </Card.Body>
        </Card>
      )}

      <h2>Your Installation Requests</h2>

      {appointments.length === 0 ? (
        <Card>
          <Card.Body>
            No installation requests found.
          </Card.Body>
        </Card>
      ) : (
        appointments.map((appointment) => (
          <Card key={appointment.id}>
            <Card.Header>Request Details</Card.Header>
            <Card.Body>
              <div>Installation Address: {appointment.address}</div>
              <div>Appointment Time: {new Date(appointment.timeslot).toLocaleString()}</div>
              <div>Status: {appointment.status}</div>

              {appointment.status === "pending" && (
                <Button
                  variant="danger"
                  onClick={() => handleCancel(appointment.id)}
                >
                  Cancel Installation
                </Button>
              )}
            </Card.Body>
          </Card>
        ))
      )}
    </Container>
  );
};

export default UserPage;