import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { FaPaw, FaSignOutAlt, FaUserEdit, FaTaxi, FaTimes, FaExclamationTriangle } from "react-icons/fa";
import Modal from "react-modal";

Modal.setAppElement('#root');

export default function DashboardClient() {
  const [userData, setUserData] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [allBookings, setAllBookings] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [accessDenied, setAccessDenied] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check for access denied message
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get('error') === 'access_denied') {
      setAccessDenied(true);
    }
  }, [location]);

  useEffect(() => {
    async function fetchData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return navigate("/login");

      const { data, error } = await supabase
        .from("userall") // <-- updated table name
        .select("first_name, last_name")
        .eq("id", user.id)
        .single();

      if (!error) setUserData(data);

      const { data: bookingData } = await supabase
        .from("bookings")
        .select("*")
        .eq("user_id", user.id)
        .order("transport_date", { ascending: false });

      setAllBookings(bookingData || []);
      setBookings((bookingData || []).slice(0, 3));
    }

    fetchData();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  if (!userData) return <div className="text-center mt-20">Loading your dashboard...</div>;

  return (
    <div className="fixed inset-0">
      {/* Access Denied Message */}
      {accessDenied && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2 shadow-lg">
            <FaExclamationTriangle />
            <span>Access denied. You don't have admin privileges.</span>
            <button 
              onClick={() => setAccessDenied(false)}
              className="ml-2 text-red-500 hover:text-red-700"
            >
              <FaTimes />
            </button>
          </div>
        </div>
      )}
      {/* Background Image Layer */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-50"
        style={{ backgroundImage: "url('/animals-bg.png')" }}
      />

      {/* Content Layer */}
      <div className="relative z-10 flex items-center justify-center w-full h-full p-4">
        <div className="bg-white/70 backdrop-blur-sm shadow-lg rounded-xl p-8 w-full max-w-3xl space-y-8 text-center">
          <h1 className="text-3xl font-bold text-[#17C0EB] flex justify-center items-center gap-2">
            Hi {userData.first_name}! <FaPaw />
          </h1>
          <p className="text-gray-700">Ready for your next pet adventure?</p>

          <Link to="/booking" className="flex items-center justify-center gap-2 bg-[#17C0EB] text-white px-6 py-3 rounded-full text-lg shadow hover:bg-[#129BB3] transition mx-auto w-60">
            <FaTaxi /> Book a Ride
          </Link>

          <div className="bg-white/80 rounded-xl shadow p-6">
            <h2 className="text-2xl font-semibold text-[#17C0EB] mb-4">My Recent Bookings</h2>
            {bookings.length === 0 ? (
              <p className="text-gray-500">You have no bookings yet. 🐶</p>
            ) : (
              <ul className="space-y-4 text-left">
                {bookings.map(b => (
                  <li key={b.id} className="flex justify-between items-center border-b pb-2">
                    <div>
                      <p className="font-semibold">{new Date(b.transport_date).toLocaleDateString()}</p>
                      <p className="text-sm text-gray-600">{b.pickup_address} ➡️ {b.dropoff_address}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      b.status === 'pending' ? 'bg-yellow-200 text-yellow-800' :
                      b.status === 'completed' ? 'bg-green-200 text-green-800' :
                      'bg-red-200 text-red-800'
                    }`}>
                      {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
            {allBookings.length > 3 && (
              <div className="text-right mt-4">
                <button onClick={() => setModalOpen(true)} className="text-[#17C0EB] hover:underline">
                  View All Bookings
                </button>
              </div>
            )}
          </div>

          <div className="flex justify-center gap-4">
            <Link to="/profile" className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 px-5 py-3 rounded-full text-gray-700 transition">
              <FaUserEdit /> Edit Profile
            </Link>
            <button onClick={handleLogout} className="flex items-center gap-2 bg-red-400 hover:bg-red-500 px-5 py-3 rounded-full text-white transition">
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        contentLabel="All Bookings"
        className="relative z-50 bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto mt-20 outline-none"
        overlayClassName="fixed inset-0 bg-cover bg-center"
        style={{
          overlay: {
            backgroundImage: "url('/animals-bg.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backdropFilter: 'blur(2px)',
          }
        }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-[#17C0EB]">All Bookings</h2>
          <button onClick={() => setModalOpen(false)} className="text-gray-500 hover:text-gray-700">
            <FaTimes size={20} />
          </button>
        </div>
        <div className="max-h-80 overflow-y-auto space-y-4">
          {allBookings.map(b => (
            <li key={b.id} className="flex justify-between items-center border-b pb-2 list-none">
              <div>
                <p className="font-semibold">{new Date(b.transport_date).toLocaleDateString()}</p>
                <p className="text-sm text-gray-600">{b.pickup_address} ➡️ {b.dropoff_address}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${
                b.status === 'pending' ? 'bg-yellow-200 text-yellow-800' :
                b.status === 'completed' ? 'bg-green-200 text-green-800' :
                'bg-red-200 text-red-800'
              }`}>
                {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
              </span>
            </li>
          ))}
        </div>
      </Modal>
    </div>
  );
}
