"use client"

import React from "react";
import { useRouter, useSearchParams } from 'next/navigation';

const PaginationControls = ({ hasNextPage, hasPrevPage, totalAppointments }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams.get('page') || '1';
  const per_page = searchParams.get('per_page') || '2';

  const pathName = `/admin/appointments/listView`;

  return (
    <div className="d-flex gap-2 align-items-center">
      <button 
        className="btn btn-primary" 
        disabled={!hasPrevPage} 
        onClick={() => {
          router.push(`${pathName}/?page=${Number(page) - 1}&per_page=${per_page}`);
        }}
      >
        Prev Page
      </button>

      <div>{page} / {Math.ceil(totalAppointments / Number(per_page))}</div>

      <button 
        className="btn btn-primary" 
        disabled={!hasNextPage} 
        onClick={() => router.push(`${pathName}?page=${Number(page) + 1}&per_page=${per_page}`)}
      >
        Next Page
      </button>
    </div>
  );
};

export default PaginationControls;
