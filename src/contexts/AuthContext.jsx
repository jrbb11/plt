import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { getUserById } from '../services/userService';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [profileCache, setProfileCache] = useState(new Map());

  // Fetch user profile from userall table with timeout and retry logic
  const fetchUserProfile = async (userId) => {
    if (!userId) return null;
    
    // Check cache first
    if (profileCache.has(userId)) {
      console.log(`[AuthContext] Using cached profile for ${userId}`);
      return profileCache.get(userId);
    }
    
    const maxRetries = 2;
    const timeout = 5000; // 5 seconds timeout
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`[AuthContext] Fetching user profile for ${userId} (attempt ${attempt}/${maxRetries})`);
        
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error('Database query timeout')), timeout);
        });
        
        const userPromise = getUserById(userId);
        
        const { data, error } = await Promise.race([userPromise, timeoutPromise]);
        
        if (error) {
          console.error('Error fetching user profile:', error);
          throw error;
        }
        
        console.log(`[AuthContext] Successfully fetched user profile for ${userId}`);
        
        // Cache the result
        setProfileCache(prev => new Map(prev).set(userId, data));
        
        return data;
      } catch (error) {
        console.error(`[AuthContext] Error fetching user profile (attempt ${attempt}/${maxRetries}):`, error);
        
        if (attempt === maxRetries) {
          console.warn(`[AuthContext] All retry attempts failed for user ${userId}, returning null`);
          return null;
        }
        
        // Wait before retrying (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
      }
    }
    
    return null;
  };

  // Initialize auth state
  useEffect(() => {
    let isMounted = true;

    const initializeAuth = async () => {
      try {
        // Get initial session
        const { data: { session: initialSession } } = await supabase.auth.getSession();
        
        if (!isMounted) return;

        setSession(initialSession);
        setUser(initialSession?.user ?? null);

        // If we have a session, fetch the user profile
        if (initialSession?.user) {
          const profile = await fetchUserProfile(initialSession.user.id);
          if (isMounted) {
            setUserProfile(profile);
          }
        }

        setLoading(false);
      } catch (error) {
        console.error('Error initializing auth:', error);
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!isMounted) return;

        console.log('Auth state changed:', event, session?.user?.id);
        
        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          // Fetch user profile when user signs in
          const profile = await fetchUserProfile(session.user.id);
          if (isMounted) {
            setUserProfile(profile);
          }
        } else {
          // Clear user profile when user signs out
          setUserProfile(null);
        }

        setLoading(false);
      }
    );

    return () => {
      isMounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  // Logout function
  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error signing out:', error);
        throw error;
      }
      
      // Clear local state and cache
      setUser(null);
      setUserProfile(null);
      setSession(null);
      setProfileCache(new Map());
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  // Refresh user profile
  const refreshUserProfile = async () => {
    if (!user?.id) return;
    
    try {
      // Clear cache for this user to force fresh fetch
      setProfileCache(prev => {
        const newCache = new Map(prev);
        newCache.delete(user.id);
        return newCache;
      });
      
      const profile = await fetchUserProfile(user.id);
      setUserProfile(profile);
      return profile;
    } catch (error) {
      console.error('Error refreshing user profile:', error);
      throw error;
    }
  };

  const value = {
    user,
    userProfile,
    session,
    loading,
    logout,
    refreshUserProfile,
    isAuthenticated: !!user,
    isAdmin: userProfile?.role === 'admin' || userProfile?.is_admin === true,
    role: userProfile?.role || null
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 