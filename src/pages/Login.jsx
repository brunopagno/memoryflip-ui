import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/auth";

export function Login() {
  const { login } = useAuth();
  const [error, setError] = useState(null);

  function handleSubmit(ev) {
    ev.preventDefault();
    var form = ev.target;
    var data = new FormData(form);
    var email = data.get("email");
    var password = data.get("password");

    login(email, password)
      .then((_res) => (window.location = "/"))
      .catch((err) => setError(err.message));
  }

  return (
    <>
      <h2>Login</h2>
      <form className="max-w-xl" onSubmit={handleSubmit}>
        {error && <p className="text-red-500">{error}</p>}
        <label>
          Email:
          <input className="form-field" name="email" type="email" />
        </label>
        <label>
          Password:
          <input className="form-field" name="password" type="password" />
        </label>
        <button className="btn btn-primary" type="submit">
          Login
        </button>
      </form>

      Or click <Link className="link" to="/register">here</Link> to register
    </>
  );
}
