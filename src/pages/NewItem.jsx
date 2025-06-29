import {
  Link,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { useRedirectUnauthenticated } from "../hooks/useRedirectUnauthenticated";
import { InitialForm } from "../components/food_form/InitialForm";
import { Nutrients } from "../components/food_form/Nutrients";
import { Categories } from "../components/food_form/Categories";
import { Cuisines } from "../components/food_form/Cuisines";
import { Composition } from "../components/food_form/Composition";

export function NewItem() {
  useRedirectUnauthenticated("/account/login/");
  const location = useLocation();
  const navigate = useNavigate();
  const [step, setStep] = useState("");
  const [item, setItem] = useState({
    id: "",
    type: "",
    composition: [],
  });

  function changeStep({
    type = item.type,
    id = item.id,
    composition = item.composition,
    newStep = step,
  }) {
    if (!newStep || !type || !id || !composition) return;

    setItem({
      id: id,
      type: type,
      composition: composition,
    });

    setStep(newStep);
  }

  useEffect(() => {
    if (
      location.pathname === "/new/ingredient" ||
      location.pathname === "/new/dish" ||
      location.pathname === "/new/meal"
    ) {
      setStep("");
    }
    if (step === "") return;
    if (step === "finish") {
      navigate("/");
      return;
    }

    navigate(`/new/${item.id}/${step}`);
  }, [step, navigate, item, location.pathname]);

  return (
    <>
      <h2>new item</h2>
      <Link to="/new/ingredient">new ingredient</Link>
      <Link to="/new/dish">new dish</Link>
      <Link to="/new/meal">new meal</Link>

      <Routes>
        <Route path=":type" element={<InitialForm onSuccess={changeStep} />} />
        {/* prettier-ignore */}
        <Route path=":id/nutrients" element={<Nutrients item={item} onSuccess={changeStep}/>} />
        {/* prettier-ignore */}
        <Route path=":id/categories" element={<Categories item={item} onSuccess={changeStep} />} />
        {/* prettier-ignore */}
        <Route path=":id/cuisines" element={<Cuisines item={item} onSuccess={changeStep} />} />
        {/* prettier-ignore */}
        <Route path=":id/composition" element={<Composition item={item} onSuccess={changeStep} />} />

        {/* <Route path="ingredient" element={<IngredientForm onSuccess={changeStep} />} /> */}

        {/* prettier-ignore */}
        {/* <Route path="dish" element={<DishForm onSuccess={changeStep}/>} /> */}
        {/* prettier-ignore */}

        {/* prettier-ignore */}
        {/* <Route path="meal" element={<MealForm onSuccess={changeStep} />} /> */}
        {/* prettier-ignore */}
      </Routes>
    </>
  );
}
