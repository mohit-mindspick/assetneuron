import { useState, useEffect } from 'react';
import { LocaleDataResponse, LocaleOption, ApiError } from 'shared';
import { localeApiService } from '../services/localeApi';

interface UseLocaleDataReturn {
  languages: LocaleOption[];
  countries: LocaleOption[];
  timezones: LocaleOption[];
  loading: boolean;
  error: ApiError | null;
  refetch: () => Promise<void>;
}

/**
 * Custom hook to manage locale data (languages, countries, timezones)
 * Handles loading states, error handling, and data fetching
 */
export const useLocaleData = (): UseLocaleDataReturn => {
  const [languages, setLanguages] = useState<LocaleOption[]>([]);
  const [countries, setCountries] = useState<LocaleOption[]>([]);
  const [timezones, setTimezones] = useState<LocaleOption[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchLocaleData = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔄 Fetching locale data...');
      const response = await localeApiService.getLocaleData();
      
      if (response.success) {
        // The data is already in the correct LocaleOption format
        setLanguages(response.data.languages);
        setCountries(response.data.countries);
        setTimezones(response.data.timezones);
        console.log('✅ Locale data loaded successfully', {
          languages: response.data.languages.length,
          countries: response.data.countries.length,
          timezones: response.data.timezones.length
        });
      } else {
        throw new Error(response.message || 'Failed to fetch locale data');
      }
    } catch (err) {
      console.error('❌ Error fetching locale data:', err);
      setError(err as ApiError);
      
      // Set fallback data in case of error
      setLanguages([]);
      setCountries([]);
      setTimezones([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on mount
  useEffect(() => {
    fetchLocaleData();
  }, []);

  return {
    languages,
    countries,
    timezones,
    loading,
    error,
    refetch: fetchLocaleData,
  };
};

/**
 * Hook to save user locale preferences
 */
export const useSaveUserPreferences = () => {
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<ApiError | null>(null);

  const savePreferences = async (preferences: {
    language: string;
    country: string;
    timezone: string;
  }): Promise<boolean> => {
    try {
      setSaving(true);
      setError(null);
      
      console.log('💾 Saving user preferences...', preferences);
      const response = await localeApiService.saveUserPreferences(preferences);
      
      if (response.success) {
        console.log('✅ User preferences saved successfully');
        return true;
      } else {
        throw new Error(response.message || 'Failed to save preferences');
      }
    } catch (err) {
      console.error('❌ Error saving user preferences:', err);
      setError(err as ApiError);
      return false;
    } finally {
      setSaving(false);
    }
  };

  return {
    savePreferences,
    saving,
    error,
  };
};
