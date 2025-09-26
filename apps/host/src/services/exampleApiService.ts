import { apiClient, ApiResponse, UserProfile, Site, LocaleDataResponse } from 'shared';

/**
 * Example API Service demonstrating how to use the centralized API client
 * This shows how to replace mock implementations with real API calls
 */
export class ExampleApiService {
  /**
   * Example: Get user profile with real API call
   * This replaces the mock implementation in userProfileApi.ts
   */
  static async getUserProfile(): Promise<ApiResponse<{ user: UserProfile }>> {
    try {
      const response = await apiClient.get<{ user: UserProfile }>('/user/profile');
      return response;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  }

  /**
   * Example: Update user profile with real API call
   */
  static async updateUserProfile(profileData: Partial<UserProfile>): Promise<ApiResponse<{ user: UserProfile }>> {
    try {
      const response = await apiClient.put<{ user: UserProfile }>('/user/profile', profileData);
      return response;
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  }

  /**
   * Example: Get sites with real API call
   * This replaces the mock implementation in navigationApi.ts
   */
  static async getSites(): Promise<ApiResponse<{ sites: Site[] }>> {
    try {
      const response = await apiClient.get<{ sites: Site[] }>('/sites');
      return response;
    } catch (error) {
      console.error('Error fetching sites:', error);
      throw error;
    }
  }

  /**
   * Example: Get locale data with real API call
   * This replaces the mock implementation in localeApi.ts
   */
  static async getLocaleData(): Promise<ApiResponse<LocaleDataResponse>> {
    try {
      const response = await apiClient.get<LocaleDataResponse>('/locale');
      return response;
    } catch (error) {
      console.error('Error fetching locale data:', error);
      throw error;
    }
  }

  /**
   * Example: Login with real API call
   */
  static async login(credentials: { username: string; password: string }): Promise<ApiResponse<{ user: any; token: string }>> {
    try {
      const response = await apiClient.post<{ user: any; token: string }>('/auth/login', credentials);
      return response;
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  }

  /**
   * Example: Logout with real API call
   */
  static async logout(): Promise<ApiResponse<{ success: boolean }>> {
    try {
      const response = await apiClient.post<{ success: boolean }>('/auth/logout');
      return response;
    } catch (error) {
      console.error('Error during logout:', error);
      throw error;
    }
  }

  /**
   * Example: Upload file with FormData
   */
  static async uploadFile(file: File): Promise<ApiResponse<{ url: string; filename: string }>> {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await apiClient.post<{ url: string; filename: string }>('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }

  /**
   * Example: Get data with query parameters
   */
  static async getDataWithParams(params: { page: number; limit: number; search?: string }): Promise<ApiResponse<any[]>> {
    try {
      const response = await apiClient.get<any[]>('/data', {
        params: {
          page: params.page,
          limit: params.limit,
          ...(params.search && { search: params.search }),
        },
      });
      return response;
    } catch (error) {
      console.error('Error fetching data with params:', error);
      throw error;
    }
  }

  /**
   * Example: Delete resource
   */
  static async deleteResource(id: string): Promise<ApiResponse<{ success: boolean }>> {
    try {
      const response = await apiClient.delete<{ success: boolean }>(`/resources/${id}`);
      return response;
    } catch (error) {
      console.error('Error deleting resource:', error);
      throw error;
    }
  }

  /**
   * Example: Patch/Partial update
   */
  static async patchResource(id: string, data: Partial<any>): Promise<ApiResponse<any>> {
    try {
      const response = await apiClient.patch<any>(`/resources/${id}`, data);
      return response;
    } catch (error) {
      console.error('Error patching resource:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const exampleApiService = new ExampleApiService();
