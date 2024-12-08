"use client";

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useRouter } from 'next/navigation';
import { Container, Table, Badge, Pagination } from 'react-bootstrap';
import { createClient } from '../../../../../utils/supabase/client';

const ITEMS_PER_PAGE = 10;

const Requests = () => {
  const router = useRouter();
  const params = useParams();
  const { user, role, isInitialized } = useSelector((state) => state.auth);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    if (!isInitialized) return;
    if (!user || role !== 'admin' || user.id !== params.id) {
      router.push('/admin/login');
    }
  }, [user, role, isInitialized, params.id, router]);

  const fetchRequests = async (page = 1) => {
    if (!user) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const supabase = createClient();
      
      // Get total count
      const { count, error: countError } = await supabase
        .from('service_requests')
        .select('*', { count: 'exact', head: true });

      if (countError) throw countError;
      setTotalCount(count);

      // Fetch paginated data
      const { data, error } = await supabase
        .from('service_requests')
        .select(`
          *,
          profiles:user_id (
            full_name,
            email,
            phone
          )
        `)
        .range((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE - 1)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRequests(data);

    } catch (err) {
      console.error('Error fetching requests:', err);
      setError('Failed to load service requests');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests(currentPage);
  }, [currentPage, user]);

  const getStatusBadge = (status) => {
    const variants = {
      pending: 'warning',
      confirmed: 'primary',
      completed: 'success',
      cancelled: 'danger'
    };
    return variants[status] || 'secondary';
  };

  const renderPagination = () => {
    const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
    
    return (
      <Pagination className="justify-content-center mt-4">
        <Pagination.Prev 
          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
        />
        
        {[...Array(totalPages)].map((_, idx) => (
          <Pagination.Item
            key={idx + 1}
            active={currentPage === idx + 1}
            onClick={() => setCurrentPage(idx + 1)}
          >
            {idx + 1}
          </Pagination.Item>
        ))}
        
        <Pagination.Next 
          onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
          disabled={currentPage === totalPages}
        />
      </Pagination>
    );
  };

  if (!isInitialized || loading) {
    return (
      <Container className="text-center mt-4">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <h2 className="text-center mt-4">Service Requests</h2>
      
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      
      <div className="mt-4 shadow p-4 bg-white rounded">
        <Table responsive hover>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Contact</th>
              <th>Service Details</th>
              <th>Requested Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {requests.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">
                  No requests found
                </td>
              </tr>
            ) : (
              requests.map((request) => (
                <tr key={request.id}>
                  <td>{request.profiles.full_name}</td>
                  <td>
                    <div>{request.profiles.email}</div>
                    <div>{request.profiles.phone}</div>
                  </td>
                  <td>
                    <div>{request.service_type}</div>
                    <div className="text-muted">{request.address}</div>
                  </td>
                  <td>
                    {new Date(request.preferred_date).toLocaleDateString()}
                    <div className="text-muted">
                      {request.preferred_time}
                    </div>
                  </td>
                  <td>
                    <Badge bg={getStatusBadge(request.status)}>
                      {request.status}
                    </Badge>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>

        {renderPagination()}
      </div>
    </Container>
  );
};

export default Requests;