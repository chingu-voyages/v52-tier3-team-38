import UnauthHeader from "./UnauthHeader";
import UnauthNavbar from "./UnauthNavbar";

const UnauthenticatedLayout = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

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