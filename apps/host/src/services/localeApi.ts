import { LocaleDataResponse, ApiResponse, ApiConfig, ApiError } from '../types/api';
import localeData from '../data/localeData.json';

// Mock API Configuration
const MOCK_API_CONFIG: ApiConfig = {
  baseUrl: '/api/v1',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
};

// Simulate network delay for realistic API behavior
const simulateDelay = (ms: number = 300): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Mock API Service Class
class LocaleApiService {
  private config: ApiConfig;

  constructor(config: ApiConfig = MOCK_API_CONFIG) {
    this.config = config;
  }

  /**
   * Update API configuration (useful when switching from mock to real API)
   */
  updateConfig(newConfig: Partial<ApiConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  /**
   * Get all locale data (languages, countries, timezones)
   * This is a mock implementation that can be easily replaced with real API calls
   */
  async getLocaleData(): Promise<ApiResponse<LocaleDataResponse>> {
    try {
      console.log('🌐 Mock API: Fetching locale data...');
      
      // Simulate network delay
      await simulateDelay(300);

      // Simulate potential API errors (uncomment to test error handling)
      // if (Math.random() < 0.1) {
      //   throw new Error('Simulated API error');
      // }

      const response: ApiResponse<LocaleDataResponse> = {
        data: localeData as LocaleDataResponse,
        success: true,
        message: 'Locale data fetched successfully',
      };

      console.log('✅ Mock API: Locale data fetched successfully', response.data);
      return response;

    } catch (error) {
      console.error('❌ Mock API: Error fetching locale data:', error);
      
      const apiError: ApiError = {
        message: error instanceof Error ? error.message : 'Unknown error occurred',
        status: 500,
        code: 'FETCH_ERROR',
      };

      throw apiError;
    }
  }

  /**
   * Get only language options
   */
  async getLanguages(): Promise<ApiResponse<LocaleDataResponse['languages']>> {
    try {
      const fullResponse = await this.getLocaleData();
      return {
        data: fullResponse.data.languages,
        success: true,
        message: 'Languages fetched successfully',
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get only country options
   */
  async getCountries(): Promise<ApiResponse<LocaleDataResponse['countries']>> {
    try {
      const fullResponse = await this.getLocaleData();
      return {
        data: fullResponse.data.countries,
        success: true,
        message: 'Countries fetched successfully',
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get only timezone options
   */
  async getTimezones(): Promise<ApiResponse<LocaleDataResponse['timezones']>> {
    try {
      const fullResponse = await this.getLocaleData();
      return {
        data: fullResponse.data.timezones,
        success: true,
        message: 'Timezones fetched successfully',
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Save user locale preferences (mock implementation)
   * In a real API, this would POST to a backend endpoint
   */
  async saveUserPreferences(preferences: {
    language: string;
    country: string;
    timezone: string;
  }): Promise<ApiResponse<{ saved: boolean }>> {
    try {
      console.log('🌐 Mock API: Saving user preferences...', preferences);
      
      // Simulate network delay
      await simulateDelay(200);

      // In a real implementation, you would make a POST request here:
      // const response = await fetch(`${this.config.baseUrl}/user/preferences`, {
      //   method: 'POST',
      //   headers: this.config.headers,
      //   body: JSON.stringify(preferences),
      // });

      const response: ApiResponse<{ saved: boolean }> = {
        data: { saved: true },
        success: true,
        message: 'User preferences saved successfully',
      };

      console.log('✅ Mock API: User preferences saved successfully');
      return response;

    } catch (error) {
      console.error('❌ Mock API: Error saving user preferences:', error);
      
      const apiError: ApiError = {
        message: error instanceof Error ? error.message : 'Unknown error occurred',
        status: 500,
        code: 'SAVE_ERROR',
      };

      throw apiError;
    }
  }
}

// Create and export a singleton instance
export const localeApiService = new LocaleApiService();

// Export the class for testing or creating multiple instances
export default LocaleApiService;

// Helper function to easily switch to real API
export const switchToRealApi = (realApiConfig: ApiConfig) => {
  console.log('🔄 Switching from mock API to real API...');
  localeApiService.updateConfig(realApiConfig);
  
  // In a real implementation, you would replace the methods with actual fetch calls
  // For now, this just updates the configuration
  console.log('✅ API configuration updated. Ready to implement real API calls.');
};
