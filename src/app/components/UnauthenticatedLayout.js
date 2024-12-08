"use client";

import UnauthHeader from "./UnauthHeader";
import UnauthNavbar from "./UnauthNavbar";

const UnauthenticatedLayout = ({ children }) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <UnauthHeader />
      <main className="flex-grow-1">
        {children}
      </main>
      <UnauthNavbar />
    </div>
  );
};

export default UnauthenticatedLayout;