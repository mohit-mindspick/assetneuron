import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { getApiBaseUrl, getApiTimeout } from './envUtils';

// API Configuration
export interface ApiConfig {
  baseURL: string;
  timeout: number;
  headers?: Record<string, string>;
}

// Standard API Response structure
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

// API Error structure
export interface ApiError {
  message: string;
  status: number;
  code: string;
  details?: any;
}

// Request interceptor function type
export type RequestInterceptor = (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>;

// Response interceptor function type
export type ResponseInterceptor = (response: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>;

// Error interceptor function type
export type ErrorInterceptor = (error: AxiosError) => Promise<never>;

/**
 * Centralized API Client with interceptors support
 * This class provides a wrapper around axios with built-in interceptors
 * for authentication, logging, error handling, and more.
 */
export class ApiClient {
  private axiosInstance: AxiosInstance;
  private requestInterceptors: RequestInterceptor[] = [];
  private responseInterceptors: ResponseInterceptor[] = [];
  private errorInterceptors: ErrorInterceptor[] = [];

  constructor(config: ApiConfig) {
    this.axiosInstance = axios.create({
      baseURL: config.baseURL,
      timeout: config.timeout,
      headers: {
        'Content-Type': 'application/json',
        ...config.headers,
      },
    });

    this.setupDefaultInterceptors();
  }

  /**
   * Setup default interceptors for common functionality
   */
  private setupDefaultInterceptors(): void {
    // Request interceptor for logging
    this.axiosInstance.interceptors.request.use(
      (config) => {
        console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
        if (config.data) {
          console.log('📤 Request Data:', config.data);
        }
        return config;
      },
      (error) => {
        console.error('❌ Request Error:', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor for logging and error handling
    this.axiosInstance.interceptors.response.use(
      (response) => {
        console.log(`✅ API Response: ${response.status} ${response.config.url}`);
        return response;
      },
      (error) => {
        console.error(`❌ API Error: ${error.response?.status} ${error.config?.url}`, error.response?.data);
        return Promise.reject(this.handleApiError(error));
      }
    );
  }

  /**
   * Add a request interceptor
   */
  addRequestInterceptor(interceptor: RequestInterceptor): void {
    this.requestInterceptors.push(interceptor);
    this.axiosInstance.interceptors.request.use(interceptor as any);
  }

  /**
   * Add a response interceptor
   */
  addResponseInterceptor(interceptor: ResponseInterceptor): void {
    this.responseInterceptors.push(interceptor);
    this.axiosInstance.interceptors.response.use(interceptor);
  }

  /**
   * Add an error interceptor
   */
  addErrorInterceptor(interceptor: ErrorInterceptor): void {
    this.errorInterceptors.push(interceptor);
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      interceptor
    );
  }

  /**
   * Handle API errors and convert them to standardized format
   */
  private handleApiError(error: AxiosError): ApiError {
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
    } else if (error.request) {
      // Request was made but no response received
      apiError.message = 'Network error - no response received';
      apiError.code = 'NETWORK_ERROR';
    } else {
      // Something else happened
      apiError.message = error.message;
      apiError.code = 'REQUEST_ERROR';
    }

    return apiError;
  }

  /**
   * Make a GET request
   */
  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.axiosInstance.get<T>(url, config);
      return this.formatResponse(response);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Make a POST request
   */
  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.axiosInstance.post<T>(url, data, config);
      return this.formatResponse(response);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Make a PUT request
   */
  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.axiosInstance.put<T>(url, data, config);
      return this.formatResponse(response);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Make a PATCH request
   */
  async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.axiosInstance.patch<T>(url, data, config);
      return this.formatResponse(response);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Make a DELETE request
   */
  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.axiosInstance.delete<T>(url, config);
      return this.formatResponse(response);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Format axios response to our standard API response format
   */
  private formatResponse<T>(response: AxiosResponse<T>): ApiResponse<T> {
    return {
      success: true,
      data: response.data,
      message: 'Request successful',
    };
  }

  /**
   * Get the underlying axios instance for advanced usage
   */
  getAxiosInstance(): AxiosInstance {
    return this.axiosInstance;
  }

  /**
   * Update base URL
   */
  setBaseURL(baseURL: string): void {
    this.axiosInstance.defaults.baseURL = baseURL;
  }

  /**
   * Update timeout
   */
  setTimeout(timeout: number): void {
    this.axiosInstance.defaults.timeout = timeout;
  }

  /**
   * Update default headers
   */
  setHeaders(headers: Record<string, string>): void {
    this.axiosInstance.defaults.headers = {
      ...this.axiosInstance.defaults.headers,
      ...headers,
    };
  }
}

// Default configuration
const defaultConfig: ApiConfig = {
  baseURL: getApiBaseUrl(),
  timeout: getApiTimeout(),
  headers: {
    'Content-Type': 'application/json',
  },
};

// Create and export the default API client instance
export const apiClient = new ApiClient(defaultConfig);

// Export the class for creating custom instances
export default ApiClient;
