# Admin Authentication Setup

## Overview

The Pet.Love.Travel application now includes a secure admin authentication system that protects admin routes and ensures only users with admin privileges can access the admin dashboard.

## How It Works

### 1. Role-Based Access Control
- Users are assigned roles in the `users` table (`user` or `admin`)
- Admin routes are protected by the `AdminRoute` component
- Only users with `role: "admin"` can access `/admin` routes

### 2. Authentication Flow
1. **Login**: Users log in at `/login` with their email and password
2. **Role Check**: System checks the user's role from the database
3. **Redirect**: 
   - Admin users → `/admin` dashboard
   - Regular users → `/dashboard` or specified redirect URL
4. **Route Protection**: Admin routes automatically redirect unauthorized users

### 3. Components

#### AdminRoute Component
- Protects all admin routes (`/admin/*`)
- Checks authentication and admin role
- Shows loading spinner during checks
- Redirects to login if not authenticated
- Redirects to dashboard with error message if not admin

#### AuthContext
- Manages authentication state across the app
- Provides `user`, `userData`, `isAdmin`, and `loading` states
- Automatically updates when auth state changes

## Setup Instructions

### 1. Database Setup
Ensure your `users` table has a `role` column:
```sql
ALTER TABLE users ADD COLUMN role TEXT DEFAULT 'user';
```

### 2. Create Admin Users
You can create admin users in two ways:

#### Option A: Direct Database Update
```sql
UPDATE users SET role = 'admin' WHERE email = 'admin@example.com';
```

#### Option B: Through Admin Interface
1. Log in as any user
2. Navigate to `/admin/users`
3. Change the role dropdown from "user" to "admin"
4. Save the changes

### 3. Access Admin Dashboard
1. Log in with an admin account at `/login`
2. You'll be automatically redirected to `/admin`
3. Or navigate to `/admin` directly (will redirect to login if not authenticated)

## Admin Features

### Available Admin Routes
- `/admin` - Main admin dashboard
- `/admin/users` - User management (view, edit roles, delete)
- `/admin/bookings` - Booking management (view all bookings, add new bookings)

### Admin Dashboard Features
- User management with role assignment
- Booking management
- Analytics and metrics
- Search and filtering capabilities

## Security Features

### Route Protection
- All `/admin/*` routes are protected
- Unauthorized access attempts are logged
- Users are redirected with appropriate error messages

### Session Management
- Automatic session checking
- Real-time auth state updates
- Secure logout functionality

### Error Handling
- Access denied messages for non-admin users
- Loading states during authentication checks
- Graceful error handling for database issues

## Testing the System

### Test Admin Access
1. Create a user account
2. Update their role to "admin" in the database
3. Log in with that account
4. Navigate to `/admin` - should work

### Test Regular User Access
1. Log in with a regular user account
2. Try to navigate to `/admin` - should redirect to dashboard with error message

### Test Unauthenticated Access
1. Log out
2. Try to navigate to `/admin` - should redirect to login page

## Troubleshooting

### Common Issues

1. **Admin can't access admin routes**
   - Check that the user's `role` field is set to "admin" in the database
   - Verify the user is properly authenticated

2. **Infinite loading on admin routes**
   - Check browser console for errors
   - Verify Supabase connection and permissions

3. **Role changes not reflecting**
   - The AuthContext may need to be refreshed
   - Try logging out and back in

### Debug Mode
To debug authentication issues, check the browser console for:
- Authentication errors
- Database query errors
- Role check results

## Future Enhancements

Potential improvements to consider:
- Admin user creation interface
- Role-based permissions for specific admin features
- Audit logging for admin actions
- Two-factor authentication for admin accounts
- Session timeout and automatic logout 