import { useAuth } from '../contexts/AuthContext';

/**
 * Custom hook for role-based route protection
 * @param {string|string[]} requiredRoles - Single role or array of roles that are allowed
 * @param {boolean} requireAuth - Whether authentication is required (default: true)
 * @returns {object} - Object with access control information
 */
export function useRoleGuard(requiredRoles, requireAuth = true) {
  const { user, userProfile, loading, isAuthenticated, role } = useAuth();

  // If still loading, we can't determine access yet
  if (loading) {
    return {
      hasAccess: false,
      loading: true,
      reason: 'loading'
    };
  }

  // If authentication is required but user is not authenticated
  if (requireAuth && !isAuthenticated) {
    return {
      hasAccess: false,
      loading: false,
      reason: 'unauthenticated'
    };
  }

  // If no roles are required, allow access
  if (!requiredRoles || requiredRoles.length === 0) {
    return {
      hasAccess: true,
      loading: false,
      reason: 'no_roles_required'
    };
  }

  // Convert single role to array for consistent handling
  const rolesArray = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];

  // Determine user role with fallback to metadata
  let userRole = role;
  
  // If userProfile is null (database timeout) but user is authenticated, 
  // fall back to checking user metadata
  if (!userProfile && user) {
    const userMetadata = user.user_metadata;
    userRole = userMetadata?.role || null;
  }

  // Check if user has any of the required roles
  const hasRequiredRole = rolesArray.includes(userRole);

  return {
    hasAccess: hasRequiredRole,
    loading: false,
    reason: hasRequiredRole ? 'authorized' : 'unauthorized',
    userRole: userRole,
    requiredRoles: rolesArray
  };
}

/**
 * Hook specifically for admin access
 * @returns {object} - Object with admin access control information
 */
export function useAdminGuard() {
  return useRoleGuard(['admin']);
}

/**
 * Hook for checking if user has specific role
 * @param {string} role - Role to check
 * @returns {boolean} - Whether user has the specified role
 */
export function useHasRole(role) {
  const { user, userProfile, role: userRole } = useAuth();
  
  // If userProfile is null (database timeout) but user is authenticated, 
  // fall back to checking user metadata
  if (!userProfile && user) {
    const userMetadata = user.user_metadata;
    const metadataRole = userMetadata?.role;
    return metadataRole === role;
  }
  
  return userRole === role;
} 