// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import PetChatWidget from './components/PetChatWidget';

// Public pages
import LandingPage     from "./pages/LandingPage.jsx";
import Booking         from "./pages/Booking.jsx";
import PrivacyPolicy   from "./pages/PrivacyPolicy.jsx";

// Dashboard
import DashboardClient from "./pages/DashboardClient.jsx";
import RequireAuth from "./components/RequireAuth";
import RequireAdmin from "./components/RequireAdmin";
import RoleGuard, { AdminGuard, UserGuard } from "./components/RoleGuard";
import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";
import Unauthorized from "./pages/Unauthorized.jsx";

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

// Example component
import AuthExample from "./components/AuthExample.jsx";

export default function App() {
  return (
    <>
      <Routes>
        {/* Public */}
        <Route path="/"              element={<LandingPage />} />
        <Route path="/booking"       element={<Booking />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />

        {/* Authentication */}
        <Route path="/register"       element={<Registration />} />
        <Route path="/login"          element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/profile"        element={<Profile />} />

        {/* Event registration */}
        <Route path="/event-register" element={<EventRegistration />} />
        <Route path="/thank-you"      element={<ThankYou />} />

        {/* User Dashboard - Using RequireAuth (legacy) */}
        <Route path="/dashboard" element={
          <RequireAuth>
            <DashboardClient />
          </RequireAuth>
        } />

        {/* User Dashboard - Using UserGuard (new approach) */}
        <Route path="/dashboard-new" element={
          <UserGuard>
            <DashboardClient />
          </UserGuard>
        } />

        {/* Admin Dashboard - Using RequireAdmin (legacy) */}
        <Route path="/admin" element={
          <RequireAdmin>
            <AdminDashboard />
          </RequireAdmin>
        } />

        {/* Admin Dashboard - Using AdminGuard (new approach) */}
        <Route path="/admin-new" element={
          <AdminGuard>
            <AdminDashboard />
          </AdminGuard>
        } />

        {/* Example of custom role-based route */}
        <Route path="/manager" element={
          <RoleGuard requiredRoles={['admin', 'manager']}>
            <div>Manager Dashboard</div>
          </RoleGuard>
        } />

        {/* Unauthorized Page */}
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Example Route - Remove this in production */}
        <Route path="/auth-example" element={<AuthExample />} />
      </Routes>
      <PetChatWidget />
    </>
  );
}
