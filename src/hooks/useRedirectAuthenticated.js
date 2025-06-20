import { useContext, useEffect } from "react";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";

export function useRedirectAuthenticated(redirectTo = "/") {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth?.isAuthenticated) {
      navigate(redirectTo);
    }
  }, [auth, navigate, redirectTo]);
}
