# API Client Wrapper with Axios and Interceptors

This directory contains a centralized API client wrapper built on top of Axios with comprehensive interceptor support for authentication, logging, error handling, and more.

## 🚀 Features

- **Centralized API Client**: Single point of configuration for all API calls
- **Request/Response Interceptors**: Automatic handling of authentication, logging, error handling
- **TypeScript Support**: Full type safety for API requests and responses
- **Error Handling**: Standardized error handling across all API calls
- **Retry Logic**: Automatic retry for failed requests
- **Performance Monitoring**: Request timing and performance tracking
- **Environment-based Configuration**: Different setups for development and production

## 📁 Files Structure

```
services/
├── apiClient.ts          # Main API client with Axios wrapper
├── interceptors.ts       # Pre-built interceptors for common use cases
├── apiSetup.ts          # Configuration and setup functions
├── exampleApiService.ts  # Example service showing real API usage
├── userProfileApi.ts     # Updated to use new API client
├── authApi.ts           # Authentication API (can be updated)
├── localeApi.ts         # Locale API (can be updated)
└── navigationApi.ts      # Navigation API (can be updated)
```

## 🛠️ Setup and Configuration

### 1. Basic Setup

The API client is automatically configured when you import it:

```typescript
import { apiClient } from './services/apiClient';
import { setupApiClient } from './services/apiSetup';

// Setup with default interceptors
setupApiClient();
```

### 2. Environment-based Setup

```typescript
import { setupDevelopmentApiClient, setupProductionApiClient } from './services/apiSetup';

// For development
setupDevelopmentApiClient();

// For production
setupProductionApiClient();

// Auto-setup based on NODE_ENV
import { setupApiClientForEnvironment } from './services/apiSetup';
setupApiClientForEnvironment();
```

### 3. Custom Configuration

```typescript
import { ApiClient } from './services/apiClient';

const customApiClient = new ApiClient({
  baseURL: 'https://api.example.com/v1',
  timeout: 15000,
  headers: {
    'X-Custom-Header': 'value',
  },
});
```

## 🔧 Available Interceptors

### Request Interceptors

- **Authentication**: Automatically adds auth tokens
- **Request ID**: Adds unique request IDs for tracking
- **Content Type**: Ensures proper content types
- **Loading State**: Manages loading states
- **Performance**: Tracks request timing
- **Logging**: Detailed request logging

### Response Interceptors

- **Success Handling**: Processes successful responses
- **Loading State**: Manages loading states
- **Performance**: Tracks response timing
- **Logging**: Detailed response logging

### Error Interceptors

- **Error Handling**: Centralized error processing
- **Retry Logic**: Automatic retry for failed requests
- **Loading State**: Manages loading states
- **Logging**: Detailed error logging

## 📝 Usage Examples

### Basic API Calls

```typescript
import { apiClient } from './services/apiClient';

// GET request
const response = await apiClient.get<UserProfile>('/user/profile');

// POST request
const response = await apiClient.post<LoginResponse>('/auth/login', {
  username: 'user',
  password: 'pass'
});

// PUT request
const response = await apiClient.put<UserProfile>('/user/profile', profileData);

// DELETE request
const response = await apiClient.delete<{success: boolean}>('/user/profile');
```

### Using in Service Classes

```typescript
import { apiClient } from './services/apiClient';
import { ApiResponse } from '../types/api';

export class UserService {
  static async getUserProfile(): Promise<ApiResponse<UserProfile>> {
    try {
      const response = await apiClient.get<UserProfile>('/user/profile');
      return response;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  }

  static async updateUserProfile(data: Partial<UserProfile>): Promise<ApiResponse<UserProfile>> {
    try {
      const response = await apiClient.put<UserProfile>('/user/profile', data);
      return response;
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  }
}
```

### File Upload Example

```typescript
const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await apiClient.post<{url: string}>('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  return response;
};
```

### Query Parameters

```typescript
const getUsers = async (page: number, limit: number, search?: string) => {
  const response = await apiClient.get<User[]>('/users', {
    params: {
      page,
      limit,
      ...(search && { search }),
    },
  });
  
  return response;
};
```

## 🔐 Authentication

The authentication interceptor automatically adds auth tokens to requests:

```typescript
// Token is automatically added from localStorage
const response = await apiClient.get('/protected-endpoint');
```

To set the auth token:

```typescript
localStorage.setItem('auth_token', 'your-jwt-token');
```

## 🚨 Error Handling

The API client provides standardized error handling:

```typescript
try {
  const response = await apiClient.get('/data');
  // Handle success
} catch (error) {
  // error is of type ApiError with:
  // - message: string
  // - status: number
  // - code: string
  // - details?: any
  
  console.error('API Error:', error.message);
  console.error('Status:', error.status);
  console.error('Code:', error.code);
}
```

## 🔄 Retry Logic

Failed requests are automatically retried with exponential backoff:

- Network errors: 3 retries
- 5xx server errors: 3 retries
- 4xx client errors: No retry

## 📊 Performance Monitoring

Request timing is automatically tracked:

```typescript
// Performance data is logged to console
// You can also send to analytics services
```

## 🎛️ Custom Interceptors

You can add custom interceptors:

```typescript
import { apiClient } from './services/apiClient';

// Custom request interceptor
apiClient.addRequestInterceptor((config) => {
  config.headers = {
    ...config.headers,
    'X-Custom-Header': 'value',
  };
  return config;
});

// Custom response interceptor
apiClient.addResponseInterceptor((response) => {
  // Transform response data
  response.data = transformData(response.data);
  return response;
});

// Custom error interceptor
apiClient.addErrorInterceptor(async (error) => {
  // Custom error handling
  if (error.response?.status === 401) {
    // Redirect to login
    window.location.href = '/login';
  }
  throw error;
});
```

## 🌍 Environment Variables

Configure the API base URL using environment variables:

```bash
# .env
REACT_APP_API_BASE_URL=https://api.example.com/v1
```

## 🔧 Configuration Options

```typescript
import { setupApiClient } from './services/apiSetup';

setupApiClient({
  enableAuth: true,           // Enable authentication interceptor
  enableRequestId: true,      // Enable request ID tracking
  enableContentType: true,    // Enable content type handling
  enableErrorHandling: true,  // Enable error handling
  enableRetry: true,          // Enable retry logic
  enableLoading: false,       // Enable loading state management
  enablePerformance: true,    // Enable performance monitoring
  enableDetailedLogging: true, // Enable detailed logging
  enableProductionLogging: true, // Enable production logging
});
```

## 🧪 Testing

The API client can be easily mocked for testing:

```typescript
// Mock the API client
jest.mock('./services/apiClient', () => ({
  apiClient: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  },
}));
```

## 📚 Migration Guide

### From Mock to Real API

1. **Update service methods** to use `apiClient` instead of mock data
2. **Replace mock delays** with real API calls
3. **Update error handling** to use the standardized error format
4. **Test thoroughly** with real API endpoints

### Example Migration

**Before (Mock):**
```typescript
static async getUserProfile() {
  await new Promise(resolve => setTimeout(resolve, 150));
  return { success: true, data: mockData };
}
```

**After (Real API):**
```typescript
static async getUserProfile() {
  const response = await apiClient.get<UserProfile>('/user/profile');
  return response;
}
```

## 🚀 Best Practices

1. **Use TypeScript**: Always type your API responses
2. **Handle Errors**: Always wrap API calls in try-catch blocks
3. **Use Interceptors**: Leverage interceptors for common functionality
4. **Environment Configuration**: Use different configs for dev/prod
5. **Performance Monitoring**: Monitor API performance in production
6. **Error Logging**: Log errors for debugging and monitoring

## 🔍 Debugging

Enable detailed logging for debugging:

```typescript
setupApiClient({
  enableDetailedLogging: true,
  enablePerformance: true,
});
```

This will log:
- Request details (method, URL, headers, data)
- Response details (status, headers, data)
- Performance metrics (request duration)
- Error details (status, message, stack trace)

## 📞 Support

For questions or issues with the API client, please refer to:
- Axios documentation: https://axios-http.com/
- TypeScript documentation: https://www.typescriptlang.org/
- React documentation: https://reactjs.org/