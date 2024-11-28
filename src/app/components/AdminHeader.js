"use client";

import { Button } from "react-bootstrap"
import { logout } from "../../../utils/supabase/actions";

const AdminHeader = () => {

  return (
    <>
    <div>Header</div>
    <h1>Solarize</h1>
    <h3>Logged in as admin!</h3>
    <Button variant="danger" onClick={() => logout()}>Log Out</Button>
    </>
  )
}

export default AdminHeader