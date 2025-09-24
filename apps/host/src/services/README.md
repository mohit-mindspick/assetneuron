# Navigation API Service

This service provides a mock implementation for fetching navigation data (sites). It's designed to be easily replaceable with a real REST API.

## Current Implementation

The service currently uses mock data from `../data/navigation.json` with simulated API delays.

## Files Structure

- `navigationApi.ts` - Main API service with mock implementation
- `../data/navigation.json` - Mock data file
- `../hooks/useNavigationData.ts` - React hooks for consuming the API

## API Methods

### `NavigationApiService.getSites()`
Fetches all sites data.

**Mock Response:**
```json
{
  "success": true,
  "data": {
    "sites": [
      {
        "id": "pune",
        "name": "Pune Plant",
        "status": "ACTIVE",
        "location": "Maharashtra",
        "type": "Site"
      }
    ]
  },
  "message": "Sites data fetched successfully"
}
```

### `NavigationApiService.getSiteById(siteId: string)`
Fetches a specific site by ID.

### `NavigationApiService.getSitesByType(type: Site['type'])`
Fetches sites filtered by type (Region, Site, Location, Building, Floor).

## Replacing with Real API

To replace the mock API with a real REST API:

1. **Update the API service methods** in `navigationApi.ts`:
   ```typescript
   static async getSites(): Promise<NavigationApiResponse> {
     try {
       const response = await fetch('/api/sites', {
         method: 'GET',
         headers: {
           'Content-Type': 'application/json',
           // Add authentication headers if needed
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
         message: 'Sites data fetched successfully'
       };
     } catch (error) {
       console.error('API Error:', error);
       return {
         success: false,
         data: { sites: [] },
         message: 'Failed to fetch sites data'
       };
     }
   }
   ```

2. **Update API endpoints** to match your backend:
   - `/api/sites` - Get all sites
   - `/api/sites/:id` - Get site by ID
   - `/api/sites?type=:type` - Get sites by type

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
interface Site {
  id: string;
  name: string;
  status: 'ACTIVE' | 'INACTIVE';
  location: string;
  type: 'Region' | 'Site' | 'Location' | 'Building' | 'Floor';
}
```

## Usage in Components

The service is consumed through React hooks:

```typescript
import { useNavigationData } from '../hooks/useNavigationData';

const MyComponent = () => {
  const { sites, loading, error, refetch } = useNavigationData();
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      {sites.map(site => (
        <div key={site.id}>{site.name}</div>
      ))}
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