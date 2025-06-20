import React, { useState } from "react";
import { FaHome, FaUser, FaCog, FaChartBar, FaMoneyBill, FaBars, FaBell } from "react-icons/fa";
import { Outlet, NavLink } from "react-router-dom";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navItems = [
    { path: "/admin", icon: <FaHome />, label: "Dashboard" },
    { path: "/admin/users", icon: <FaUser />, label: "Users" },
    { path: "/admin/payments", icon: <FaMoneyBill />, label: "Payments" },
    { path: "/admin/reports", icon: <FaChartBar />, label: "Reports" },
    { path: "/admin/settings", icon: <FaCog />, label: "Settings" },
  ];

  return (
    <div className="flex min-h-screen bg-[#F5F7FA]">
      {/* Sidebar */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'} bg-white shadow-md flex flex-col`}>
        {/* Brand */}
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <h1 className={`text-xl font-bold text-[#17C0EB] ${!sidebarOpen && 'hidden'}`}>Pet.Love.Travel</h1>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="focus:outline-none">
            <FaBars />
          </button>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 px-3 py-4 space-y-2">
          {navItems.map(({ path, icon, label }) => (
            <NavLink
              to={path}
              key={path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-colors duration-200 hover:bg-[#E6F7FB] hover:text-[#17C0EB] ${
                  isActive ? 'bg-[#E6F7FB] text-[#17C0EB]' : 'text-gray-600'
                }`
              }
            >
              <span className="text-lg">{icon}</span>
              {sidebarOpen && <span>{label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Footer Section */}
        <div className="p-4 border-t">
          <button className="text-sm text-gray-500 hover:text-[#17C0EB]">Upgrade Plan</button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1">
        {/* Topbar */}
        <div className="flex items-center justify-between px-6 py-4 bg-white shadow-sm rounded-t-lg">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search keyword..."
              className="w-full pl-10 pr-20 py-2 rounded-full border border-gray-200 shadow-sm focus:outline-none"
            />
            <span className="absolute left-3 top-2.5 text-gray-400 text-sm">🔍</span>
            <span className="absolute right-3 top-2.5 bg-gray-100 border px-2 py-0.5 rounded text-xs text-gray-500">⌘ + K</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative">
              <FaBell className="text-gray-500" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </div>
            <div className="relative">
              <img
                src="https://i.pravatar.cc/40"
                alt="Avatar"
                className="w-9 h-9 rounded-full border"
              />
              <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-white"></span>
            </div>
          </div>
        </div>

        {/* Nested routed content */}
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}