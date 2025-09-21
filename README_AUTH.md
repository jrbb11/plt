# React + Supabase Authentication & Role-Based Route Protection

This implementation provides persistent authentication and robust admin route protection for React + Supabase apps where user roles are stored in the `userall` table.

## 🎯 Features

- ✅ **Persistent login** with automatic session restoration
- ✅ **Role-based route protection** using `userall` table data
- ✅ **Loading state handling** to prevent premature redirects
- ✅ **Fallback mechanisms** for reliability when database is slow
- ✅ **Caching** to reduce database calls
- ✅ **Retry logic** with exponential backoff
- ✅ **Clean logout** with proper state clearing

## 📁 File Structure

```
src/
├── contexts/
│   └── AuthContext.jsx          # Main authentication context
├── components/
│   ├── RequireAdmin.jsx         # Admin route protection
│   ├── RequireAuth.jsx          # Auth route protection
│   ├── LogoutButton.jsx         # Logout component
│   └── AuthExample.jsx          # Example usage component
└── main.jsx                     # App setup with AuthProvider
```

## 🚀 Quick Start

### 1. Setup AuthProvider

Wrap your app with the `AuthProvider` in `main.jsx`:

```jsx
import { AuthProvider } from './contexts/AuthContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
);
```

### 2. Protect Admin Routes

Use `RequireAdmin` to protect admin-only routes:

```jsx
import RequireAdmin from './components/RequireAdmin';

<Route path="/admin" element={
  <RequireAdmin>
    <AdminDashboard />
  </RequireAdmin>
} />
```

### 3. Use Auth Context

Access authentication state in any component:

```jsx
import { useAuth } from './contexts/AuthContext';

function MyComponent() {
  const { user, userProfile, isAuthenticated, isAdmin, role, logout } = useAuth();
  
  return (
    <div>
      {isAuthenticated ? (
        <>
          <p>Welcome, {user.email}!</p>
          <p>Role: {role}</p>
          {isAdmin && <p>You have admin access!</p>}
          <LogoutButton />
        </>
      ) : (
        <p>Please log in</p>
      )}
    </div>
  );
}
```

## 🔧 How It Works

### Session Restoration
1. **App loads** → `AuthContext` initializes
2. **Check session** → `supabase.auth.getSession()`
3. **If session exists** → Fetch user profile from `userall` table
4. **Cache profile** → Store in memory for faster access
5. **Set state** → Update authentication state

### Route Protection
1. **Route loads** → `RequireAdmin` component mounts
2. **Check loading** → Show spinner if still loading
3. **Check auth** → Redirect to login if not authenticated
4. **Check role** → Use profile data or fallback to metadata
5. **Grant access** → Render protected content or redirect

### Fallback Mechanism
- If database query times out → Use `user.user_metadata.role`
- If profile is null → Check metadata for admin status
- Ensures admin access works even with slow database

## 📊 Database Schema

Ensure your `userall` table has this structure:

```sql
CREATE TABLE userall (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT,
  first_name TEXT,
  last_name TEXT,
  role TEXT DEFAULT 'user',
  is_admin BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 🎨 Usage Examples

### Conditional Rendering

```jsx
function Navigation() {
  const { isAuthenticated, isAdmin, role } = useAuth();
  
  return (
    <nav>
      {isAuthenticated ? (
        <>
          <Link to="/dashboard">Dashboard</Link>
          {isAdmin && <Link to="/admin">Admin</Link>}
          {role === 'manager' && <Link to="/manager">Manager</Link>}
          <LogoutButton />
        </>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </nav>
  );
}
```

### Protected API Calls

```jsx
function AdminPanel() {
  const { userProfile } = useAuth();
  
  const handleAdminAction = async () => {
    if (userProfile?.role !== 'admin') {
      alert('Unauthorized');
      return;
    }
    
    // Proceed with admin action
  };
}
```

### Custom Route Guards

```jsx
function RequireManager({ children }) {
  const { user, userProfile, loading, isAuthenticated } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check for manager role with fallback
  let isManager = userProfile?.role === 'manager';
  if (!userProfile && user) {
    isManager = user.user_metadata?.role === 'manager';
  }

  if (!isManager) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
```

## 🔍 Testing

Visit `/auth-example` to see a comprehensive demo of all features:

- Authentication status
- User profile data
- Role-based access control
- Logout functionality

## 🛠️ Best Practices

### 1. Loading States
Always check `loading` before making auth decisions:

```jsx
if (loading) {
  return <LoadingSpinner />;
}
```

### 2. Fallback Handling
Use metadata fallback for reliability:

```jsx
const userRole = userProfile?.role || user?.user_metadata?.role;
```

### 3. Error Handling
Implement proper error boundaries:

```jsx
try {
  await logout();
} catch (error) {
  console.error('Logout failed:', error);
  // Handle error gracefully
}
```

### 4. Performance
- Profile data is cached to reduce database calls
- Retry logic prevents failures from slow database
- Timeout prevents hanging requests

## 🔧 Troubleshooting

### Common Issues

1. **"Access Denied" after refresh**
   - Check if user exists in `userall` table
   - Verify role field is set to 'admin'
   - Check database permissions

2. **Slow loading times**
   - Profile caching should help
   - Check database performance
   - Consider reducing timeout values

3. **Role not updating**
   - Call `refreshUserProfile()` to force refresh
   - Check database for role changes
   - Verify cache is cleared on logout

### Debug Information

Use the debug logs in the console:
- `[AuthContext]` - Authentication state changes
- `[RequireAdmin]` - Route protection decisions
- Database query attempts and results

## 📚 API Reference

### AuthContext Values

| Property | Type | Description |
|----------|------|-------------|
| `user` | Object \| null | Supabase user object |
| `userProfile` | Object \| null | User data from userall table |
| `session` | Object \| null | Current session |
| `loading` | boolean | Loading state |
| `isAuthenticated` | boolean | Whether user is logged in |
| `isAdmin` | boolean | Whether user has admin role |
| `role` | string \| null | User's role |
| `logout` | function | Logout function |
| `refreshUserProfile` | function | Refresh user profile |

### Components

- `AuthProvider`: Context provider
- `RequireAdmin`: Admin-only route protection
- `RequireAuth`: Authentication-only route protection
- `LogoutButton`: Logout button component
- `AuthExample`: Example usage component

This implementation provides a robust, scalable authentication system that handles persistent login and role-based route protection efficiently! 