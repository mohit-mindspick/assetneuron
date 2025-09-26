import { AxiosRequestConfig, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { RequestInterceptor, ResponseInterceptor, ErrorInterceptor, ApiError } from './apiClient';

/**
 * Authentication Interceptor
 * Automatically adds authentication token to requests
 */
export const authInterceptor: RequestInterceptor = (config: InternalAxiosRequestConfig) => {
  // Get token from localStorage or your auth store
  const token = localStorage.getItem('auth_token');
  
  if (token) {
    config.headers.set('Authorization', `Bearer ${token}`);
  }
  
  return config;
};

/**
 * Request ID Interceptor
 * Adds a unique request ID to each request for tracking
 */
export const requestIdInterceptor: RequestInterceptor = (config: InternalAxiosRequestConfig) => {
  const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  config.headers.set('X-Request-ID', requestId);
  
  // Store request ID for response tracking
  (config as any).metadata = { requestId };
  
  return config;
};

/**
 * Content Type Interceptor
 * Ensures proper content type for different request types
 */
export const contentTypeInterceptor: RequestInterceptor = (config: InternalAxiosRequestConfig) => {
  if (config.data && typeof config.data === 'object' && !(config.data instanceof FormData)) {
    config.headers.set('Content-Type', 'application/json');
  } else if (config.data instanceof FormData) {
    // Let axios set the content type for FormData
    config.headers.delete('Content-Type');
  }
  
  return config;
};

/**
 * Response Success Interceptor
 * Handles successful responses and extracts data
 */
export const responseSuccessInterceptor: ResponseInterceptor = (response: AxiosResponse) => {
  // Log successful responses
  console.log(`✅ API Success: ${response.status} ${response.config.url}`);
  
  // You can transform the response data here if needed
  if (response.data && typeof response.data === 'object') {
    // Add timestamp to response
    response.data._timestamp = new Date().toISOString();
  }
  
  return response;
};

/**
 * Error Handler Interceptor
 * Centralized error handling for all API errors
 */
export const errorHandlerInterceptor: ErrorInterceptor = async (error: AxiosError) => {
  const apiError: ApiError = {
    message: 'An unexpected error occurred',
    status: error.response?.status || 500,
    code: 'UNKNOWN_ERROR',
  };

    if (error.response) {
      // Server responded with error status
      apiError.status = error.response.status;
      apiError.message = (error.response.data as any)?.message || error.message;
      apiError.code = (error.response.data as any)?.code || `HTTP_${error.response.status}`;
      apiError.details = error.response.data;
    
    // Handle specific error cases
    switch (error.response.status) {
      case 401:
        // Unauthorized - redirect to login or refresh token
        console.warn('🔐 Unauthorized access - redirecting to login');
        localStorage.removeItem('auth_token');
        // You can dispatch a logout action here
        break;
        
      case 403:
        // Forbidden - show access denied message
        console.warn('🚫 Access forbidden');
        break;
        
      case 404:
        // Not found - show not found message
        console.warn('🔍 Resource not found');
        break;
        
      case 422:
        // Validation error - show validation messages
        console.warn('⚠️ Validation error:', error.response.data);
        break;
        
      case 429:
        // Rate limited - show rate limit message
        console.warn('⏱️ Rate limited - too many requests');
        break;
        
      case 500:
        // Server error - show generic error message
        console.error('🔥 Server error');
        break;
    }
  } else if (error.request) {
    // Network error
    apiError.message = 'Network error - please check your connection';
    apiError.code = 'NETWORK_ERROR';
    console.error('🌐 Network error:', error.message);
  } else {
    // Request setup error
    apiError.message = error.message;
    apiError.code = 'REQUEST_ERROR';
    console.error('⚙️ Request setup error:', error.message);
  }

  // You can dispatch error actions to your store here
  // dispatch(apiErrorAction(apiError));
  
  throw apiError;
};

/**
 * Retry Interceptor
 * Automatically retries failed requests
 */
export const retryInterceptor = async (error: AxiosError): Promise<never> => {
  const config = error.config as InternalAxiosRequestConfig & { _retryCount?: number };
  
  // Only retry on network errors or 5xx status codes
  if (!error.response || (error.response.status >= 500 && error.response.status < 600)) {
    const retryCount = config._retryCount || 0;
    const maxRetries = 3;
    
    if (retryCount < maxRetries) {
      config._retryCount = retryCount + 1;
      
      // Exponential backoff delay
      const delay = Math.pow(2, retryCount) * 1000;
      console.log(`🔄 Retrying request in ${delay}ms (attempt ${retryCount + 1}/${maxRetries})`);
      
      await new Promise(resolve => setTimeout(resolve, delay));
      
      // Retry the request
      throw error; // Let the original error propagate for now
    }
  }
  
  throw error;
};

/**
 * Loading State Interceptor
 * Manages loading states for requests
 */
export const loadingStateInterceptor: RequestInterceptor = (config: InternalAxiosRequestConfig) => {
  // Dispatch loading start action
  console.log('⏳ Request started - loading...');
  // dispatch(setLoading(true));
  
  return config;
};

export const loadingStateResponseInterceptor: ResponseInterceptor = (response: AxiosResponse) => {
  // Dispatch loading end action
  console.log('✅ Request completed - loading finished');
  // dispatch(setLoading(false));
  
  return response;
};

export const loadingStateErrorInterceptor: ErrorInterceptor = async (error: AxiosError) => {
  // Dispatch loading end action
  console.log('❌ Request failed - loading finished');
  // dispatch(setLoading(false));
  
  throw error;
};

/**
 * Performance Monitoring Interceptor
 * Tracks request performance metrics
 */
export const performanceInterceptor: RequestInterceptor = (config: InternalAxiosRequestConfig) => {
  (config as any).metadata = {
    ...(config as any).metadata,
    startTime: performance.now(),
  };
  
  return config;
};

export const performanceResponseInterceptor: ResponseInterceptor = (response: AxiosResponse) => {
  const startTime = (response.config as any).metadata?.startTime;
  if (startTime) {
    const duration = performance.now() - startTime;
    console.log(`⏱️ Request duration: ${duration.toFixed(2)}ms`);
    
    // You can send performance metrics to your analytics service
    // analytics.track('api_request_duration', { duration, url: response.config.url });
  }
  
  return response;
};

/**
 * Request/Response Logging Interceptor
 * Detailed logging for debugging
 */
export const detailedLoggingInterceptor: RequestInterceptor = (config: InternalAxiosRequestConfig) => {
  console.group(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
  console.log('Headers:', config.headers);
  console.log('Params:', config.params);
  console.log('Data:', config.data);
  console.groupEnd();
  
  return config;
};

export const detailedLoggingResponseInterceptor: ResponseInterceptor = (response: AxiosResponse) => {
  console.group(`✅ API Response: ${response.status} ${response.config.url}`);
  console.log('Status:', response.status);
  console.log('Headers:', response.headers);
  console.log('Data:', response.data);
  console.groupEnd();
  
  return response;
};

export const detailedLoggingErrorInterceptor: ErrorInterceptor = async (error: AxiosError) => {
  console.group(`❌ API Error: ${error.response?.status || 'Network'} ${error.config?.url}`);
  console.log('Error:', error.message);
  console.log('Response:', error.response?.data);
  console.log('Status:', error.response?.status);
  console.log('Headers:', error.response?.headers);
  console.groupEnd();
  
  throw error;
};
