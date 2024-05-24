import DashboardAdmin from "@/pages/DashboardAdmin";
import DashboardUser from "@/pages/DashboardUser";
import axios from "axios";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
const DashboardRoute = () => {
  const [mounted, setMounted] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const res = async () => {
      const response = await axios.get("http://localhost:5000/auth/islogin", {
        withCredentials: true,
      });
      console.log(response);
      setMounted(true);
      setIsAdmin(response.data.user.role);
    };
    if (!mounted) res();
  }, [mounted]);
  if (!mounted) return null;

  return isAdmin ? (
    <Routes>
      <Route path="/" element={<DashboardAdmin />} />
    </Routes>
  ) : (
    <Routes>
      <Route path="/" element={<DashboardUser />} />
    </Routes>
  );
};
export default DashboardRoute;
