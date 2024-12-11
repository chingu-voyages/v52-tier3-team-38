"use client"

import React from "react"
import { useRouter } from "next/navigation"

const SwitchViewButton = ({view}) => {
  const router = useRouter();
  return (
    <button onClick={() => router.push(`/admin/appointments/${view}`)}> Switch View </button>
  )
}

export default SwitchViewButton;

// if the button is pressed, switch to the other view.
