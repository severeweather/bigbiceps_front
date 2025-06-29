import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import { getCookie } from "../../utils/getCookie";

export function Composition(props) {
  const [query, setQuery] = useState("");
  const [offset, setOffset] = useState(0);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasNext, setHasNext] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const pickedReducer = (state, action) => {
    switch (action.type) {
      case "TOGGLE_ITEM":
        const exists = state.find((el) => el.item.id === action.payload.id);
        if (exists)
          return state.filter((el) => el.item.id !== action.payload.id);
        else return [...state, { item: action.payload, quantity: 1 }];
      case "UPDATE_QUANTITY":
        const { id, quantity } = action.payload;
        return state.map((el) =>
          el.item.id === id ? { ...el, quantity: Number(quantity) } : el
        );
      default:
        return state;
    }
  };
  const [picked, dispatch] = useReducer(pickedReducer, []);
  const currentRef = useRef(null);
  const bottomRef = useRef(null);

  const fetchResults = useCallback(async () => {
    if (loading || !hasNext) return;
    setLoading(true);

    const params = new URLSearchParams();
    params.append("q", query);
    params.append("o", offset);
    props.item.composition.forEach((el) => params.append("ft", el));

    const res = await fetch(
      `http://localhost:8000/search/food?${params.toString()}`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    const data = await res.json();
    console.log(data);

    setResults((prev) => [...prev, ...data.search_results]);
    setOffset((prev) => prev + 10);
    setHasNext(data.has_next);
    setLoading(false);
  }, [loading, query, offset, hasNext, props.item.composition]);

  useEffect(() => {
    if (!hasStarted) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) fetchResults();
      },
      { root: currentRef.current, rootMargin: "100px" }
    );

    const target = bottomRef.current;
    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [fetchResults, hasStarted, props.item.composition]);

  const handleSubmit = async () => {
    const data = Object.fromEntries(
      picked.map((el) => [el.item.id, el.quantity])
    );

    const csrfToken = getCookie("csrftoken");

    const encoded = new URLSearchParams(data).toString();

    try {
      await fetch(`http://localhost:8000/food/${props.item.id}/composition`, {
        method: "POST",
        credentials: "include",
        headers: {
          "X-CSRFToken": csrfToken,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: encoded,
      });
    } catch (err) {
      throw new Error(err);
    }
    props.onSuccess({
      type: props.item.type,
      id: props.item.id,
      newStep:
        props.item.type === "dish"
          ? "cuisines"
          : props.item.type === "meal"
          ? "finish"
          : "",
    });
  };

  return (
    <div className="dish-comp-two-sections">
      <section className="rounded-grey-section">
        <button type="button" className="action-button" onClick={handleSubmit}>
          Continue
        </button>
        <ul className="underlined-list">
          {picked.map((el, key) => {
            return (
              <li key={key}>
                <span>{el.item.name}</span>
                <input
                  type="number"
                  onChange={(e) =>
                    dispatch({
                      type: "UPDATE_QUANTITY",
                      payload: { quantity: e.target.value, id: el.item.id },
                    })
                  }
                />
              </li>
            );
          })}
        </ul>
      </section>
      <section className="rounded-grey-section search-section">
        <header className="search-input-header">
          <input
            type="text"
            name="ingredient-search"
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            className="action-button"
            onClick={() => {
              setResults([]);
              setOffset(0);
              setHasNext(true);
              setHasStarted(true);
              fetchResults();
            }}
          >
            Search
          </button>
        </header>
        <ul ref={currentRef} className="underlined-list">
          {results.map((item, key) => {
            return (
              <li key={key}>
                <span>{item.name}</span>
                <button
                  type="button"
                  className="action-button"
                  onClick={() => {
                    dispatch({ type: "TOGGLE_ITEM", payload: item });
                  }}
                >
                  + add
                </button>
              </li>
            );
          })}
          <div ref={bottomRef} />
          {loading && <p>Loading...</p>}
        </ul>
      </section>
    </div>
  );
}
