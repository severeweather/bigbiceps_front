import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../utils/getCookie";

export function Logout() {
  const { auth, refreshAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth) return;

    if (!auth.isAuthenticated) {
      navigate("/");
    } else {
      try {
        const csrfToken = getCookie("csrftoken");

        fetch("http://localhost:8000/auth/logout/", {
          method: "POST",
          credentials: "include",
          headers: {
            "X-CSRFToken": csrfToken,
          },
        }).then(() => {
          refreshAuth();
        });
      } catch (err) {
        console.log(err);
      }
    }
  }, [navigate, auth, refreshAuth]);
  return;
}
