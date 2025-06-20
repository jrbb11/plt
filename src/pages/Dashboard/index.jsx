import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { supabase } from "../../supabaseClient";
import { useNavigate, Link } from "react-router-dom";

export default function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const [userData, setUserData] = useState(null);
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return navigate("/login");

      const { data, error } = await supabase
        .from("users")
        .select("first_name, last_name, email")
        .eq("id", user.id)
        .single();

      if (!error) setUserData(data);

      const { data: bookingData } = await supabase
        .from("bookings")
        .select("*")
        .eq("user_id", user.id);

      setBookings(bookingData || []);
    }

    fetchData();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  if (!userData) return <div className={`ml-${collapsed ? '20' : '64'} p-10`}>Loading Dashboard...</div>;

  const total = bookings.length;
  const pending = bookings.filter(b => b.status === 'pending').length;
  const completed = bookings.filter(b => b.status === 'completed').length;
  const cancelled = bookings.filter(b => b.status === 'cancelled').length;

  return (
    <div className="flex">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} onLogout={handleLogout} />
      <main className={`transition-all duration-300 ${collapsed ? 'ml-20' : 'ml-64'} w-full bg-gray-100 min-h-screen p-8`}>
        <h1 className="text-3xl font-bold mb-6">Welcome, {userData.first_name}! 👋</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          <StatCard title="Total Bookings" value={total} color="bg-blue-500" />
          <StatCard title="Pending" value={pending} color="bg-yellow-500" />
          <StatCard title="Completed" value={completed} color="bg-green-500" />
          <StatCard title="Cancelled" value={cancelled} color="bg-red-500" />
        </div>

        {/* Bookings List */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">My Bookings</h2>
          {bookings.length === 0 ? (
            <p>No bookings yet. <Link to="/booking" className="text-[#17C0EB] underline">Book a Ride</Link></p>
          ) : (
            <ul className="space-y-3 max-h-80 overflow-y-auto">
              {bookings.map(b => (
                <li key={b.id} className="border p-3 rounded">
                  <p><strong>{new Date(b.transport_date).toLocaleString()}</strong></p>
                  <p>{b.pickup_address} ➡️ {b.dropoff_address}</p>
                  <p>Status: {b.status} | ₱{b.fare}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}

function StatCard({ title, value, color }) {
  return (
    <div className={`text-white ${color} p-6 rounded-lg shadow text-center`}>
      <h3 className="text-lg">{title}</h3>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}
