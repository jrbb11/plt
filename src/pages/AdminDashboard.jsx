import React from "react";
import TripsChart from "../components/TripsChart";


const metrics = [
  { label: "Total Users", value: 1024, trend: 12 },
  { label: "Active Users", value: 876, trend: 8 },
  { label: "Pending Bookings", value: 234, trend: -5 },
  { label: "Completed Bookings", value: 980, trend: 20 },
];

export default function AdminDashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Greeting + Date */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#17C0EB]">Hello, Admin</h1>
        <span className="text-[#17C0EB]">{new Date().toLocaleDateString()}</span>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((m) => (
          <div key={m.label} className="bg-[#17C0EB] text-white p-4 rounded-lg shadow text-center">
            <h2 className="text-2xl font-semibold">{m.value}</h2>
            <p className="text-sm">{m.label}</p>
            <p className={`text-xs ${m.trend > 0 ? 'text-green-200' : 'text-red-200'}`}>
              {m.trend > 0 ? `↑ ${m.trend}%` : `↓ ${Math.abs(m.trend)}%`}
            </p>
          </div>
        ))}
      </div>

      {/* Main Chart & Pie Chart placeholders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-2 bg-white p-4 rounded-lg shadow border-t-4 border-[#17C0EB]">
          <h2 className="text-lg font-semibold mb-2 text-[#17C0EB]">Total trips per user</h2>
          <div className="h-64 flex items-center justify-center text-gray-400">
          <TripsChart />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border-t-4 border-[#17C0EB]">
          <h2 className="text-lg font-semibold mb-2 text-[#17C0EB]">User Role Breakdown</h2>
          <div className="h-64 flex items-center justify-center text-gray-400">
          <TripsChart />
          </div>
        </div>
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow border-t-4 border-[#17C0EB]">
          <h2 className="text-lg font-semibold mb-2 text-[#17C0EB]">Latest Users</h2>
          <table className="min-w-full text-sm text-left">
            <thead className="border-b border-[#17C0EB]">
              <tr>
                <th className="px-4 py-2 text-[#17C0EB]">Name</th>
                <th className="px-4 py-2 text-[#17C0EB]">Email</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-2">Jane Doe</td>
                <td className="px-4 py-2">jane@example.com</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2">John Smith</td>
                <td className="px-4 py-2">john@example.com</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border-t-4 border-[#17C0EB]">
          <h2 className="text-lg font-semibold mb-2 text-[#17C0EB]">Pending Bookings</h2>
          <table className="min-w-full text-sm text-left">
            <thead className="border-b border-[#17C0EB]">
              <tr>
                <th className="px-4 py-2 text-[#17C0EB]">Date</th>
                <th className="px-4 py-2 text-[#17C0EB]">Trip</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-2">06/20/2025</td>
                <td className="px-4 py-2">Makati ➔ QC</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2">06/21/2025</td>
                <td className="px-4 py-2">Pasig ➔ Taguig</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}