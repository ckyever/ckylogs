import * as constants from "../constants.jsx";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem(constants.LOCAL_STORAGE_USER_TOKEN);
    localStorage.removeItem(constants.LOCAL_STORAGE_USERNAME);
    navigate("/login", { replace: true });
  };

  return <button onClick={handleLogout}>Logout</button>;
}

export default Logout;
