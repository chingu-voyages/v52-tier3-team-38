"use client";

import { useEffect } from "react";
import { createClient } from "../../../../../utils/supabase/client";
import { useRouter } from "next/navigation";

const ServiceHistory = () => {
   const [loading, setLoading] = useState(true);
  const router = useRouter();

    useEffect(() => {
    const fetchUserAndAppointments = async () => {
      try {
        const supabase = createClient();
        const { data: { user: currentUser } } = await supabase.auth.getUser();

        //If anauthenticated user tries to access this route, they will be redirected to login page.
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

    if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
    <h2>This will be the service history page.</h2>
    <h2>Users can see past orders. Canceled. Completed.</h2>
    </div>
  )
}

export default ServiceHistory;