import { apiClient } from './apiClient';
import { isDevelopment } from './envUtils';
import {
  authInterceptor,
  requestIdInterceptor,
  contentTypeInterceptor,
  responseSuccessInterceptor,
  errorHandlerInterceptor,
  retryInterceptor,
  loadingStateInterceptor,
  loadingStateResponseInterceptor,
  loadingStateErrorInterceptor,
  performanceInterceptor,
  performanceResponseInterceptor,
  detailedLoggingInterceptor,
  detailedLoggingResponseInterceptor,
  detailedLoggingErrorInterceptor,
} from './interceptors';

/**
 * Setup API client with all interceptors
 * This function configures the API client with common interceptors
 * You can customize which interceptors to use based on your needs
 */
export const setupApiClient = (options: {
  enableAuth?: boolean;
  enableRequestId?: boolean;
  enableContentType?: boolean;
  enableErrorHandling?: boolean;
  enableRetry?: boolean;
  enableLoading?: boolean;
  enablePerformance?: boolean;
  enableDetailedLogging?: boolean;
  enableProductionLogging?: boolean;
} = {}) => {
  const {
    enableAuth = true,
    enableRequestId = true,
    enableContentType = true,
    enableErrorHandling = true,
    enableRetry = true,
    enableLoading = false,
    enablePerformance = false,
    enableDetailedLogging = false,
    enableProductionLogging = true,
  } = options;

  // Request interceptors (applied in order)
  if (enableAuth) {
    apiClient.addRequestInterceptor(authInterceptor);
  }

  if (enableRequestId) {
    apiClient.addRequestInterceptor(requestIdInterceptor);
  }

  if (enableContentType) {
    apiClient.addRequestInterceptor(contentTypeInterceptor);
  }

  if (enableLoading) {
    apiClient.addRequestInterceptor(loadingStateInterceptor);
  }

  if (enablePerformance) {
    apiClient.addRequestInterceptor(performanceInterceptor);
  }

  if (enableDetailedLogging) {
    apiClient.addRequestInterceptor(detailedLoggingInterceptor);
  }

  // Response interceptors
  if (enablePerformance) {
    apiClient.addResponseInterceptor(performanceResponseInterceptor);
  }

  if (enableLoading) {
    apiClient.addResponseInterceptor(loadingStateResponseInterceptor);
  }

  if (enableDetailedLogging) {
    apiClient.addResponseInterceptor(detailedLoggingResponseInterceptor);
  }

  apiClient.addResponseInterceptor(responseSuccessInterceptor);

  // Error interceptors
  if (enableRetry) {
    apiClient.addErrorInterceptor(retryInterceptor);
  }

  if (enableLoading) {
    apiClient.addErrorInterceptor(loadingStateErrorInterceptor);
  }

  if (enableDetailedLogging) {
    apiClient.addErrorInterceptor(detailedLoggingErrorInterceptor);
  }

  if (enableErrorHandling) {
    apiClient.addErrorInterceptor(errorHandlerInterceptor);
  }

  console.log('✅ API Client configured with interceptors');
};

/**
 * Setup API client for development environment
 */
export const setupDevelopmentApiClient = () => {
  setupApiClient({
    enableAuth: true,
    enableRequestId: true,
    enableContentType: true,
    enableErrorHandling: true,
    enableRetry: true,
    enableLoading: false,
    enablePerformance: true,
    enableDetailedLogging: true,
    enableProductionLogging: false,
  });
};

/**
 * Setup API client for production environment
 */
export const setupProductionApiClient = () => {
  setupApiClient({
    enableAuth: true,
    enableRequestId: true,
    enableContentType: true,
    enableErrorHandling: true,
    enableRetry: true,
    enableLoading: false,
    enablePerformance: false,
    enableDetailedLogging: false,
    enableProductionLogging: true,
  });
};

/**
 * Setup API client based on environment
 */
export const setupApiClientForEnvironment = () => {
  if (isDevelopment()) {
    setupDevelopmentApiClient();
  } else {
    setupProductionApiClient();
  }
};

// Auto-setup based on environment
setupApiClientForEnvironment();
