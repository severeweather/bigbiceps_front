import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthContext";

export function Header() {
  const auth = useContext(AuthContext);

  if (auth.loading) return null;

  return (
    <nav className="navigation-bar">
      <section>
        <Link className="nav-link" to="/">
          Browse
        </Link>
        <Link className="nav-link" to="/tracking">
          Tracking
        </Link>
      </section>
      <section>
        {auth.isAuthenticated ? (
          <Link className="nav-link" to="/account/logout">
            Log out
          </Link>
        ) : (
          <>
            <Link className="nav-link" to="/account/login">
              Log in
            </Link>
            <Link className="nav-link" to="/account/register">
              Register
            </Link>
          </>
        )}
      </section>
    </nav>
  );
}
