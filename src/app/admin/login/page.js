"use client";
import React, { useState } from "react";
import { Form, Button, Alert, Container } from "react-bootstrap";
import { signInWithGoogle } from "../../../../utils/supabase/actions";
import { createClient } from "../../../../utils/supabase/client";

const Login = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const supabase = await createClient();
    const response = await supabase.from('approved_admin_emails').select('*').eq('email', email).single();

    if ( response.error ) {
      setError(true);
      setErrorMessage("You are not a registered admin")
    }

    else {
      await signInWithGoogle();
    }

    setLoading(false);
  };

  //NEED TO HANDLE STYLING BEFORE PR
  return (
      <Container>
        <h2 className="text-center mt-4">Admin Login</h2> 
        { error ? <Alert
            className="mb-2"
            variant="danger"
            onClose={() => setError(false)}
            dismissible
          >
            {errorMessage}
          </Alert> : "" }
        <Form onSubmit={handleSubmit} className="mt-4 shadow p-4 bg-white rounded"> 
          <Form.Group className="mb-2" controlId="email">
            <Form.Label>email</Form.Label>
            <Form.Control
              type="text"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" className="d-flex align-items-center" type="submit" disabled={loading}>
          {loading === true ? 'Loading...' : 'Sign in with Google'}
          </Button>
        </Form>
      </Container>
      
  )
};

export default Login;