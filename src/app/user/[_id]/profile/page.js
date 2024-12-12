"use client";

import { useState, useEffect } from "react";
import { Card, Button, Container } from "react-bootstrap";
import { createClient } from "../../../../../utils/supabase/client";
import { useRouter } from "next/navigation";

const UserPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserAndAppointments = async () => {
      try {
        const supabase = createClient();
        const { data: { user: currentUser } } = await supabase.auth.getUser();

        if (!currentUser) {
          router.push("/login");
          return;
        }
        setUser(currentUser);

        const response = await fetch("/api/appointments");
        const data = await response.json();

        if (!data.success) {
          throw new Error(data.error || "Failed to fetch appointments");
        }

        const userAppointments = data.appointments.filter(
          app => app.resident_id === currentUser.id
        );

        setAppointments(userAppointments || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndAppointments();
  }, [router]);

  if (!user) {
    return null;
  }

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
            </Card.Body>
          </Card>
        ))
      )}
    </Container>
  );
};

export default UserPage;