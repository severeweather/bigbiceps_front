import { Link } from "react-router-dom";

export function Header() {
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
        <Link className="nav-link" to="/logout">
          Log out
        </Link>
      </section>
    </nav>
  );
}
