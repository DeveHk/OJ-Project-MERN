import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
const ProtectedRoutes = ({ type }: { type: string }) => {
  const [mounted, setMounted] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const res = async () => {
      const response = await axios.get("http://localhost:5000/auth/islogin", {
        withCredentials: true,
      });
      console.log(response, response.data.isAuthenticated);
      setMounted(true);
      setIsAuth(response.data.isAuthenticated);
    };
    if (!mounted) res();
  }, [mounted]);
  if (!mounted) return null;
  if (type == "private") return isAuth ? <Outlet /> : <Navigate to="/login" />;
  if (type == "protected")
    return isAuth ? <Navigate to="/dashboard" /> : <Outlet />;
};
export default ProtectedRoutes;
