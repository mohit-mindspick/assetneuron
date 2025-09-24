# User Profile API Service

This service provides a mock implementation for fetching user profile data. It's designed to be easily replaceable with a real REST API.

## Current Implementation

The service currently uses mock data from `../data/userProfile.json` with simulated API delays.

## Files Structure

- `userProfileApi.ts` - Main API service with mock implementation
- `../data/userProfile.json` - Mock data file
- `../hooks/useUserProfile.ts` - React hooks for consuming the API

## API Methods

### `UserProfileApiService.getUserProfile()`
Fetches user profile data.

**Mock Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user-001",
      "firstName": "John",
      "lastName": "Anderson",
      "email": "John.Anderson@work.com",
      "role": "Regional Manager",
      "avatar": {
        "initials": "JA",
        "backgroundColor": "#9e9e9e"
      },
      "profile": {
        "department": "Operations",
        "location": "Regional Office",
        "employeeId": "EMP-001",
        "joinDate": "2022-01-15"
      }
    }
  },
  "message": "User profile data fetched successfully"
}
```

### `UserProfileApiService.updateUserProfile(profileData)`
Updates user profile data.

### `UserProfileApiService.signOut()`
Signs out the user.

## Replacing with Real API

To replace the mock API with a real REST API:

1. **Update the API service methods** in `userProfileApi.ts`:
   ```typescript
   static async getUserProfile(): Promise<UserProfileApiResponse> {
     try {
       const response = await fetch('/api/user/profile', {
         method: 'GET',
         headers: {
           'Content-Type': 'application/json',
           'Authorization': `Bearer ${getAuthToken()}`
         }
       });
       
       if (!response.ok) {
         throw new Error(`HTTP error! status: ${response.status}`);
       }
       
       const data = await response.json();
       return {
         success: true,
         data: data,
         message: 'User profile data fetched successfully'
       };
     } catch (error) {
       console.error('API Error:', error);
       return {
         success: false,
         data: { user: {} as UserProfile },
         message: 'Failed to fetch user profile data'
       };
     }
   }
   ```

2. **Update API endpoints** to match your backend:
   - `GET /api/user/profile` - Get user profile
   - `PUT /api/user/profile` - Update user profile
   - `POST /api/auth/signout` - Sign out user

3. **Add authentication** if required:
   ```typescript
   // Add to headers
   'Authorization': `Bearer ${getAuthToken()}`
   ```

4. **Update error handling** for real API responses:
   ```typescript
   if (!response.ok) {
     const errorData = await response.json();
     throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
   }
   ```

## Data Structure

The API expects the following data structure:

```typescript
interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  avatar: {
    initials: string;
    backgroundColor: string;
  };
  profile: {
    department: string;
    location: string;
    employeeId: string;
    joinDate: string;
  };
}
```

## Usage in Components

The service is consumed through React hooks:

```typescript
import { useUserProfile } from '../hooks/useUserProfile';

const MyComponent = () => {
  const { user, loading, error, signOut, updateProfile } = useUserProfile();
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      <h1>{user?.firstName} {user?.lastName}</h1>
      <p>{user?.email}</p>
      <p>{user?.role}</p>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
};
```

## Benefits of This Architecture

1. **Easy Migration**: Mock API can be replaced with real API by updating only the service methods
2. **Type Safety**: Full TypeScript support with proper interfaces
3. **Error Handling**: Consistent error handling across all API calls
4. **Loading States**: Built-in loading and error states for UI components
5. **Caching**: Hooks can be extended to include caching mechanisms
6. **Testing**: Mock implementation makes unit testing easier
7. **Authentication**: Built-in support for authentication tokens
8. **Real-time Updates**: Hooks can be extended to support real-time profile updates