// RequireAdmin.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function RequireAdmin({ children }) {
  const { user, loading, isAuthenticated, isAdmin, userProfile } = useAuth();
  const location = useLocation();

  // Detailed debug logs
  console.log('[RequireAdmin] State:', {
    isAuthenticated,
    isAdmin,
    loading,
    user,
    userProfile,
    userId: user?.id,
    userEmail: user?.email,
    role: userProfile?.role,
  });

  // Show loading spinner while checking authentication and admin status
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <div className="ml-4 text-lg text-blue-600">Checking admin access...</div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }

  // Check admin status with fallback to user metadata
  let userIsAdmin = isAdmin;
  
  // If userProfile is null (database timeout) but user is authenticated, 
  // fall back to checking user metadata
  if (!userProfile && user) {
    const userMetadata = user.user_metadata;
    const isAdminFromMetadata = userMetadata?.role === 'admin' || userMetadata?.is_admin === true;
    userIsAdmin = isAdminFromMetadata;
    console.log('[RequireAdmin] Using metadata fallback for admin check:', {
      userMetadata,
      isAdminFromMetadata,
      userIsAdmin
    });
  }

  // Redirect to unauthorized page if authenticated but not admin
  if (!userIsAdmin) {
    console.log('[RequireAdmin] User is not admin, redirecting to unauthorized');
    return <Navigate to="/unauthorized" replace />;
  }

  // If admin, render children
  console.log('[RequireAdmin] Admin access granted');
  return children;
}
