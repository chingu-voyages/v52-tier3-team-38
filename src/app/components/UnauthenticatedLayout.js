import UnauthHeader from "./UnauthHeader";
import UnauthNavbar from "./UnauthNavbar";

const UnauthenticatedLayout = () => {
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