import { Link } from "react-router-dom";

export function Header() {
  return (
    <div>
      <div classname="app-navigation-links">
        <Link to="/">Home</Link>
        <Link to="/tracking">Tracking</Link>
      </div>
      <div classname="account-links">
        <Link to="/login">Log in</Link>
        <Link to="/register">Register</Link>
      </div>
    </div>
  );
}
