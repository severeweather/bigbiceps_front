import { useEffect, useState } from "react";
import { getCookie } from "../../utils/getCookie";
import { useNavigate } from "react-router-dom";

export function Nutrients(props) {
  const navigate = useNavigate();
  const [nutrients, setNutrients] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const csrfToken = getCookie("csrftoken");

    try {
      await fetch(`http://localhost:8000/food/${props.item.id}/nutrients`, {
        method: "POST",
        credentials: "include",
        body: formData,
        headers: {
          "X-CSRFToken": csrfToken,
        },
      });
    } catch (err) {}

    props.onSuccess({
      id: props.item.id,
      type: props.item.type,
      composition: props.item.composition,
      newStep: props.item.type === "ingredient" ? "categories" : "",
    });
  };

  useEffect(() => {
    if (props.item.type !== "ingredient") navigate("/");
    setLoading(true);
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:8000/food/nutrient", {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();
        setNutrients(data.nutrients);
        setLoading(false);
      } catch (err) {}
    };
    fetchData();
  }, [props.item.type, navigate]);
  return (
    <>
      {loading ? (
        <h2>Loading</h2>
      ) : (
        <form
          method="post"
          className="general-form ingredient-nutrients-form"
          onSubmit={handleSubmit}
        >
          {nutrients.map((item, key) => {
            return (
              <div key={key}>
                <label>
                  {item.name} {item.unit}
                </label>
                <input type="number" name={item.id} />
              </div>
            );
          })}
          <button className="action-button" type="submit">
            Continue
          </button>
        </form>
      )}
    </>
  );
}
