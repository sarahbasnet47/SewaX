import { Outlet } from "react-router-dom";
import Sidebar from "../src/Admin/Sidebar";

const Privatelayout = () => {
  return (
    <div className="flex h-screen">
      <Sidebar /> 
      <div className="flex-1 overflow-y-auto bg-gray-50">
        <Outlet />
      </div>
    </div>
  );
};

export default Privatelayout;
