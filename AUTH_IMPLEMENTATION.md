# Authentication & Role-Based Route Protection Implementation

This document explains the comprehensive authentication and role-based route protection system implemented in your React + Supabase app.

## Overview

The implementation provides:
- **Persistent login** with automatic session restoration
- **Role-based route protection** using data from the `userall` table
- **Global state management** for user authentication and profile data
- **Reusable components and hooks** for easy integration
- **Best practices** for session and state management

## Architecture

### 1. AuthContext (`src/contexts/AuthContext.jsx`)

The central authentication context that manages:
- Supabase user session
- User profile data from `userall` table
- Loading states
- Logout functionality

**Key Features:**
- Automatic session restoration on app load
- Real-time auth state changes
- User profile fetching and caching
- Role-based access control helpers

**Usage:**
```jsx
import { useAuth } from '../contexts/AuthContext';

function MyComponent() {
  const { 
    user, 
    userProfile, 
    isAuthenticated, 
    isAdmin, 
    role, 
    logout 
  } = useAuth();
  
  // Your component logic
}
```

### 2. Role-Based Protection Components

#### RequireAuth (`src/components/RequireAuth.jsx`)
Protects routes requiring authentication (any logged-in user).

#### RequireAdmin (`src/components/RequireAdmin.jsx`)
Protects routes requiring admin privileges.

#### RoleGuard (`src/components/RoleGuard.jsx`)
Flexible component for custom role-based protection.

**Usage Examples:**
```jsx
// Admin-only route
<AdminGuard>
  <AdminDashboard />
</AdminGuard>

// User-only route
<UserGuard>
  <UserDashboard />
</UserGuard>

// Custom role requirements
<RoleGuard requiredRoles={['admin', 'manager']}>
  <ManagerDashboard />
</RoleGuard>
```

### 3. Custom Hooks (`src/hooks/useRoleGuard.js`)

Provides programmatic access to role-based logic:

```jsx
import { useRoleGuard, useAdminGuard, useHasRole } from '../hooks/useRoleGuard';

function MyComponent() {
  const adminGuard = useAdminGuard();
  const userGuard = useRoleGuard(['user', 'admin']);
  const hasManagerRole = useHasRole('manager');
  
  // Use the guard results
}
```

### 4. Logout Components (`src/components/LogoutButton.jsx`)

Ready-to-use logout components with loading states:

```jsx
import LogoutButton, { LogoutLink } from './LogoutButton';

// Button with loading state
<LogoutButton text="Sign Out" />

// Link version
<LogoutLink text="Logout" />
```

## Setup Instructions

### 1. Provider Setup (`src/main.jsx`)

The app is wrapped with the AuthProvider:

```jsx
import { AuthProvider } from './contexts/AuthContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <AdminProvider>
        <App />
      </AdminProvider>
    </AuthProvider>
  </BrowserRouter>
);
```

### 2. Route Protection

**Legacy Approach (existing):**
```jsx
<Route path="/dashboard" element={
  <RequireAuth>
    <DashboardClient />
  </RequireAuth>
} />

<Route path="/admin" element={
  <RequireAdmin>
    <AdminDashboard />
  </RequireAdmin>
} />
```

**New Approach (recommended):**
```jsx
<Route path="/dashboard" element={
  <UserGuard>
    <DashboardClient />
  </UserGuard>
} />

<Route path="/admin" element={
  <AdminGuard>
    <AdminDashboard />
  </AdminGuard>
} />
```

### 3. Database Schema

Ensure your `userall` table has the following structure:
```sql
CREATE TABLE userall (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT,
  role TEXT DEFAULT 'user',
  is_admin BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  -- Add other fields as needed
);
```

## Usage Patterns

### 1. Conditional Rendering

```jsx
import { useAuth } from '../contexts/AuthContext';

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

### 2. Protected API Calls

```jsx
import { useAuth } from '../contexts/AuthContext';

function AdminPanel() {
  const { user, userProfile } = useAuth();
  
  const handleAdminAction = async () => {
    if (!userProfile?.role === 'admin') {
      alert('Unauthorized');
      return;
    }
    
    // Proceed with admin action
  };
}
```

### 3. Role-Based Content

```jsx
function Dashboard() {
  const { role, isAdmin } = useAuth();
  
  return (
    <div>
      <h1>Dashboard</h1>
      
      {/* User content */}
      <UserContent />
      
      {/* Admin-specific content */}
      {isAdmin && <AdminContent />}
      
      {/* Role-specific content */}
      {role === 'manager' && <ManagerContent />}
    </div>
  );
}
```

## Best Practices

### 1. Session Management
- **Automatic restoration**: Sessions are automatically restored on app load
- **Real-time updates**: Auth state changes are handled in real-time
- **Clean logout**: Properly clears all state and redirects

### 2. Error Handling
- **Graceful degradation**: Falls back to metadata if DB queries fail
- **Loading states**: Always show loading indicators during auth checks
- **Error boundaries**: Implement error boundaries for auth-related errors

### 3. Performance
- **Caching**: User profiles are cached to reduce database calls
- **Lazy loading**: Auth context is loaded only when needed
- **Optimized queries**: Efficient database queries with timeouts

### 4. Security
- **Server-side validation**: Always validate roles on the server
- **Client-side UX**: Client-side checks are for UX only
- **Secure logout**: Properly invalidates sessions

## Testing

### 1. Test Route: `/auth-example`

Visit `/auth-example` to see a comprehensive example of all authentication features:
- Authentication status
- User information
- Role-based access control
- Conditional rendering examples
- Debug information

### 2. Manual Testing

1. **Login Flow:**
   - Visit `/login`
   - Sign in with valid credentials
   - Verify automatic redirect to dashboard
   - Check that user profile is loaded

2. **Role-Based Access:**
   - Try accessing `/admin` as a regular user
   - Verify redirect to `/unauthorized`
   - Login as admin and verify access

3. **Session Persistence:**
   - Login and refresh the page
   - Verify session is maintained
   - Check that user profile is still loaded

4. **Logout Flow:**
   - Click logout button
   - Verify session is cleared
   - Check redirect to home page

## Troubleshooting

### Common Issues

1. **User profile not loading:**
   - Check if user exists in `userall` table
   - Verify database permissions
   - Check network connectivity

2. **Role not updating:**
   - Refresh user profile: `refreshUserProfile()`
   - Check database for role changes
   - Verify role field in `userall` table

3. **Session not persisting:**
   - Check Supabase configuration
   - Verify environment variables
   - Check browser storage settings

### Debug Information

Use the debug information in `/auth-example` to troubleshoot:
- Authentication state
- User profile data
- Session information
- Role assignments

## Migration from Existing System

The new system is designed to work alongside your existing AdminContext:

1. **Gradual Migration:**
   - Keep existing components working
   - Gradually replace with new components
   - Test thoroughly before removing old code

2. **Backward Compatibility:**
   - Existing RequireAuth and RequireAdmin still work
   - New components provide additional features
   - Both systems can coexist

3. **Recommended Migration Path:**
   - Start with new AuthContext
   - Replace route protection gradually
   - Update components to use new hooks
   - Remove old AdminContext when ready

## API Reference

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

### RoleGuard Hook

```jsx
const { hasAccess, loading, reason, userRole, requiredRoles } = useRoleGuard(
  requiredRoles, 
  requireAuth = true
);
```

### Components

- `AuthProvider`: Context provider
- `RequireAuth`: Legacy auth protection
- `RequireAdmin`: Legacy admin protection
- `RoleGuard`: Flexible role protection
- `AdminGuard`: Admin-only protection
- `UserGuard`: User-only protection
- `LogoutButton`: Logout button component
- `LogoutLink`: Logout link component

This implementation provides a robust, scalable authentication system that follows React and Supabase best practices while maintaining backward compatibility with your existing code. 