import * as constants from "../constants.jsx";
import { StatusCodes } from "http-status-codes";
import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router";
import { useNavigate } from "react-router-dom";

function AuthForm() {
  const [loginUsername, setLoginUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authResult, setAuthResult] = useState("");

  const { setUserToken, setUsername } = useOutletContext();
  const navigate = useNavigate();

  const isLoginMode = location.pathname === "/login";
  useEffect(() => {
    setLoginUsername("");
    setPassword("");
    setAuthResult("");
  }, [isLoginMode]);

  const apiUrl = `${import.meta.env.VITE_API_URL}/api${
    isLoginMode ? "/login" : "/user"
  }`;

  const handleUsernameChange = async (event) => {
    const inputUsername = event.target.value;
    setLoginUsername(inputUsername);
    if (!isLoginMode && inputUsername.length > 0) {
      const response = await fetch(`${apiUrl}/username/${inputUsername}`);

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const data = await response.json();
      const input = event.target;
      if (data.isAvailable) {
        input.setCustomValidity("");
      } else {
        input.setCustomValidity("Username is not available");
      }
    }
  };

  const handleAuthorisation = async (event) => {
    event.preventDefault();
    try {
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
      localStorage.setItem(constants.LOCAL_STORAGE_USER_TOKEN, data.token);
      localStorage.setItem(constants.LOCAL_STORAGE_USERNAME, data.username);
      setUserToken(data.token);
      setUsername(data.username);
      setAuthResult("");
      navigate("/", { replace: true });
    } catch (error) {
      setAuthResult("Something went wrong");
      console.error(error);
    }
  };

  return (
    <div className="login">
      <Link to="/">
        <h1>Ckylogs</h1>
      </Link>
      <h2>{isLoginMode ? "Login" : "Sign Up"}</h2>
      <form onSubmit={(event) => handleAuthorisation(event)}>
        <input
          type="text"
          name="username"
          aria-label="username"
          placeholder="Username"
          required
          value={loginUsername}
          onChange={(event) => handleUsernameChange(event)}
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
        <button type="submit">{isLoginMode ? "Login" : "Sign Up"}</button>
      </form>
      <div>{authResult}</div>
      {isLoginMode ? (
        <span>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </span>
      ) : (
        <span>
          Already have an account? <Link to="/login">Login</Link>
        </span>
      )}
    </div>
  );
}

export default AuthForm;
