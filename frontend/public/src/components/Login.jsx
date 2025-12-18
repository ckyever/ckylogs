import * as constants from "../constants.jsx";
import { useState } from "react";
import { Link, useOutletContext } from "react-router";
import { useNavigate } from "react-router-dom";

function Login() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [loginUsername, setLoginUsername] = useState("");
  const [password, setPassword] = useState("");

  const { setUserToken, setUsername } = useOutletContext();
  const navigate = useNavigate();

  const endPoint = isLoginMode ? "/login" : "/user";

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api${endPoint}`, {
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
      navigate("/", { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login">
      <Link to="/">Ckylogs</Link>
      <h1>{isLoginMode ? "Login" : "Sign Up"}</h1>
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
        <button type="submit">{isLoginMode ? "Login" : "Sign Up"}</button>
      </form>
      {isLoginMode ? (
        <span>
          Don't have an account?{" "}
          <button onClick={() => setIsLoginMode(false)}>Sign Up</button>
        </span>
      ) : (
        <span>
          Already have an account?{" "}
          <button onClick={() => setIsLoginMode(true)}>Login</button>
        </span>
      )}
    </div>
  );
}

export default Login;
