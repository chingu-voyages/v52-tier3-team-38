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

        // Get user session - using same pattern as navbar
        const { data: { user: currentUser } } = await supabase.auth.getUser();
        if (!currentUser) {
          router.push("/login");
          return;
        }
        setUser(currentUser);

        // Fetch appointments (filtered by user.id in the API)
        const response = await fetch("/api/appointments");
        const data = await response.json();

        if (!data.success) {
          throw new Error(data.error || "Failed to fetch appointments");
        }

        // Filter appointments for this user
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

  if (!user) {
    return null; // Don't render until we have user, just like navbar
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
};

  export default UserPage;