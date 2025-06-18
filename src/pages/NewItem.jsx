import { Link, Route, Routes } from "react-router-dom";
import { IngredientForm } from "../components/IngredientForm";

export function NewItem() {
  return (
    <>
      <h2>new item</h2>
      <Link to="/new/ingredient">new ingredient</Link>
      <Link to="/new/dish">new dish</Link>
      <Link to="/new/meal">new meal</Link>
      <Routes>
        <Route path="ingredient" element={<IngredientForm />} />
      </Routes>
    </>
  );
}
