import { Link } from "react-router";

function Signup() {
  return (
    <div className="signup">
      <h2>Signup Page</h2>
      <span>
        Already have an account? <Link to="/login">Login</Link>
      </span>
    </div>
  );
}

export default Signup;
