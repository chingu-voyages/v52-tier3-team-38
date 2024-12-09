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

  const cancelHandler = async (appointmentId) => {
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

      setAppointments(appointments.map(app =>
        app.id === appointmentId
          ? { ...app, status: "Cancelled" }
          : app
      ));
    } catch (err) {
      setError(err.message);
    }
  };

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
      {appointments.map((appointment) => (
        <Card key={appointment.id} className="mb-3">
          <Card.Body>
            <Card.Title>Appointment on {appointment.date}</Card.Title>
            <Card.Text>Status: {appointment.status}</Card.Text>
            {appointment.status !== 'Cancelled' && (
              <Button
                variant="danger"
                onClick={() => cancelHandler(appointment.id)}
              >
                Cancel Appointment
              </Button>
            )}
          </Card.Body>
        </Card>
      ))}
      {appointments.length === 0 && (
        <p>No appointments found.</p>
      )}
    </Container>
  );
};

export default UserPage;