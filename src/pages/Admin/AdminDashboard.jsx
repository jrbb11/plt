import React from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import AdminTopbar from '../../components/AdminTopbar';

export default function AdminDashboard() {
  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminTopbar />
        <main className="flex-1 p-8 overflow-y-auto">
          <h1 className="text-2xl font-bold mb-6">Appointments</h1>
          <div className="bg-white rounded-xl shadow p-6 min-h-[400px]">
            {/* Placeholder calendar */}
            <div className="text-gray-400 text-center py-20">
              [Calendar Placeholder]
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 