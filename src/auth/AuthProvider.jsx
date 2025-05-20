import { useEffect } from "react";
import { useAuth } from "../utils/store/useAuth";

export default function AuthProvider({ children }) {
  const fetchUser = useAuth((state) => state.fetchUser);

  useEffect(() => {
    fetchUser();
  }, []);

  return <>{children}</>;
}
