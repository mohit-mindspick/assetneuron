# Language Selector Component

## Overview
The `LanguageSelector` component provides a user-friendly interface for changing the application's language/locale. It supports both icon and dropdown variants and persists the user's language preference throughout their session.

## Features

### 1. **Multiple Variants**
- **Icon Variant**: Compact language icon with dropdown (used in Navigation and Login)
- **Dropdown Variant**: Full dropdown with flag and language name

### 2. **Supported Languages**
- **English** (🇺🇸) - Default
- **Spanish** (🇪🇸)

### 3. **Session Persistence**
- Language preference is saved to `localStorage` as `userPreferredLanguage`
- Preference persists across browser sessions
- Automatically restores the last selected language on app load

### 4. **Real-time Language Switching**
- Uses the shared `handleLocaleChange` function
- Updates all microfrontends simultaneously
- No page refresh required

## Usage

### Basic Usage
```tsx
import LanguageSelector from './LanguageSelector';

// Icon variant (default)
<LanguageSelector variant="icon" size="medium" />

// Dropdown variant
<LanguageSelector variant="dropdown" size="medium" showLabel={true} />
```

### Props
- `variant?: 'icon' | 'dropdown'` - Display style (default: 'icon')
- `size?: 'small' | 'medium'` - Component size (default: 'medium')
- `showLabel?: boolean` - Show language name in dropdown (default: false)

## Implementation Details

### Language Change Flow
1. User selects a new language from the dropdown
2. Component calls `handleLocaleChange(newLanguage)`
3. Language preference is saved to localStorage
4. i18n language is updated across all microfrontends
5. UI updates immediately with new translations

### Integration Points
- **Login Page**: Icon variant in the header
- **Navigation Bar**: Icon variant in the action icons section
- **Settings Drawer**: Full dropdown variant (existing implementation)

## Technical Notes

### Dependencies
- `react-i18next` for translation management
- `@mui/material` for UI components
- Shared `handleLocaleChange` function for cross-microfrontend updates

### Storage
- Uses `localStorage.setItem('userPreferredLanguage', languageCode)`
- Compatible with existing Language and Region Drawer implementation

### Error Handling
- Graceful fallback to English if language change fails
- Console logging for debugging language switching issues

## Adding New Languages

To add a new language:

1. **Add to LanguageSelector component**:
```tsx
const languageOptions: LanguageOption[] = [
  { value: 'en', label: 'English', flag: '🇺🇸' },
  { value: 'es', label: 'Español', flag: '🇪🇸' },
  { value: 'fr', label: 'Français', flag: '🇫🇷' }, // New language
];
```

2. **Add translations**:
   - Create `locales/fr.json` with French translations
   - Update `locales/en.json` and `locales/es.json` if needed

3. **Update shared i18n configuration**:
   - Add language mapping in `packages/shared/i18n.ts`
   - Update `loadLocaleResources` function if needed

## Testing

### Manual Testing
1. Open the application at `http://localhost:3003`
2. Click the language icon in the login page or navigation
3. Select a different language
4. Verify that all text updates immediately
5. Refresh the page and verify language preference is maintained
6. Test across different microfrontends (workorder, asset)

### Expected Behavior
- Language changes should be instant
- No page refresh required
- Preference should persist across sessions
- All microfrontends should update simultaneously
