"use client";
import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { signInWithGoogle } from "../../../../utils/supabase/actions";
import { createClient } from "../../../../utils/supabase/client";

const Login = () => {
  const [inputEmail, setInputEmail] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const response = await supabase.from('allowed_admin_emails').select('*').eq('email', email).single();

    if ( response.error ) { // shows if the response failed.
      setError(true);
    }

    await signInWithGoogle();

    setLoading(false);
  };

  return (
      <Button variant="primary" className="d-flex align-items-center" onClick={() => signInWithGoogle()}>
        <img
          src="https://www.gstatic.com/images/branding/product/1x/google_g_32dp.png"
          alt="Google logo"
          style={{ width: '20px', height: '20px', marginRight: '8px' }}
        />
        Sign in with Google
      </Button>
  )
};

export default Login;