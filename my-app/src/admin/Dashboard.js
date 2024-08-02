// Dashboard.js
import React from "react";
import AdminNavbar from "./adminComponents/AdminNavbar";
import SideBar from "./adminComponents/SideBar";
import { Outlet } from "react-router-dom";
const Dashboard = () => {
  return (
    <div className="h-screen overflow-hidden flex flex-col gap-1 bg-white">
      <AdminNavbar />
      <div className="flex gap-1 justify-between  flex-1">
        <SideBar />
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
