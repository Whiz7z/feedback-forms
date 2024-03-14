import { Link, useActionData } from "@remix-run/react";
import PropTypes from "prop-types";

export default function LoginForm({ type }) {
  const data = useActionData();
  return (
    <div className="signin-container">
      <div className="signin">
        <h1>{type === "signin" ? "Sign in" : "Register"}</h1>
        <form method="POST">
          <div className="username-input">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
            />
          </div>
          <div className="password-input">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
            />
          </div>
          <button type="submit">
            {type === "signin" ? "Sign in" : "Register"}
          </button>
        </form>
        <Link to={type === "signin" ? "/register" : "/signin"}>
          {type === "signin" ? "Register" : "Sign in"}
        </Link>
        {data?.message && <p>{data.message}</p>}
      </div>
    </div>
  );
}

LoginForm.propTypes = {
  type: PropTypes.oneOf(["signin", "register"]).isRequired,
};
