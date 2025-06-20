import { useContext } from "react";
import { AuthContext } from "../AuthContext";

export function useAuth() {
  const { auth, refreshAuth } = useContext(AuthContext);
  return { auth, refreshAuth };
}
