import { supabase } from '../supabaseClient';

export async function getUserById(id) {
  return supabase.from('user_roles').select('*').eq('user_id', id).single();
}

export async function getUserByEmail(email) {
  return supabase.from('user_roles').select('*').eq('email', email).single();
}

export async function createUser(user) {
  return supabase.from('user_roles').insert([user]);
}

export async function updateUser(id, updates) {
  return supabase.from('user_roles').update(updates).eq('user_id', id);
}

export async function getAllUsers() {
  return supabase.from('user_roles').select('*');
}

export async function deleteUser(id) {
  return supabase.from('user_roles').delete().eq('user_id', id);
}

export async function checkAdminStatus(userId) {
  // Validate userId
  if (!userId || typeof userId !== 'string') {
    console.error('Invalid userId provided to checkAdminStatus:', userId);
    return false;
  }
  
  const maxRetries = 3;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`Checking admin status for user: ${userId} (attempt ${attempt}/${maxRetries})`);
      
      // Add timeout to prevent hanging
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Database query timeout')), 10000);
      });
      
      const userPromise = getUserById(userId);
      
      const { data: userData, error } = await Promise.race([userPromise, timeoutPromise]);
      
      if (error) {
        console.error('Error fetching user data:', error);
        throw error;
      }
      
      if (!userData) {
        console.error('No user data returned from database');
        return false;
      }
      
      console.log('User data:', userData);
      console.log('User role field:', userData?.role);
      
      // Admin if role is admin or super_admin
      const isAdmin = userData?.role === 'admin' || userData?.role === 'super_admin';
      console.log('Is admin:', isAdmin);
      console.log('Role check (admin/super_admin):', userData?.role);
      
      return isAdmin;
    } catch (error) {
      console.error(`Error checking admin status (attempt ${attempt}/${maxRetries}):`, error);
      
      if (attempt === maxRetries) {
        console.error('All retry attempts failed, returning false');
        return false;
      }
      
      // Wait a bit before retrying
      await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
    }
  }
  
  return false;
} 