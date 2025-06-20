import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";

export function useRedirectUnauthenticated(redirectTo = "/") {
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth?.isAuthenticated) {
      navigate(redirectTo);
    }
  }, [auth, navigate, redirectTo]);
}
