// RequireAdmin.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function RequireAdmin({ children }) {
  const { user, loading, isAuthenticated, isAdmin, userProfile } = useAuth();
  const location = useLocation();

  // Debug logging
  console.log('[RequireAdmin] State:', {
    isAuthenticated,
    isAdmin,
    loading,
    user: user ? { id: user.id, email: user.email } : null,
    userProfile: userProfile ? { role: userProfile.role, is_admin: userProfile.is_admin } : null,
  });

  // Show loading spinner while checking authentication and admin status
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Checking Admin Access...</h2>
          <p className="text-gray-600">Verifying your permissions</p>
          <div className="mt-4 text-sm text-gray-500">
            <p>• Loading user session...</p>
            <p>• Fetching admin status...</p>
            <p>• Validating permissions...</p>
          </div>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    console.log('[RequireAdmin] User not authenticated, redirecting to login');
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }

  // Check admin status with fallback to user metadata
  let userIsAdmin = isAdmin;
  
  // If userProfile is null (database timeout) but user is authenticated, 
  // fall back to checking user metadata
  if (!userProfile && user) {
    const userMetadata = user.user_metadata;
    const isAdminFromMetadata = ['admin', 'super_admin'].includes(userMetadata?.role);
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
