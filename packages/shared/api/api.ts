// Re-export API types from apiClient for convenience
export type {
  ApiConfig,
  ApiResponse,
  ApiError,
  RequestInterceptor,
  ResponseInterceptor,
  ErrorInterceptor,
} from './apiClient';

// Additional API-specific types
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiRequestConfig {
  params?: Record<string, any>;
  headers?: Record<string, string>;
  timeout?: number;
}

// Authentication related types
export interface AuthToken {
  accessToken: string;
  refreshToken?: string;
  expiresIn?: number;
  tokenType?: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  user: {
    id: string;
    username: string;
    email: string;
    role: string;
  };
  token: AuthToken;
}

// User profile types
export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  avatar: {
    initials: string;
    backgroundColor?: string;
  };
  profile: {
    department: string;
    location: string;
    employeeId: string;
    joinDate: string;
  };
}

// Navigation types
export interface Site {
  id: string;
  name: string;
  type: string;
  location: string;
  status: string;
}

// Locale types
export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

export interface Country {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

export interface Timezone {
  name: string;
  offset: string;
  description: string;
}

export interface LocaleDataResponse {
  languages: LocaleOption[];
  countries: LocaleOption[];
  timezones: LocaleOption[];
}

// Locale option type for UI components
export interface LocaleOption {
  value: string;
  label: string;
}

// Error types
export enum ApiErrorCode {
  NETWORK_ERROR = 'NETWORK_ERROR',
  TIMEOUT_ERROR = 'TIMEOUT_ERROR',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  NOT_FOUND = 'NOT_FOUND',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  SERVER_ERROR = 'SERVER_ERROR',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

export interface ApiErrorDetails {
  code: ApiErrorCode;
  message: string;
  details?: ValidationError[];
  timestamp: string;
  path: string;
}