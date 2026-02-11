import api from "../api/axios";
import { useEffect, useState } from "react";

const useAuth = () => {
  const [isAuth, setIsAuth] = useState(false)
  const [loading, setLoading] = useState(true)
 
  useEffect(() => {
    api.get("/api/user/me")
    .then(() => setIsAuth(true))
    .catch(() => setIsAuth(false))
    .finally(() => setLoading(false))
  },[])

  return {isAuth, loading}
}

export default useAuth
