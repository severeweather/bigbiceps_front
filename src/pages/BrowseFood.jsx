import { Link } from "react-router-dom";

export function BrowseFood() {
  return (
    <div>
      <Link to="/new/ingredient">new ingredient</Link>
      <Link to="/new/dish">new dish</Link>
      <Link to="/new/meal">new meal</Link>
    </div>
  );
}
