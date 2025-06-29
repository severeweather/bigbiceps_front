import { useEffect, useState } from "react";
import { getCookie } from "../../utils/getCookie";
import { useNavigate } from "react-router-dom";

export function Categories(props) {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (props.item.type !== "ingredient") navigate("/");
    setLoading(true);
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:8000/food/category", {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();
        setCategories(data.categories);
        setLoading(false);
      } catch (err) {}
    };
    fetchCategories();
  }, [props.item.type, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const csrfToken = getCookie("csrftoken");

    try {
      await fetch(`http://localhost:8000/food/${props.item.id}/categories`, {
        method: "POST",
        body: formData,
        credentials: "include",
        headers: {
          "X-CSRFToken": csrfToken,
        },
      });
    } catch {}

    props.onSuccess({
      id: props.item.id,
      type: props.item.type,
      composition: props.item.composition,
      newStep: props.item.type === "ingredient" ? "finish" : "",
    });
  };

  return !loading ? (
    <form className="general-form" method="post" onSubmit={handleSubmit}>
      <h3>Categories</h3>
      {categories.map((item, key) => {
        return (
          <div key={key}>
            <label>{item.name}</label>
            <input type="checkbox" value={item.id} name="categories" />
          </div>
        );
      })}
      <button className="action-button" type="submit">
        Continue
      </button>
    </form>
  ) : (
    <>loading</>
  );
}
