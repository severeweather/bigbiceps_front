import { useEffect } from "react";
import { getCookie } from "../utils/getCookie";

export function IngredientForm() {
  useEffect(() => {
    fetch("http://localhost:8000/food/new/ingredient", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("GET failed");
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const csrfToken = getCookie("csrftoken");

    try {
      const res = await fetch("http://localhost:8000/food/new/ingredient", {
        method: "POST",
        body: formData,
        headers: {
          "X-CSRFToken": csrfToken,
        },
        credentials: "include",
      });

      if (!res.ok) throw new Error(res.status);
    } catch (err) {
      console.log("error:", err);
    }
  };
  return (
    <form className="ingredient-form" method="post" onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input name="name" placeholder="Tomato.." />

      <label htmlFor="description">Description</label>
      <textarea name="description" placeholder="Red and round.." />

      <button type="submit">Continue</button>
    </form>
  );
}
