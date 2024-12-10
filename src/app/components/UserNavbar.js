import { useParams } from "next/navigation"
import Link from "next/link"
import { Nav } from "react-bootstrap";
import { FaGithub } from "react-icons/fa";

const UserNavbar = () => {
  const { _id } = useParams();

  return (
    <Nav fill variant="pills" defaultActiveKey={"/user/_id/profile"}>
    <div>Navbar</div>
    <Nav.Item>
      <Nav.Link href={`/user/${_id}/profile`}>Profile</Nav.Link>
    </Nav.Item>
    <Nav.Item>
    <Nav.Link href={`/user/${_id}/submit-request`}>Submit Request</Nav.Link>
    </Nav.Item>
    <Nav.Item>
    <Nav.Link href={`/user/${_id}/service-history`}>Service History</Nav.Link>
    </Nav.Item>
    <Nav.Item>
    <Nav.Link href="/about">About Us</Nav.Link>
    </Nav.Item>
    <Link href="https://github.com/chingu-voyages/v52-tier3-team-38" target="_blank">
    <FaGithub />
    </Link>
    </Nav>
  );
};

export default UserNavbar;