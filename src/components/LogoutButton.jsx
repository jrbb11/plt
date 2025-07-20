import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

/**
 * LogoutButton component with loading state and error handling
 * @param {object} props
 * @param {string} props.className - CSS classes for the button
 * @param {string} props.text - Button text (default: 'Logout')
 * @param {string} props.redirectTo - Where to redirect after logout (default: '/')
 * @param {React.ReactNode} props.children - Custom button content
 */
export default function LogoutButton({ 
  className = '', 
  text = 'Logout', 
  redirectTo = '/',
  children 
}) {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (isLoggingOut) return; // Prevent multiple clicks
    
    setIsLoggingOut(true);
    
    try {
      await logout();
      navigate(redirectTo);
    } catch (error) {
      console.error('Logout failed:', error);
      // You could show a toast notification here
      alert('Logout failed. Please try again.');
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Don't render if no user is logged in
  if (!user) {
    return null;
  }

  const defaultClasses = 'px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors';
  const buttonClasses = className || defaultClasses;

  return (
    <button
      onClick={handleLogout}
      disabled={isLoggingOut}
      className={buttonClasses}
    >
      {children || (
        <>
          {isLoggingOut ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Logging out...
            </>
          ) : (
            text
          )}
        </>
      )}
    </button>
  );
}

/**
 * Simple logout link component
 */
export function LogoutLink({ className = '', text = 'Logout', redirectTo = '/' }) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async (e) => {
    e.preventDefault();
    if (isLoggingOut) return;
    
    setIsLoggingOut(true);
    
    try {
      await logout();
      navigate(redirectTo);
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Logout failed. Please try again.');
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <a
      href="#"
      onClick={handleLogout}
      className={`text-red-600 hover:text-red-800 ${className}`}
      style={{ pointerEvents: isLoggingOut ? 'none' : 'auto' }}
    >
      {isLoggingOut ? 'Logging out...' : text}
    </a>
  );
} 