// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import PetChatWidget from './components/PetChatWidget';

// Public pages
import LandingPage     from "./pages/LandingPage.jsx";
import Booking         from "./pages/Booking.jsx";

// Dashboard
import DashboardClient from "./pages/DashboardClient.jsx";

// Auth pages (barrel import from src/pages/Auth/index.js)
import {
  Login,
  Registration,
  ResetPassword,
  Profile
} from "./pages/Auth";

// Event registration flow
import EventRegistration from "./pages/EventRegistration.jsx";
import ThankYou          from "./pages/ThankYou.jsx";

export default function App() {
  return (
    <>
      <Routes>
        {/* Public */}
        <Route path="/"        element={<LandingPage />} />
        <Route path="/booking" element={<Booking />} />

        {/* Authentication */}
        <Route path="/register"       element={<Registration />} />
        <Route path="/login"          element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/profile"        element={<Profile />} />

        {/* Event registration */}
        <Route path="/event-register" element={<EventRegistration />} />
        <Route path="/thank-you"      element={<ThankYou />} />

        {/* Dashboard */}
        <Route path="/dashboard"      element={<DashboardClient />} />
      </Routes>
      <PetChatWidget />
    </>
  );
}
