import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function Header() {
  const { auth } = useAuth();

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
        <Link className="nav-link" to="/new">
          New
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
