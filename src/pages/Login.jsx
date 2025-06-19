import { useEffect } from "react";
import { getCookie } from "../utils/getCookie";
import { Link } from "react-router-dom";

export function Login() {
  useEffect(() => {
    fetch("http://localhost:8000/auth/login/", {
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

    const csrfToken = getCookie("csrftoken");
    const formData = new FormData(e.target);

    try {
      const res = await fetch("http://localhost:8000/auth/login/", {
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
    <form
      className="general-form account-form"
      method="post"
      onSubmit={handleSubmit}
    >
      <h3>Login</h3>
      <label>Username</label>
      <input name="username" type="text" placeholder="Username.." required />

      <label>Password</label>
      <input
        name="password"
        type="password"
        placeholder="Password.."
        required
      />
      <footer>
        <Link to="/account/register">Register</Link>
        <button type="submit" className="action-button">
          Log in
        </button>
      </footer>
    </form>
  );
}
