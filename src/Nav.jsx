import { Link } from "react-router-dom";
import { useAuth } from "./hooks/auth";

function NavItem({ children }) {
  return (
    <span className="block px-4 py-1 m-1 text-center hover:text-gray-100">
      {children}
    </span>
  );
}

export function Nav({ className }) {
  const auth = useAuth();

  const doLogout = () => {
    auth
      .logout()
      .then(() => (window.location = "/"))
      .catch((err) => console.error(err));
  };

  return (
    <nav className="bg-indigo-800 text-gray-200 ">
      <div className="container flex items-center h-16">
        <ul className="flex flex-1">
          <li>
            <NavItem>
              <Link to="/">Home</Link>
            </NavItem>
          </li>
          <li>
            <NavItem>
              <Link to="/about">About</Link>
            </NavItem>
          </li>
        </ul>
        <ul className="flex">
          {auth.isLoggedIn() ? (
            <li>
              <NavItem>
                <span className="cursor-pointer" onClick={doLogout}>
                  Logout
                </span>
              </NavItem>
            </li>
          ) : (
            <>
              <li>
                <NavItem>
                  <Link to="/login">Login</Link>
                </NavItem>
              </li>
              <li>
                <NavItem>
                  <Link to="/register">Register</Link>
                </NavItem>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
