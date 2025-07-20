import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaUser, FaSignOutAlt, FaTaxi, FaBars, FaCog } from "react-icons/fa";
import logo from "../assets/logo.png";
import { useAdmin } from "../contexts/AdminContext";

export default function Sidebar({ collapsed, setCollapsed, onLogout }) {
  const { isAdmin } = useAdmin();
  
  return (
    <div className={`h-screen ${collapsed ? 'w-20' : 'w-64'} bg-[#17C0EB] text-white flex flex-col fixed transition-all duration-300`}>
      <div className="flex items-center justify-between p-4 border-b border-blue-300">
        {!collapsed && (
          <div className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="h-10 rounded-full" />
            <span className="font-bold text-lg">Pet Love Travel Pet Transport Services</span>
          </div>
        )}
        <button onClick={() => setCollapsed(!collapsed)}>
          <FaBars />
        </button>
      </div>
      <nav className="flex-1 p-4 space-y-6">
        <Link to="/dashboard" className="flex items-center gap-3 hover:text-gray-200">
          <FaHome /> {!collapsed && "Dashboard"}
        </Link>
        <Link to="/booking" className="flex items-center gap-3 hover:text-gray-200">
          <FaTaxi /> {!collapsed && "Book a Ride"}
        </Link>
        <Link to="/profile" className="flex items-center gap-3 hover:text-gray-200">
          <FaUser /> {!collapsed && "Profile"}
        </Link>
        {isAdmin && (
          <Link to="/admin" className="flex items-center gap-3 hover:text-gray-200">
            <FaCog /> {!collapsed && "Admin Panel"}
          </Link>
        )}
        <button onClick={onLogout} className="flex items-center gap-3 hover:text-gray-200">
          <FaSignOutAlt /> {!collapsed && "Logout"}
        </button>
      </nav>
    </div>
  );
}
