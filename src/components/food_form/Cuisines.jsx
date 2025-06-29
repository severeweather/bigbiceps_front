import { useEffect, useState } from "react";
import { getCookie } from "../../utils/getCookie";
import { useNavigate } from "react-router-dom";

export function Cuisines(props) {
  const navigate = useNavigate();
  const [cuisines, setCuisines] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCuisines = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/food/cuisine", {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();
      setCuisines(data.cuisines);
      setLoading(false);
    } catch {}
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const csrfToken = getCookie("csrftoken");

    try {
      await fetch(`http://localhost:8000/food/${props.item.id}/cuisines`, {
        method: "POST",
        credentials: "include",
        body: formData,
        headers: {
          "X-CSRFToken": csrfToken,
        },
      });

      props.onSuccess({
        id: props.item.id,
        type: props.item.type,
        composition: props.item.composition,
        newStep: props.item.type === "dish" ? "finish" : "",
      });
    } catch {}
  };

  useEffect(() => {
    if (props.item.type !== "dish") navigate("/");
    fetchCuisines();
  }, [props.item.type, navigate]);

  return !loading ? (
    <form method="post" className="general-form" onSubmit={handleSubmit}>
      <h3>Cuisines</h3>
      {cuisines.map((item, key) => {
        return (
          <div key={key}>
            <label>{item.name}</label>
            <input type="checkbox" value={item.id} name="cuisines" />
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
