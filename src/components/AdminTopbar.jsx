import React from 'react';
import { FaBell, FaUserCircle } from 'react-icons/fa';

export default function AdminTopbar() {
  return (
    <header className="flex items-center justify-between bg-white px-8 py-4 border-b shadow-sm">
      <div className="flex items-center gap-4 w-1/2">
        <input
          type="text"
          placeholder="Search anything here"
          className="w-full px-4 py-2 rounded-lg border bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#17C0EB]"
        />
      </div>
      <div className="flex items-center gap-4">
        <button className="bg-[#17C0EB] text-white px-5 py-2 rounded-lg font-semibold hover:bg-[#129BB3] transition">+ New Appointment</button>
        <FaBell className="text-gray-400 text-xl" />
        <div className="flex items-center gap-2">
          <FaUserCircle className="text-3xl text-gray-400" />
          <span className="font-medium text-gray-700">Alexandro</span>
        </div>
      </div>
    </header>
  );
} 