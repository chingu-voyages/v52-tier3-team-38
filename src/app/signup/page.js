import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { signup } from "../../../utils/supabase/actions";
import { useDispatch } from "react-redux";
import { setSession } from "../../redux/slices/authSlice";
import { useRouter } from "next/navigation";
import AddressFormSection from "../components/AddressFormSection";

"use client";


const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Create FormData object
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);
      formData.append('name', name);
      formData.append('address', address);
      formData.append('phoneNumber', phoneNumber);

      const { data, error: signupError } = await signup(formData);

      if (signupError) {
        setError(signupError.message || "Signup failed");
        return;
      }

      // If signup is successful and we have session data, update Redux
      if (data?.session) {
        dispatch(setSession({
          user: data.session.user,
          session: data.session
        }));
        // Let the server action handle redirect
      }
    } catch (catchedError) {
      setError(catchedError.message || "An error occurred during signup");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sign-up__wrapper"></div>
      <div className="sign-in__backdrop"></div>
      <Form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>
        <div className="h4 mb-2 text-center">Sign Up</div>

        {error && (
          <Alert
            className="mb-2"
            variant="danger"
            onClose={() => setError(null)}
            dismissible
          >
            {error}
          </Alert>
        )}

        <Form.Group className="mb-2" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-2" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <AddressFormSection address={address} setAddress={setAddress} />

        <Form.Group className="mb-2" controlId="phoneNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="tel"
            value={phoneNumber}
            placeholder="Phone Number ex: 123-456-789"
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            title="Phone number must be in the format 123-456-7890"
          />
        </Form.Group>

        <Form.Group className="mb-2" controlId="checkbox">
          <Form.Check type="checkbox" label="Remember me" />
        </Form.Group>

        <Button
          className="w-100"
          variant="primary"
          type="submit"
          disabled={loading}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </Button>
      </Form>

      <div className="w-100 mb-2 position-absolute bottom-0 start-50 translate-middle-x text-white text-center">
        Made by Hendrik C | &copy;2022
      </div>
    </div>
  );
};

export default Signup;</Form.Group>