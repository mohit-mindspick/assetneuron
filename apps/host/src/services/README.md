# Locale API Service

This service provides a mock REST API for fetching locale data (languages, countries, timezones) and saving user preferences. It's designed to be easily replaceable with a real API.

## Files Structure

```
src/
├── data/
│   └── localeData.json          # JSON data file with all locale options
├── types/
│   └── api.ts                   # TypeScript interfaces for API responses
├── services/
│   ├── localeApi.ts             # Mock API service implementation
│   └── README.md                # This documentation
└── hooks/
    └── useLocaleData.ts         # React hooks for consuming the API
```

## Current Implementation (Mock API)

The current implementation uses:
- **JSON file**: `src/data/localeData.json` contains all the locale data
- **Mock service**: `src/services/localeApi.ts` simulates API calls with delays
- **React hooks**: `src/hooks/useLocaleData.ts` provides easy-to-use hooks

## Switching to Real API

To switch from mock to real API, you have two options:

### Option 1: Update the existing service

1. **Update the configuration** in `localeApi.ts`:
```typescript
import { switchToRealApi } from './localeApi';

// Replace with your real API configuration
switchToRealApi({
  baseUrl: 'https://your-api.com/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer your-token',
  },
});
```

2. **Replace the mock methods** with real fetch calls:
```typescript
async getLocaleData(): Promise<ApiResponse<LocaleDataResponse>> {
  const response = await fetch(`${this.config.baseUrl}/locale-data`, {
    method: 'GET',
    headers: this.config.headers,
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return await response.json();
}
```

### Option 2: Create a new service

1. **Create a new service file** (e.g., `realLocaleApi.ts`)
2. **Implement the same interface** as the mock service
3. **Update the imports** in your components:
```typescript
// Change from:
import { localeApiService } from '../services/localeApi';

// To:
import { localeApiService } from '../services/realLocaleApi';
```

## API Endpoints

The service expects these endpoints:

### GET `/api/v1/locale-data`
Returns all locale data:
```json
{
  "data": {
    "languages": [
      { "value": "en-US", "label": "English (United States)" }
    ],
    "countries": [
      { "value": "US", "label": "United States of America (USA)" }
    ],
    "timezones": [
      { "value": "EST", "label": "Eastern Standard Time (EST)" }
    ]
  },
  "success": true,
  "message": "Locale data fetched successfully"
}
```

### POST `/api/v1/user/preferences`
Saves user preferences:
```json
{
  "language": "en-US",
  "country": "US", 
  "timezone": "EST"
}
```

Returns:
```json
{
  "data": { "saved": true },
  "success": true,
  "message": "User preferences saved successfully"
}
```

## Features

- ✅ **Loading states**: Shows spinners while data loads
- ✅ **Error handling**: Displays error messages with retry options
- ✅ **TypeScript support**: Full type safety
- ✅ **Easy switching**: Simple configuration to switch APIs
- ✅ **Fallback data**: Uses localStorage as backup
- ✅ **Realistic delays**: Simulates network latency

## Usage in Components

```typescript
import { useLocaleData, useSaveUserPreferences } from '../hooks/useLocaleData';

const MyComponent = () => {
  const { languages, countries, timezones, loading, error, refetch } = useLocaleData();
  const { savePreferences, saving, error: saveError } = useSaveUserPreferences();

  // Use the data in your component
  return (
    <div>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {/* Your component content */}
    </div>
  );
};
```

## Testing

The mock API includes simulated errors for testing:
```typescript
// Uncomment this line in localeApi.ts to test error handling
// if (Math.random() < 0.1) {
//   throw new Error('Simulated API error');
// }
```
