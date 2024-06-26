import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Register from "./pages/Register";
import { Toaster } from "@/components/ui/toaster";
import Login from "./pages/Login";
import ProtectedRoutes from "./components/RouteGuards/ProtectedRoute";
import DashboardRoute from "./components/RouteGuards/DashboardRoute";
import Problems from "./pages/Problems";
import Problem from "./pages/Problem";
import { ThemeProvider } from "./components/provider/theme-provider";
function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/problems/:problemId" element={<Problem />} />
          <Route path="/problems" element={<Problems />} />
          <Route element={<ProtectedRoutes type="protected" />}>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Route>
          <Route element={<ProtectedRoutes type="private" />}>
            <Route path="/dashboard/*" element={<DashboardRoute />} />
            <Route path="/profile" element={<DashboardRoute />} />
          </Route>
        </Routes>
        <Toaster />
      </Router>
    </ThemeProvider>
  );
}

export default App;
