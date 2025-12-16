function Login() {
  return (
    <div className="login">
      <h1>Login</h1>
      <form>
        <input
          type="text"
          name="username"
          aria-label="username"
          placeholder="Username"
          required
        ></input>
        <input
          type="password"
          name="password"
          aria-label="password"
          placeholder="Password"
          required
        ></input>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
