/**
 * Environment utilities for browser-safe environment variable access
 */

/**
 * Safely get environment variable value
 * @param key - Environment variable key
 * @param defaultValue - Default value if environment variable is not available
 * @returns Environment variable value or default value
 */
export const getEnvVar = (key: string, defaultValue: string = ''): string => {
  // Check if we're in a browser environment
  if (typeof window !== 'undefined') {
    // In browser, try to get from window.env or use default
    return (window as any).env?.[key] || defaultValue;
  }
  
  // Check if process is available (Node.js environment)
  if (typeof process !== 'undefined' && process.env) {
    return process.env[key] || defaultValue;
  }
  
  return defaultValue;
};

/**
 * Check if we're in development mode
 * @returns true if in development mode
 */
export const isDevelopment = (): boolean => {
  return getEnvVar('NODE_ENV', 'production') === 'development';
};

/**
 * Check if we're in production mode
 * @returns true if in production mode
 */
export const isProduction = (): boolean => {
  return getEnvVar('NODE_ENV', 'production') === 'production';
};

/**
 * Get API base URL from environment
 * @returns API base URL
 */
export const getApiBaseUrl = (): string => {
  return getEnvVar('REACT_APP_API_BASE_URL', '/api/v1');
};

/**
 * Get API timeout from environment
 * @returns API timeout in milliseconds
 */
export const getApiTimeout = (): number => {
  const timeout = getEnvVar('REACT_APP_API_TIMEOUT', '10000');
  return parseInt(timeout, 10) || 10000;
};
