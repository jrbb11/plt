import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useRoleGuard, useAdminGuard, useHasRole } from '../hooks/useRoleGuard';
import LogoutButton from './LogoutButton';

/**
 * Example component demonstrating AuthContext usage
 */
export default function AuthExample() {
  const { 
    user, 
    userProfile, 
    session, 
    loading, 
    isAuthenticated, 
    isAdmin, 
    role,
    logout,
    refreshUserProfile 
  } = useAuth();

  // Example of using role guard hooks
  const adminGuard = useAdminGuard();
  const userGuard = useRoleGuard(['user', 'admin']);
  const hasManagerRole = useHasRole('manager');

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <div className="ml-4 text-lg text-blue-600">Loading auth state...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Authentication Example</h1>
      
      {/* Authentication Status */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Authentication Status</h2>
        <div className="space-y-2">
          <p><strong>Authenticated:</strong> {isAuthenticated ? 'Yes' : 'No'}</p>
          <p><strong>Loading:</strong> {loading ? 'Yes' : 'No'}</p>
          <p><strong>Role:</strong> {role || 'None'}</p>
          <p><strong>Is Admin:</strong> {isAdmin ? 'Yes' : 'No'}</p>
        </div>
      </div>

      {/* User Information */}
      {isAuthenticated && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">User Information</h2>
          <div className="space-y-2">
            <p><strong>User ID:</strong> {user?.id}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Session Expires:</strong> {session?.expires_at ? new Date(session.expires_at * 1000).toLocaleString() : 'N/A'}</p>
          </div>
        </div>
      )}

      {/* User Profile from userall table */}
      {userProfile && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">User Profile (userall table)</h2>
          <div className="space-y-2">
            <p><strong>Role:</strong> {userProfile.role}</p>
            <p><strong>Is Admin:</strong> {userProfile.is_admin ? 'Yes' : 'No'}</p>
            <p><strong>Created At:</strong> {userProfile.created_at ? new Date(userProfile.created_at).toLocaleString() : 'N/A'}</p>
            <p><strong>Updated At:</strong> {userProfile.updated_at ? new Date(userProfile.updated_at).toLocaleString() : 'N/A'}</p>
            {/* Add more fields as needed */}
          </div>
        </div>
      )}

      {/* Role Guard Examples */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Role Guard Examples</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium">Admin Guard:</h3>
            <p>Has Access: {adminGuard.hasAccess ? 'Yes' : 'No'}</p>
            <p>Reason: {adminGuard.reason}</p>
          </div>
          
          <div>
            <h3 className="font-medium">User/Admin Guard:</h3>
            <p>Has Access: {userGuard.hasAccess ? 'Yes' : 'No'}</p>
            <p>Reason: {userGuard.reason}</p>
          </div>
          
          <div>
            <h3 className="font-medium">Has Manager Role:</h3>
            <p>{hasManagerRole ? 'Yes' : 'No'}</p>
          </div>
        </div>
      </div>

      {/* Conditional Rendering Examples */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Conditional Rendering Examples</h2>
        <div className="space-y-4">
          {/* Show different content based on authentication */}
          {!isAuthenticated ? (
            <div className="p-4 bg-yellow-100 rounded">
              <p>Please log in to access this content.</p>
            </div>
          ) : (
            <div className="p-4 bg-green-100 rounded">
              <p>Welcome! You are logged in.</p>
            </div>
          )}

          {/* Show admin-specific content */}
          {isAdmin && (
            <div className="p-4 bg-blue-100 rounded">
              <p>🔧 Admin Panel: You have administrative privileges.</p>
            </div>
          )}

          {/* Show role-specific content */}
          {role === 'user' && (
            <div className="p-4 bg-green-100 rounded">
              <p>👤 User Dashboard: Welcome to your user dashboard.</p>
            </div>
          )}

          {/* Show content for specific roles */}
          {['admin', 'manager'].includes(role) && (
            <div className="p-4 bg-purple-100 rounded">
              <p>🎯 Management Tools: You have management privileges.</p>
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      {isAuthenticated && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Actions</h2>
          <div className="space-y-4">
            <button
              onClick={refreshUserProfile}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Refresh User Profile
            </button>
            
            <div>
              <LogoutButton 
                text="Sign Out" 
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              />
            </div>
          </div>
        </div>
      )}

      {/* Debug Information */}
      <div className="bg-gray-100 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Debug Information</h2>
        <details className="space-y-2">
          <summary className="cursor-pointer font-medium">Click to expand debug info</summary>
          <pre className="bg-white p-4 rounded text-sm overflow-auto">
            {JSON.stringify({
              user: user ? { id: user.id, email: user.email } : null,
              userProfile,
              session: session ? { expires_at: session.expires_at } : null,
              authState: { isAuthenticated, isAdmin, role, loading }
            }, null, 2)}
          </pre>
        </details>
      </div>
    </div>
  );
} 