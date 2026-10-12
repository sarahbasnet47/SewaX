import Privatelayout from "../layout/Privatelayout";
import AdminOrders from "../src/Admin/Adminorder";
import AdminServices from "../src/Admin/Adminservices";
import AdminVendor from "../src/Admin/Adminvendor";
import AdminVendorService from "../src/Admin/Adminvendorservice";
import Dashboard from "../src/Admin/Dashboard";
import Settings from "../src/Admin/Settings";
import User from "../src/Admin/User";
import Guard from "./guard";

const roles = ["admin", "vendor", "user"];
export const PrivateRoutes = {
  element: <Guard />,

  children: [
    {
      element: <Privatelayout />,
      children: [
        { path: "/dashboard", element: <Dashboard /> },
        { path: "/admin/users", element: <User /> },
        { path: "/admin/vendors", element: <AdminVendor /> },
        { path: "/admin/services", element: <AdminServices /> },
        { path: "/admin/vendor-services", element: <AdminVendorService /> },
        { path: "/admin/orders", element: <AdminOrders /> },
        { path: "/admin/settings", element: <Settings /> },
      ],
    },
  ],
};
