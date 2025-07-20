import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { checkAdminStatus } from '../services/userService';

export function useAdmin() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const checkAuthAndAdmin = async () => {
      try {
        // Get current user
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          if (isMounted) {
            setUser(null);
            setIsAdmin(false);
            setLoading(false);
          }
          return;
        }

        // Check admin status
        const adminStatus = await checkAdminStatus(user.id);
        
        if (isMounted) {
          setUser(user);
          setIsAdmin(adminStatus);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
        if (isMounted) {
          setUser(null);
          setIsAdmin(false);
          setLoading(false);
        }
      }
    };

    checkAuthAndAdmin();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          const adminStatus = await checkAdminStatus(session.user.id);
          if (isMounted) {
            setUser(session.user);
            setIsAdmin(adminStatus);
            setLoading(false);
          }
        } else if (event === 'SIGNED_OUT') {
          if (isMounted) {
            setUser(null);
            setIsAdmin(false);
            setLoading(false);
          }
        }
      }
    );

    return () => {
      isMounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  return { isAdmin, loading, user };
} 