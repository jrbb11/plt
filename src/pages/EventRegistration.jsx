// src/pages/EventRegistration.jsx
import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import logo from "../assets/logo.png"; // adjust path if needed
import "../index.css"; // for .btn-brand

export default function EventRegistration() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    // Fetch last voucher code
    const { data: last, error: lastErr } = await supabase
      .from("event_registrations")
      .select("voucher_code")
      .order("registered_at", { ascending: false })
      .limit(1);
    if (lastErr) {
      alert("Error fetching voucher info: " + lastErr.message);
      setLoading(false);
      return;
    }
    const prevCode = last?.[0]?.voucher_code || "PLT50OFF-0";
    const prevNum = parseInt(prevCode.split("-").pop(), 10) || 0;
    const voucherCode = `PLT50OFF-${prevNum + 1}`;

    // Send OTP with redirect
    const { error: otpError } = await supabase.auth.signInWithOtp(
      { email },
      { redirectTo: `${window.location.origin}/thank-you` }
    );
    if (otpError) {
      alert("Error sending OTP: " + otpError.message);
      setLoading(false);
      return;
    }

    // Save to DB
    const { error: dbError } = await supabase
      .from("event_registrations")
      .insert({
        first_name: firstName,
        last_name: lastName,
        contact_number: contact,
        email,
        facebook: facebook || null,
        instagram: instagram || null,
        city,
        voucher_code: voucherCode
      });
    if (dbError) {
      alert("Error saving registration: " + dbError.message);
      setLoading(false);
      return;
    }

    localStorage.setItem("voucherCode", voucherCode);
    window.location.href = "/thank-you";
  };

  return (
    <div className="fixed inset-0">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-50"
        style={{ backgroundImage: "url('/animals-bg.png')" }}
      />

      <div className="relative z-10 flex items-center justify-center w-full h-full p-4">
        <div className="bg-white/70 backdrop-blur-sm shadow-lg rounded-xl p-8 w-full max-w-md space-y-6">
          <img
            src={logo}
            alt="Pet.Love.Travel Logo"
            className="h-32 w-auto mx-auto mb-4"
          />
          <h2 className="text-3xl font-bold text-center text-[#17C0EB] mb-6">
            Event Registration
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="First Name"
                className="w-full md:w-1/2 px-4 py-3 rounded-lg bg-gray-100 focus:bg-white focus:outline-none"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                className="w-full md:w-1/2 px-4 py-3 rounded-lg bg-gray-100 focus:bg-white focus:outline-none"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                required
              />
            </div>
            <input
              type="tel"
              placeholder="Contact Number"
              className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:bg-white focus:outline-none"
              value={contact}
              onChange={e => setContact(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:bg-white focus:outline-none"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <input
              type="url"
              placeholder="Facebook Profile (optional)"
              className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:bg-white focus:outline-none"
              value={facebook}
              onChange={e => setFacebook(e.target.value)}
            />
            <input
              type="url"
              placeholder="Instagram Profile (optional)"
              className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:bg-white focus:outline-none"
              value={instagram}
              onChange={e => setInstagram(e.target.value)}
            />
            <input
              type="text"
              placeholder="City"
              className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:bg-white focus:outline-none"
              value={city}
              onChange={e => setCity(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full btn-brand py-3 rounded-lg text-lg"
              disabled={loading}
            >
              {loading ? "Processing…" : "Register & Send OTP"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

