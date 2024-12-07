"use client";

import { Button } from "react-bootstrap";
import { useRouter } from "next/navigation";
import Link from "next/link";

const UnauthHeader = () => {
  const router = useRouter();

  return (
    <header className="p-3 bg-light">
      <div className="container d-flex justify-content-between align-items-center">
        <Link href="/" className="text-decoration-none text-dark">
          <h1 className="m-0">Solarize</h1>
        </Link>
        <div className="d-flex align-items-center gap-3">
          <Button variant="primary" onClick={() => router.push("/signup")}>
            Sign Up!
          </Button>
          <div className="d-flex align-items-center gap-2">
            <h3 className="m-0">Have an account?</h3>
            <Button variant="primary" onClick={() => router.push("/login")}>
              Log In
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default UnauthHeader;