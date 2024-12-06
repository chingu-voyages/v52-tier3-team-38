"use client";

import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { signup } from "../../../utils/supabase/actions";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    phoneNumber: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const response = await signup(formData);

    if (response.error) {
      setError(response.error.message || "An error occurred. Please try again.");
    }

    setLoading(false);
  };

  const handlePassword = () => {
    // Placeholder for password reset logic
  };

  return (
    <div className="sign-up__wrapper">
      {/* Overlay */}
      <div className="sign-in__backdrop"></div>
      {/* Form */}
      <Form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>
        {/* Header */}
        <div className="h4 mb-2 text-center">Sign Up</div>
        {/* Alert */}
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
        {/* Form Fields */}
        {["name", "email", "password", "address", "phoneNumber"].map((field, index) => (
          <Form.Group className="mb-2" controlId={field} key={index}>
            <Form.Label>{field.charAt(0).toUpperCase() + field.slice(1)}</Form.Label>
            <Form.Control
              type={field === "password" ? "password" : field === "email" ? "email" : "text"}
              name={field}
              value={formData[field]}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              onChange={handleChange}
              required
              {...(field === "phoneNumber" && {
                pattern: "[0-9]{3}-[0-9]{3}-[0-9]{4}",
                title: "Phone number must be in the format 123-456-7890",
              })}
            />
          </Form.Group>
        ))}
        <Form.Group className="mb-2" controlId="checkbox">
          <Form.Check type="checkbox" label="Remember me" />
        </Form.Group>
        {/* Submit Button */}
        {!loading ? (
          <Button className="w-100" variant="primary" type="submit">
            Sign Up
          </Button>
        ) : (
          <Button className="w-100" variant="primary" type="submit" disabled>
            Signing Up...
          </Button>
        )}
        <div className="d-grid justify-content-end">
          <Button className="text-muted px-0" variant="link" onClick={handlePassword}>
            Forgot password?
          </Button>
        </div>
      </Form>
      {/* Footer */}
      <div className="w-100 mb-2 position-absolute bottom-0 start-50 translate-middle-x text-white text-center">
        Made by Hendrik C | &copy;2022
      </div>
    </div>
  );
};

export default Signup;





// "use client";

// import React, { useState } from "react";
// import { Form, Button, Alert } from "react-bootstrap";
// import { signup } from "../../../utils/supabase/actions";

// const Signup = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [address, setAddress] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");

//   const [error, setError] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setLoading(true);

//     const formData = new FormData(event.target);
//     formData.append("name", name)
//     formData.append("email", email)
//     formData.append("password", password)
//     formData.append("address", address)
//     formData.append("phoneNumber", phoneNumber)

//     const response = await signup(formData);

//     if (response.error) {
//       setError(true);
//     }

//     setLoading(false);
//   };

//   const handlePassword = () => {}; // Will address later

//   return (
//     <div
//       className="sign-up__wrapper"
//     >
//       {/* Overlay */}
//       <div className="sign-in__backdrop"></div>
//       {/* Form */}
//       <Form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>
//         {/* Header */}
//         <div className="h4 mb-2 text-center">Sign Up</div>
//         {/* ALert */}
//         {error ? (
//           <Alert
//             className="mb-2"
//             variant="danger"
//             onClose={() => setError(false)}
//             dismissible
//           >
//             An error occured, please try again.
//           </Alert>
//         ) : (
//           <div />
//         )}

//         <Form.Group className="mb-2" controlId="name">
//           <Form.Label>Name</Form.Label>
//           <Form.Control
//             type="text"
//             value={name}
//             placeholder="Name"
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//         </Form.Group>

//         <Form.Group className="mb-2" controlId="email">
//         <Form.Label>Email</Form.Label>
//           <Form.Control
//             type="email"
//             value={email}
//             placeholder="Email"
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </Form.Group>

//         <Form.Group className="mb-2" controlId="password">
//           <Form.Label>Password</Form.Label>
//           <Form.Control
//             type="password"
//             value={password}
//             placeholder="Password"
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </Form.Group>

//         <Form.Group className="mb-2" controlId="Address">
//           <Form.Label>Address</Form.Label>
//           <Form.Control
//             type="text"
//             value={address}
//             placeholder="Address"
//             onChange={(e) => setAddress(e.target.value)}
//             required
//           />
//         </Form.Group>

//         <Form.Group className="mb-2" controlId="phoneNumber">
//           <Form.Label>Phone Number</Form.Label>
//           <Form.Control
//             type="tel"
//             value={phoneNumber}
//             placeholder="Phone Number ex: 123-456-789"
//             onChange={(e) => setPhoneNumber(e.target.value)}
//             required
//             pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
//             title="Phone number must be in the format 123-456-7890"
//           />
//         </Form.Group>

//         <Form.Group className="mb-2" controlId="checkbox">
//           <Form.Check type="checkbox" label="Remember me" />
//         </Form.Group>
//         {!loading ? (
//           <Button className="w-100" variant="primary" type="submit">
//             Log In
//           </Button>
//         ) : (
//           <Button className="w-100" variant="primary" type="submit" disabled>
//             Logging In...
//           </Button>
//         )}
//         <div className="d-grid justify-content-end">
//           <Button
//             className="text-muted px-0"
//             variant="link"
//             onClick={handlePassword}
//           >
//             Forgot password?
//           </Button>
//         </div>
//       </Form>
//       {/* Footer */}
//       <div className="w-100 mb-2 position-absolute bottom-0 start-50 translate-middle-x text-white text-center">
//         Made by Hendrik C | &copy;2022
//       </div>
//     </div>
//   );
// };
// export default Signup;