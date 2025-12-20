import * as constants from "../constants.jsx";
import logoutIcon from "../assets/logout.svg";
import styles from "../styles/Logout.module.css";
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

  return (
    <button className={styles.button} onClick={handleLogout}>
      <img className={styles.icon} src={logoutIcon} />
    </button>
  );
}

export default Logout;
