import * as constants from "../constants.jsx";
import { useState } from "react";
import { useOutletContext } from "react-router";
import { useNavigate } from "react-router-dom";

function Login() {
  const [loginUsername, setLoginUsername] = useState("");
  const [password, setPassword] = useState("");

  const { setUserToken, setUsername } = useOutletContext();
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: loginUsername, password: password }),
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const data = await response.json();
      localStorage.setItem(constants.LOCAL_STORAGE_USER_TOKEN, data.token);
      localStorage.setItem(constants.LOCAL_STORAGE_USERNAME, data.username);
      setUserToken(data.token);
      setUsername(data.username);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <form onSubmit={(event) => handleLogin(event)}>
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
    </div>
  );
}

export default Login;
