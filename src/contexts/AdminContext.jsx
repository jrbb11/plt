import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { checkAdminStatus } from '../services/userService';

const AdminContext = createContext();

function AdminProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [adminCache, setAdminCache] = useState(new Map());

  // Main effect: only run on mount
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const check = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!isMounted) return;
      setUser(user);

      if (!user) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      // Check cache first
      if (adminCache.has(user.id)) {
        setIsAdmin(adminCache.get(user.id));
        setLoading(false);
        return;
      }

      // Try DB check with timeout
      try {
        const isAdminDb = await Promise.race([
          checkAdminStatus(user.id),
          new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 8000))
        ]);
        if (!isMounted) return;
        setIsAdmin(isAdminDb);
        setAdminCache(prev => new Map(prev).set(user.id, isAdminDb));
        setLoading(false);
      } catch (err) {
        // Only fallback to metadata if DB check fails/times out
        const userMetadata = user.user_metadata;
        const isAdminFromMetadata = userMetadata?.role === 'admin' || userMetadata?.is_admin === true;
        if (isMounted) {
          setIsAdmin(isAdminFromMetadata);
          setLoading(false);
        }
      }
    };

    check();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!isMounted) return;
        if (event === 'SIGNED_IN' && session?.user) {
          setUser(session.user);
          setLoading(true);

          if (adminCache.has(session.user.id)) {
            setIsAdmin(adminCache.get(session.user.id));
            setLoading(false);
            return;
          }

          try {
            const isAdminDb = await Promise.race([
              checkAdminStatus(session.user.id),
              new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 8000))
            ]);
            if (!isMounted) return;
            setIsAdmin(isAdminDb);
            setAdminCache(prev => new Map(prev).set(session.user.id, isAdminDb));
            setLoading(false);
          } catch (dbError) {
            const userMetadata = session.user.user_metadata;
            const isAdminFromMetadata = userMetadata?.role === 'admin' || userMetadata?.is_admin === true;
            setIsAdmin(isAdminFromMetadata);
            setLoading(false);
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setIsAdmin(false);
          setLoading(false);
        }
      }
    );

    return () => {
      isMounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  const value = {
    isAdmin,
    loading,
    user,
    setIsAdmin,
    setUser
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
}

function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}

export { AdminProvider, useAdmin };