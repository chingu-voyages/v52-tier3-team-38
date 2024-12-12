"use client";

import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { signup } from "../../../utils/supabase/actions";
import Link from "next/link";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.target);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);

    const response = await signup(formData);

    if (response.error) {
      setError(true);
    }

    setLoading(false);
  };

  return (
  <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
    <div className="w-100" style={{ maxWidth: "800px" }}>
      <Form className="p-4 bg-white rounded" onSubmit={handleSubmit}>

        <div className="d-flex justify-content-center mb-4">
          <h2>Sign Up</h2>
        </div>

        {error && (
          <div className="d-flex mb-3">
            <Alert className="w-100" variant="danger" onClose={() => setError(false)} dismissible>
              An error occurred, please try again.
            </Alert>
          </div>
        )}

        <div className="d-flex flex-column gap-3">
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
        </div>

        <div className="d-flex gap-2 mt-4">
          <Link href="/" className="w-50">
            <Button className="w-100" variant="danger">
              Cancel
            </Button>
          </Link>
          {!loading ? (
            <Button className="w-50" variant="primary" type="submit">
              Sign Up
            </Button>
          ) : (
            <Button className="w-50" variant="primary" type="submit" disabled>
              Signing Up...
            </Button>
          )}
        </div>
      </Form>
    </div>
  </div>
);
};
export default Signup;
