import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useRoleGuard } from '../hooks/useRoleGuard';

/**
 * RoleGuard component for protecting routes based on user roles
 * @param {object} props
 * @param {string|string[]} props.requiredRoles - Single role or array of roles that are allowed
 * @param {boolean} props.requireAuth - Whether authentication is required (default: true)
 * @param {string} props.redirectTo - Where to redirect unauthorized users (default: '/unauthorized')
 * @param {React.ReactNode} props.children - Components to render if access is granted
 * @param {React.ReactNode} props.fallback - Custom loading component
 */
export default function RoleGuard({ 
  requiredRoles, 
  requireAuth = true, 
  redirectTo = '/unauthorized',
  children, 
  fallback 
}) {
  const { hasAccess, loading, reason } = useRoleGuard(requiredRoles, requireAuth);
  const location = useLocation();

  // Custom loading component
  if (loading) {
    return fallback || (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <div className="ml-4 text-lg text-blue-600">Checking permissions...</div>
      </div>
    );
  }

  // If authentication is required but user is not authenticated
  if (requireAuth && reason === 'unauthenticated') {
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }

  // If user doesn't have required role
  if (!hasAccess) {
    return <Navigate to={redirectTo} replace />;
  }

  // Access granted, render children
  return children;
}

/**
 * AdminGuard component specifically for admin routes
 */
export function AdminGuard({ children, redirectTo = '/unauthorized', fallback }) {
  return (
    <RoleGuard 
      requiredRoles={['admin']} 
      redirectTo={redirectTo}
      fallback={fallback}
    >
      {children}
    </RoleGuard>
  );
}

/**
 * UserGuard component for authenticated users (any role)
 */
export function UserGuard({ children, redirectTo = '/login', fallback }) {
  return (
    <RoleGuard 
      requiredRoles={[]} 
      requireAuth={true}
      redirectTo={redirectTo}
      fallback={fallback}
    >
      {children}
    </RoleGuard>
  );
} 