import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Register from "./pages/Register";
import { Toaster } from "@/components/ui/toaster";
import Login from "./pages/Login";
import ProtectedRoutes from "./components/RouteGuards/ProtectedRoute";
import Dashboard from "./components/Dashboard/DashboardAdmin";
import DashboardRoute from "./components/RouteGuards/DashboardRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<ProtectedRoutes type="protected" />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<ProtectedRoutes type="private" />}>
          <Route path="/dashboard" element={<DashboardRoute />} />
          <Route path="/profile" element={<Dashboard />} />
        </Route>
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
