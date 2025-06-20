// src/pages/Auth/Login.jsx
import React, { useState } from "react";
import { supabase } from "../../supabaseClient";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

export default function Login() {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading]   = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      return alert(error.message);
    }
    window.location.href = "/";
  };

  return (
    <div className="fixed inset-0">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-50"
        style={{ backgroundImage: "url('/animals-bg.png')" }}
      />

      <div className="relative z-10 flex items-center justify-center w-full h-full p-4">
        <div className="bg-white/70 backdrop-blur-sm shadow-lg rounded-xl p-8 w-full max-w-md space-y-6">
          <img
            src={logo}
            alt="Pet.Love.Travel Logo"
            className="h-20 w-auto mx-auto mb-4"
          />
          <h2 className="text-3xl font-bold text-center text-[#17C0EB]">
            Login
          </h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:bg-white focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:bg-white focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              className="w-full btn-brand py-4 rounded-xl text-lg"
              disabled={loading}
            >
              {loading ? "Logging in…" : "Login"}
            </button>
          </form>

          <p className="text-center text-sm">
            <Link to="/reset-password" className="text-[#17C0EB] hover:underline">
              Forgot your password?
            </Link>
          </p>

          <p className="text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link to="/register" className="text-[#17C0EB] hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
