import Footer from "@/components/Commons/Footer";
import Navbar from "@/components/Commons/Navbar";
import Dashboard from "@/components/DashboardUser/DashboardUser";
import React from "react";

const DashboardUser = () => {
  return (
    <>
      <Navbar />
      <Dashboard />
      <Footer />
    </>
  );
};

export default DashboardUser;
