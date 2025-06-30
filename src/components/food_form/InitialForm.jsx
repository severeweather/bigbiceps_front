import { useNavigate, useParams } from "react-router-dom";
import { getCookie } from "../../utils/getCookie";
import { useEffect } from "react";

export function InitialForm(props) {
  const { type } = useParams("type");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const csrfToken = getCookie("csrftoken");

    try {
      const res = await fetch(`http://localhost:8000/food/${type}`, {
        method: "POST",
        body: formData,
        headers: {
          "X-CSRFToken": csrfToken,
        },
        credentials: "include",
      });

      if (!res.ok) throw new Error(res.status);

      const data = await res.json();
      props.onSuccess({
        id: data.id,
        type: data.food_type,
        composition: data.composition,
        newStep:
          type === "ingredient"
            ? "nutrients"
            : type === "dish" || "meal"
            ? "composition"
            : "",
      });
    } catch (err) {
      console.log("error:", err);
    }
  };

  useEffect(() => {
    if (!["ingredient", "dish", "meal"].includes(type)) navigate("/");
  }, [type, navigate]);

  return (
    <form
      className="general-form centered"
      method="post"
      onSubmit={handleSubmit}
    >
      <label>Name</label>
      <input name="name" placeholder="Tomato" required />

      <label>Description</label>
      <textarea name="description" placeholder="Red and round" />
      {type === "dish" ? (
        <>
          <label>Recipe</label>
          <textarea name="reicpe" placeholder="100g tomato 200g potato" />
        </>
      ) : null}

      <button type="submit" className="action-button">
        Continue
      </button>
    </form>
  );
}
