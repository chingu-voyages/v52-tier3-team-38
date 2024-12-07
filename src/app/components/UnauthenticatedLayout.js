import UnauthHeader from "./UnauthHeader";
import UnauthNavbar from "./UnauthNavbar";
import { useSelector } from "react-redux";

const UnauthenticatedLayout = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <main>
        <UnauthHeader />
        {children}
        <UnauthNavbar />
    </main>
  );
}

export default UnauthenticatedLayout