import { useState } from "react";
import { useAuth } from "../hooks/auth";

export function Register() {
  const { register } = useAuth();
  const [error, setError] = useState(null);

  function handleSubmit(ev) {
    ev.preventDefault();
    var form = ev.target;
    var data = new FormData(form);
    var email = data.get("email");
    var password = data.get("password");
    var passwordConfirmation = data.get("password_confirmation");

    register(email, password, passwordConfirmation)
      .then((_res) => (window.location = "/"))
      .catch((err) => setError(err.message));
  }

  return (
    <>
      <h2>Sign up</h2>
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
        <label>
          Password confirmation:
          <input
            className="form-field"
            name="password_confirmation"
            type="password"
          />
        </label>
        <button className="btn btn-primary" type="submit">
          Sign up
        </button>
      </form>
    </>
  );
}
