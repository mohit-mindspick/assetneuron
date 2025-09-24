// API Response Types for Locale Data

export interface LocaleOption {
  value: string;
  label: string;
}

export interface LocaleDataResponse {
  languages: LocaleOption[];
  countries: LocaleOption[];
  timezones: LocaleOption[];
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

// API Service Configuration
export interface ApiConfig {
  baseUrl: string;
  timeout?: number;
  headers?: Record<string, string>;
}

// Error handling
export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}
