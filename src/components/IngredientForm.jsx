import { useEffect } from "react";
import { handleSubmitForm } from "../utils/handleSubmitForm";

export function IngredientForm() {
  return (
    <form
      className="general-form new-item-form"
      method="post"
      onSubmit={(e) =>
        handleSubmitForm(e, "http://localhost:8000/food/new/ingredient")
      }
    >
      <label>Name</label>
      <input name="name" placeholder="Tomato" required />

      <label>Description</label>
      <textarea name="description" placeholder="Red and round" />

      <button type="submit" className="action-button">
        Continue
      </button>
    </form>
  );
}
