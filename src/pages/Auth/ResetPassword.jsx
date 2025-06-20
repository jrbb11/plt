// src/pages/Auth/ResetPassword.jsx
import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import logo from "../../assets/logo.png";
import "../../index.css";

export default function ResetPassword() {
  const location = useLocation();
  const qs = new URLSearchParams(location.search);
  const token = qs.get("token");

  // State
  const [email, setEmail]             = useState(qs.get("email") || "");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPwd, setConfirmPwd]   = useState("");
  const [loading, setLoading]         = useState(false);
  const [message, setMessage]         = useState("");

  const recoveryMode = Boolean(token);

  // Step 1: send reset link when no token
  const handleSendLink = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + "/reset-password?email=" + encodeURIComponent(email),
    });
    setLoading(false);
    setMessage(error ? error.message : "📬 Check your inbox for the reset link.");
  };

  // Step 2: verify OTP & update password when token present
  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (!email) {
      setMessage("Please enter your email.");
      return;
    }
    if (newPassword !== confirmPwd) {
      setMessage("Passwords do not match.");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.verifyOtp({
      type:     "recovery",
      token:    token,
      email:    email,
      password: newPassword,
    });
    setLoading(false);
    if (error) {
      setMessage(error.message);
    } else {
      setMessage("✅ Password reset! Redirecting to login…");
      setTimeout(() => (window.location.href = "/login"), 2000);
    }
  };

  return (
    <div className="fixed inset-0">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-50"
        style={{ backgroundImage: "url('/animals-bg.png')" }}
      />
      {/* Card */}
      <div className="relative z-10 flex items-center justify-center w-full h-full p-4">
        <div className="bg-white/70 backdrop-blur-sm shadow-lg rounded-xl p-8 w-full max-w-md space-y-6">
          <img src={logo} alt="Logo" className="h-32 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-center text-[#17C0EB]">
            {recoveryMode ? "Choose a New Password" : "Reset Password"}
          </h2>

          {message && (
            <div className="bg-yellow-100 text-yellow-800 p-2 rounded">
              {message}
            </div>
          )}

          {recoveryMode ? (
            // New Password Form
            <form onSubmit={handleUpdatePassword} className="space-y-4">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:bg-white focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="New Password"
                className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:bg-white focus:outline-none"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:bg-white focus:outline-none"
                value={confirmPwd}
                onChange={(e) => setConfirmPwd(e.target.value)}
                required
              />
              <button
                type="submit"
                className="w-full btn-brand py-3 rounded-lg text-lg"
                disabled={loading}
              >
                {loading ? "Updating…" : "Update Password"}
              </button>
            </form>
          ) : (
            // Send Reset Link Form
            <form onSubmit={handleSendLink} className="space-y-4">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:bg-white focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="w-full btn-brand py-3 rounded-lg text-lg"
                disabled={loading}
              >
                {loading ? "Sending…" : "Send Reset Link"}
              </button>
            </form>
          )}

          <p className="text-center text-sm">
            <Link to="/login" className="text-[#17C0EB] hover:underline">
              {recoveryMode ? "Back to login" : "Remembered your password? Log in here"}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}