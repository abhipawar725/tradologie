import api from "../api/axios";
import { useEffect, useState } from "react";

const useAuth = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [role, setRole] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthor, setIsAuthor] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/api/user/me")
      .then((res) => {
        setIsAuth(true);
        setRole(res.data.user.role);
      })
      .catch(() => {
        setIsAuth(false);
        setRole(null);
      })
      .finally(() => setLoading(false));
  }, []);

  return {
    isAuth,
    loading,
    isAdmin: role === "admin",
    isAuthor: role === "auhtor",
    isUser: role === "user",
  };
};

export default useAuth;
