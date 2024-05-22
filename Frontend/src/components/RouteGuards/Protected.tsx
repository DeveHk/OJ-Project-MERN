import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

function Protected({ children }: { children: ReactNode }) {
  const token = document.cookie
    .split(";")
    .some((item) => item.trim().startsWith("token="));

  if (!token) {
    // If no token, redirect to login
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default Protected;
