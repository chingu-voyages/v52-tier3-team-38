import UnauthHeader from "./UnauthHeader";
import UnauthNavbar from "./UnauthNavbar";
import { useSelector } from "react-redux";

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