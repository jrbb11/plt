// src/pages/Auth/Registration.jsx
import React, { useState } from "react";
import { supabase } from "../../supabaseClient";  // must be using your anon key
import logo from "../../assets/logo.png";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../../index.css"; // for .btn-brand

export default function Registration() {
  const [firstName, setFirstName]     = useState("");
  const [lastName, setLastName]       = useState("");
  const [email, setEmail]             = useState("");
  const [password, setPassword]       = useState("");
  const [confirmPassword, setConfirm] = useState("");
  const [loading, setLoading]         = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match.");
    }

    setLoading(true);

    // 1) Create the Auth user
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp(
      { email, password },
      { data: { first_name: firstName, last_name: lastName } }
    );

    if (signUpError) {
      setLoading(false);
      console.error("Auth signUp error:", signUpError);
      return toast.error(signUpError.message);
    }

    // 2) Insert into your `users` table (not userall)
    const userId = signUpData.user.id;
    const { error: insertError } = await supabase
      .from("users")               // ← use "users" here
      .insert([
        {
          id:         userId,
          first_name: firstName,
          last_name:  lastName,
          email:      email,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ]);

    setLoading(false);

    if (insertError) {
      console.error("Profile Insert Error:", insertError);
      return toast.error("Database error saving new user:\n" + insertError.message);
    }

    toast.success("Registration successful! Check your email to confirm.");
    setTimeout(() => {
      window.location.href = "/login";
    }, 1500);
  };

  return (
    <div className="fixed inset-0">
      {/* same bg as Login */}
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
            Register
          </h2>

          <form className="space-y-5" onSubmit={handleRegister}>
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="First Name"
                className="w-full md:w-1/2 px-4 py-3 rounded-lg bg-gray-100 focus:bg-white focus:outline-none"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                className="w-full md:w-1/2 px-4 py-3 rounded-lg bg-gray-100 focus:bg-white focus:outline-none"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>

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

            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:bg-white focus:outline-none"
              value={confirmPassword}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />

            <button
              type="submit"
              className="w-full btn-brand py-3 rounded-lg text-lg"
              disabled={loading}
            >
              {loading ? "Registering…" : "Register"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="text-[#17C0EB] hover:underline">
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}