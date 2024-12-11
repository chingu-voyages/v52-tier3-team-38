'use client'

import React from "react"
import { useRouter } from "next/navigation"

const MarkVisitedButton = ({appointmentId}) => {
  const router = useRouter();

  const updateAppointment = async(status, appointmentId) => {
    const response = await fetch('/api/appointments', {
      method: "PUT",
      body: JSON.stringify({status, appointmentId})
    })

    if (response.error) {
      console.log(response.error)
    }

    router.refresh();
  }

  return (
      <button
        className="btn btn-success mt-2" onClick={() => updateAppointment("visited", appointmentId)}
      >
        Mark as Visited
      </button>
  )
}

export default MarkVisitedButton;