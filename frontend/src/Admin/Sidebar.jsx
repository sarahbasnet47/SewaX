import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import {
  FaTachometerAlt,
  FaUsers,
  FaUserTie,
  FaTools,
  FaClipboardList,
  FaShoppingCart,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

import { useLogoutMutation } from "../../redux/features/UserSlice";

const menus = {
  admin: [
    { name: "Dashboard", path: "/dashboard", icon: FaTachometerAlt },
    { name: "Users", path: "/admin/users", icon: FaUsers },
    { name: "Vendors", path: "/admin/vendors", icon: FaUserTie },
    { name: "Services", path: "/admin/services", icon: FaTools },
    {
      name: "Vendor Services",
      path: "/admin/vendor-services",
      icon: FaClipboardList,
    },
    { name: "Orders", path: "/admin/orders", icon: FaShoppingCart },
    { name: "Settings", path: "/admin/settings", icon: FaCog },
  ],

  vendor: [
    {
      name: "Vendor Dashboard",
      path: "/vendor/dashboard",
      icon: FaTachometerAlt,
    },
    {
      name: "My Services",
      path: "/vendor/my-services",
      icon: FaTools,
    },
    {
      name: "My Orders",
      path: "/vendor/orders",
      icon: FaShoppingCart,
    },
    {
      name: "Settings",
      path: "/admin/settings",
      icon: FaCog,
    },
  ],

  user: [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: FaTachometerAlt,
    },
    {
      name: "Browse Services",
      path: "/services",
      icon: FaTools,
    },
    {
      name: "My Orders",
      path: "/my-orders",
      icon: FaShoppingCart,
    },
  ],
};

function Sidebar() {
  const navigate = useNavigate();
  const [logout, { isLoading }] = useLogoutMutation();

  // Read logged-in user
  const [user] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || {};
    } catch {
      return {};
    }
  });



  // Get role and username
  const role = user.role?.toLowerCase() || "user";
  const username = user.username || "User";

  // Select menus according to role
  const sidebarMenus = menus[role] || menus.user;

  const handleLogout = async () => {
    try {
      await logout().unwrap();

      // Clear locally stored login data
      localStorage.removeItem("user");

      alert("Logout successful");
      navigate("/login", { replace: true });
    } catch (error) {
      console.log("LOGOUT ERROR:", error);
      alert("Logout failed");
    }
  };

  return (
    <aside className="w-64 min-h-screen bg-gray-900 text-white shrink-0">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-gray-700">
        <h1 className="text-3xl font-bold">
          SEW<span className="text-secondary">AX</span>
        </h1>

        <p className="text-sm text-gray-400 mt-1 capitalize">{role} Panel</p>
      </div>

      {/* User Profile */}
      <div className="px-6 py-5 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center font-bold uppercase">
            {username.charAt(0)}
          </div>

          <div className="min-w-0">
            <p className="font-semibold truncate">{username}</p>
            <p className="text-xs text-gray-400 capitalize">{role}</p>
          </div>
        </div>
      </div>

      {/* Dynamic Menu */}
      <nav className="p-4">
        <p className="text-xs uppercase text-gray-500 px-3 mb-3">Main Menu</p>

        {sidebarMenus.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center gap-3 px-4 py-3 rounded-lg mb-2 text-gray-300 hover:bg-blue-600 hover:text-white transition-colors"
            >
              <Icon />
              <span>{item.name}</span>
            </Link>
          );
        })}

        {/* Divider */}
        <div className="border-t border-gray-700 my-5" />

        {/* Logout */}
        <button
          type="button"
          onClick={handleLogout}
          disabled={isLoading}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-600 hover:text-white disabled:opacity-50 transition-colors"
        >
          <FaSignOutAlt />
          <span>{isLoading ? "Logging out..." : "Logout"}</span>
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;
