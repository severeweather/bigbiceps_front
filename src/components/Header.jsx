import { Link } from "react-router-dom";

export function Header() {
  return (
    <nav className="navigation-bar">
      <section>
        <Link to="/">Browse</Link>
        <Link to="/tracking">Tracking</Link>
      </section>
      <section>
        <Link to="/logout">Log out</Link>
      </section>
    </nav>
  );
}
