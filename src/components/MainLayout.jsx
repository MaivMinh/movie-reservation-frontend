import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <Header />
      <div className="mt-5">
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;
