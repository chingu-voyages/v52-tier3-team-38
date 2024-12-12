"use client";
import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { login } from "../../../utils/supabase/actions";
import Link from "next/link";

const Login = () => {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.target);
    formData.append("email", inputEmail);
    formData.append("password", inputPassword);

    const response = await login(formData);

    if (response.error) {
      // shows if the response failed.
      setError(true);
    }

    setLoading(false);
  };

  const handlePassword = () => {}; // Will address later

  return (
  <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
    <div className="w-100" style={{ maxWidth: "800px" }}>
      <Form className="p-4 bg-white rounded" onSubmit={handleSubmit}>

        <div className="d-flex justify-content-center mb-4">
          <h2>Sign In</h2>
        </div>

        {error && (
          <div className="d-flex mb-3">
            <Alert className="w-100" variant="danger" onClose={() => setError(false)} dismissible>
              Incorrect username or password. Please try again.
            </Alert>
          </div>
        )}

        <div className="d-flex flex-column gap-3">
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={inputEmail}
              placeholder="Email"
              onChange={(e) => setInputEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={inputPassword}
              placeholder="Password"
              onChange={(e) => setInputPassword(e.target.value)}
              required
            />
          </Form.Group>

          <div className="d-flex justify-content-between align-items-center">
            <Form.Check type="checkbox" label="Remember me" />
          </div>
        </div>

        <div className="d-flex gap-2 mt-4">
          <Link href="/" className="w-50">
            <Button className="w-100" variant="danger">
              Cancel
            </Button>
          </Link>
          {!loading ? (
            <Button className="w-50" variant="primary" type="submit">
              Log In
            </Button>
          ) : (
            <Button className="w-50" variant="primary" type="submit" disabled>
              Logging In...
            </Button>
          )}
        </div>

        <div className="d-flex justify-content-end mt-3">
          <Button variant="link" onClick={handlePassword} className="p-0">
            Forgot password?
          </Button>
        </div>
      </Form>
    </div>
  </div>
);
};

export default Login;
