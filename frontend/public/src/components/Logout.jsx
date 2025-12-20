import * as constants from "../constants.jsx";
import { useNavigate, useOutletContext } from "react-router";

function Logout() {
  const navigate = useNavigate();
  const { setUserToken, setUsername } = useOutletContext();

  const handleLogout = () => {
    localStorage.removeItem(constants.LOCAL_STORAGE_USER_TOKEN);
    localStorage.removeItem(constants.LOCAL_STORAGE_USERNAME);
    setUserToken(null);
    setUsername(null);
    navigate("/login", { replace: true });
  };

  return <button onClick={handleLogout}>Logout</button>;
}

export default Logout;
