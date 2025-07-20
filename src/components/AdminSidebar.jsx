import React from 'react';
import { FaCalendarAlt, FaUsers, FaBuilding, FaMoneyBill, FaBox, FaCog, FaQuestionCircle, FaChartBar, FaMoon } from 'react-icons/fa';
import logo from '../assets/logo.png';

export default function AdminSidebar() {
  return (
    <aside className="w-64 bg-white border-r flex flex-col h-full shadow-sm">
      <div className="flex items-center gap-3 px-6 py-6 border-b">
        <img src={logo} alt="Logo" className="h-10 rounded-full" />
        <div>
          <div className="font-bold text-lg text-[#17C0EB]">Pet Love Travel</div>
          <div className="text-xs text-gray-400">Pet Transport Services</div>
        </div>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        <div className="text-xs text-gray-400 mb-2">Main Menu</div>
        <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-[#E6F7FB]">
          <FaChartBar /> Overview
        </a>
        <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-[#E6F7FB]">
          <FaUsers /> Patients
        </a>
        <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-[#17C0EB] bg-[#E6F7FB] font-semibold">
          <FaCalendarAlt /> Appointment
        </a>
        <div className="text-xs text-gray-400 mt-6 mb-2">Other menu</div>
        <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-[#E6F7FB]">
          <FaBuilding /> Employee
        </a>
        <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-[#E6F7FB]">
          <FaMoneyBill /> Department
        </a>
        <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-[#E6F7FB]">
          <FaBox /> Product & Stock
        </a>
        <div className="text-xs text-gray-400 mt-6 mb-2">Help & Settings</div>
        <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-[#E6F7FB]">
          <FaQuestionCircle /> Help & Center
        </a>
        <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-[#E6F7FB]">
          <FaCog /> Settings
        </a>
        <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-[#E6F7FB]">
          <FaChartBar /> Report
        </a>
      </nav>
      <div className="px-6 py-4 border-t flex items-center gap-3">
        <FaMoon className="text-gray-400" />
        <span className="text-sm text-gray-500">Dark mode</span>
        <span className="ml-auto w-10 h-5 bg-gray-200 rounded-full flex items-center cursor-pointer">
          <span className="w-5 h-5 bg-white rounded-full shadow" />
        </span>
      </div>
    </aside>
  );
} 