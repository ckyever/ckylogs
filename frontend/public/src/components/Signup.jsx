import { useState } from "react";
import { Link } from "react-router";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, password: password }),
      });

      if (response.ok) {
        navigate("/login");
      } else {
        throw new Error(`Response status: ${response.status}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="signup">
      <h1>Sign Up</h1>
      <form onSubmit={(event) => handleSignup(event)}>
        <input
          type="text"
          name="username"
          aria-label="username"
          placeholder="Username"
          required
          value={username}
          onChange={(event) => setUsername(event.target.value)}
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
        <button type="submit">Sign Up</button>
      </form>
      <span>
        Already have an account? <Link to="/login">Login</Link>
      </span>
    </div>
  );
}

export default Signup;
