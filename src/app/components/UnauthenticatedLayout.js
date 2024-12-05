import UnauthHeader from "./UnauthHeader";
import UnauthNavbar from "./UnauthNavbar";

const UnauthenticatedLayout = ({ children }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <UnauthHeader />
        {children}
        <UnauthNavbar />
      </body>
    </html>
  );
}

export default UnauthenticatedLayout