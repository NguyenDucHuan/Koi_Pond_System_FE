import React from "react";
import { Outlet } from "react-router-dom";

const StaffLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Outlet />
    </div>
  );
};

export default StaffLayout;
