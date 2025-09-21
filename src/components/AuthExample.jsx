import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import LogoutButton from './LogoutButton';

export default function AuthExample() {
  const { 
    user, 
    userProfile, 
    loading, 
    isAuthenticated, 
    isAdmin, 
    role 
  } = useAuth();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Loading Authentication...</h2>
          <p className="text-gray-600">Checking your login status and permissions</p>
          <div className="mt-4 text-sm text-gray-500">
            <p>• Restoring session...</p>
            <p>• Fetching user profile...</p>
            <p>• Checking admin status...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Authentication Status</h1>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Current State</h2>
        <div className="space-y-2">
          <p><strong>Authenticated:</strong> {isAuthenticated ? 'Yes' : 'No'}</p>
          <p><strong>Loading:</strong> {loading ? 'Yes' : 'No'}</p>
          <p><strong>Role:</strong> {role || 'None'}</p>
          <p><strong>Is Admin:</strong> {isAdmin ? 'Yes' : 'No'}</p>
        </div>
      </div>

      {isAuthenticated && (
        <>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">User Information</h2>
            <div className="space-y-2">
              <p><strong>Email:</strong> {user?.email}</p>
              <p><strong>User ID:</strong> {user?.id}</p>
            </div>
          </div>

          {userProfile && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">User Profile (from userall table)</h2>
              <div className="space-y-2">
                <p><strong>Role:</strong> {userProfile.role}</p>
                <p><strong>Is Admin:</strong> {userProfile.is_admin ? 'Yes' : 'No'}</p>
                <p><strong>First Name:</strong> {userProfile.first_name}</p>
                <p><strong>Last Name:</strong> {userProfile.last_name}</p>
              </div>
            </div>
          )}

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Actions</h2>
            <LogoutButton text="Sign Out" />
          </div>
        </>
      )}

      {!isAuthenticated && (
        <div className="bg-yellow-100 p-4 rounded">
          <p>Please log in to see your profile information.</p>
        </div>
      )}
    </div>
  );
} 