import { Link } from "react-router-dom";
import { useRedirectAuthenticated } from "../hooks/useRedirectAuthenticated";
import { getCookie } from "../utils/getCookie";
import { useAuth } from "../hooks/useAuth";

export function Register() {
  const { refreshAuth } = useAuth();
  useRedirectAuthenticated();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const csrfToken = getCookie("csrftoken");

    try {
      const res = await fetch("http://localhost:8000/auth/register/", {
        method: "POST",
        credentials: "include",
        body: formData,
        headers: {
          "X-CSRFToken": csrfToken,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        console.log(data.error);
      }

      refreshAuth();
    } catch (err) {}
  };

  return (
    <form
      method="post"
      className="general-form account-form"
      onSubmit={handleSubmit}
    >
      <h3>Register</h3>
      <label>Username</label>
      <input type="text" name="username" placeholder="username.." required />
      <label>Email</label>
      <input
        type="email"
        name="email"
        placeholder="email@example.com"
        required
      />
      <label>Password</label>
      <input
        type="password"
        name="password1"
        placeholder="password.."
        required
      />
      <label>Confirm password</label>
      <input
        type="password"
        name="password2"
        placeholder="confirm password.."
        required
      />
      <footer>
        <Link to="/account/login">Log in</Link>
        <button type="submit" className="action-button">
          Register
        </button>
      </footer>
    </form>
  );
}
