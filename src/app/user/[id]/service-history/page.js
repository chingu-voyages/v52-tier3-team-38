"use client";

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useRouter } from 'next/navigation';
import { Container } from 'react-bootstrap';

const ServiceHistory = () => {
  const router = useRouter();
  const params = useParams();
  const { user, isInitialized } = useSelector((state) => state.auth);
  
  useEffect(() => {
    if (!isInitialized) return;
    if (!user || user.id !== params.id) {
      router.push('/');
    }
  }, [user, isInitialized, params.id, router]);

  if (!isInitialized || !user) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <h2 className="text-center mt-4">Service History</h2>
      <div className="mt-4 shadow p-4 bg-white rounded">
        {/* TODO: Implement service history table */}
        <h3>Past Orders</h3>
        <div className="mb-4">
          <h4>Completed Services</h4>
          {/* Add completed services table/list */}
        </div>
        <div>
          <h4>Canceled Services</h4>
          {/* Add canceled services table/list */}
        </div>
      </div>
    </Container>
  );
};

export default ServiceHistory;