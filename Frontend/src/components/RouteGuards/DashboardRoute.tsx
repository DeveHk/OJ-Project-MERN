import DashboardAdmin from "@/pages/DashboardAdmin";
import DashboardUser from "@/pages/DashboardUser";
import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const DashboardRoute = () => {
  const [mounted, setMounted] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("http://localhost:5000/auth/islogin", {
          withCredentials: true,
        });
        console.log(response);
        setMounted(true);
        // setIsAuth(response.data.isAuthenticated);
        if (response.data.isAuthenticated) {
          setIsAdmin(response.data.user.role === "admin");
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        setMounted(true);
        //setIsAuth(false);
      }
    };
    if (!mounted) {
      checkAuth();
    }
  }, []);

  if (!mounted) return null;

  /* if (!isAuth) {
    return <Navigate to="/login" />;
  }*/

  return (
    <Routes>
      {isAdmin ? (
        <Route path="/" element={<DashboardAdmin />} />
      ) : (
        <Route path="/" element={<DashboardUser />} />
      )}
    </Routes>
  );
};

export default DashboardRoute;
