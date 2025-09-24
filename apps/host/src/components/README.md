# Login System Documentation

## Overview
The SEAMS application now includes a comprehensive login system with demo users and authentication functionality.

## Features

### 1. Login Page (`/login`)
- **Demo User Selection**: Quick login with pre-configured demo users
- **Google OAuth**: Placeholder for Google authentication (not implemented in demo)
- **Manual Login**: Traditional username/password login form
- **Responsive Design**: Matches the provided UI mockups

### 2. Demo Users
The following demo users are available for testing:

| Name | Role | Department | Username | Password |
|------|------|------------|----------|----------|
| John Anderson | Regional Manager | Regional Operations | @regional.manager | demo123 |
| Rajesh Kumar | Plant Manager | Plant Operations | @plant.manager | demo123 |
| Priya Sharma | Maintenance Manager | Maintenance | @maintenance.manager | demo123 |
| Vikram Singh | Asset Manager | Asset Management | @asset.manager | demo123 |
| Amit Patel | Maintenance Technician | Field Operations | @technician.user | demo123 |
| Sarah Thompson | Executive | Executive Management | @executive.user | demo123 |

### 3. Authentication Flow
1. **Unauthenticated Access**: Users are redirected to `/login`
2. **Login Options**:
   - Click on any demo user card for quick login
   - Use manual login with username/email and password
   - Google OAuth (placeholder)
3. **Post-Login**: Users are redirected to the home page
4. **Session Persistence**: Login state is maintained in localStorage
5. **Logout**: Available through the user menu in the navigation

### 4. Protected Routes
All main application routes are protected:
- `/` (Home Page)
- `/workorder/*` (Work Order Microfrontend)
- `/asset/*` (Asset Microfrontend)

### 5. User Context
The authenticated user information is available throughout the application via the `useAuth()` hook:
```typescript
const { user, isAuthenticated, login, logout } = useAuth();
```

## Technical Implementation

### Files Created/Modified:
- `src/data/demoUsers.json` - Demo user data
- `src/services/authApi.ts` - Mock authentication API
- `src/context/AuthContext.tsx` - Authentication context provider
- `src/components/Login.tsx` - Login page component
- `src/components/ProtectedRoute.tsx` - Route protection component
- `src/App.tsx` - Updated with authentication routing
- `src/components/Navigation.tsx` - Updated with logout functionality

### Authentication API Methods:
- `login(credentials)` - Manual login with username/password
- `loginWithDemoUser(userId)` - Quick login with demo user
- `getCurrentUser()` - Get current authenticated user
- `logout()` - Clear authentication state
- `isAuthenticated()` - Check authentication status

## Usage Instructions

1. **Start the application**: `npm run dev`
2. **Access the login page**: Navigate to `http://localhost:3000/login`
3. **Login options**:
   - Click any demo user card for instant login
   - Or use manual login with any demo user credentials
4. **Navigate the app**: After login, access all protected routes
5. **Logout**: Click user menu → Sign Out

## Security Notes
- This is a demo implementation with mock authentication
- Passwords are stored in plain text (not for production)
- Session persistence uses localStorage (consider httpOnly cookies for production)
- No actual Google OAuth integration (placeholder only)
