import styles from "../styles/Login.module.css";
import * as constants from "../constants.jsx";
import { StatusCodes } from "http-status-codes";
import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router";
import { useNavigate } from "react-router-dom";

function Login() {
  const [loginUsername, setLoginUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authResult, setAuthResult] = useState("");

  const { setUserToken, setUsername, setUserId } = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    setLoginUsername("");
    setPassword("");
    setAuthResult("");
  }, []);

  const handleAuthorisation = async (event) => {
    event.preventDefault();
    try {
      const apiUrl = `${import.meta.env.VITE_API_URL}/api/login`;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: loginUsername, password: password }),
      });

      if (response.status === StatusCodes.UNAUTHORIZED) {
        setAuthResult("Username or password is incorrect");
        return;
      }

      if (!response.ok) {
        setAuthResult("Authorisation failed");
        throw new Error(`Response status: ${response.status}`);
      }

      const data = await response.json();

      if (!data.isAuthor) {
        setAuthResult("You must be a Ckylogs author to access this website");
        return;
      }

      localStorage.setItem(constants.LOCAL_STORAGE_USER_TOKEN, data.token);
      localStorage.setItem(constants.LOCAL_STORAGE_USERNAME, data.username);
      localStorage.setItem(constants.LOCAL_STORAGE_USER_ID, data.userId);
      setUserToken(data.token);
      setUsername(data.username);
      setUserId(data.userId);
      setAuthResult("");
      navigate("/", { replace: true });
    } catch (error) {
      setAuthResult("Something went wrong");
      console.error(error);
    }
  };

  return (
    <div className={styles.page}>
      <Link to="/">
        <h1>Ckylogs | Editor</h1>
      </Link>
      <form
        className={styles.form}
        onSubmit={(event) => handleAuthorisation(event)}
      >
        <input
          type="text"
          name="username"
          aria-label="username"
          placeholder="Username"
          required
          value={loginUsername}
          onChange={(event) => setLoginUsername(event.target.value)}
        ></input>
        <input
          type="password"
          name="password"
          aria-label="password"
          placeholder="Password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        ></input>
        <button type="submit">Login</button>
      </form>
      <div>{authResult}</div>
    </div>
  );
}

export default Login;
