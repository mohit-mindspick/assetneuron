import userProfileData from '../data/userProfile.json';
import { apiClient, ApiResponse } from 'shared';

// User profile data structure
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

// API Response structure
export interface UserProfileApiResponse {
  success: boolean;
  data: {
    user: UserProfile;
  };
  message?: string;
}

// Mock API service for user profile data
export class UserProfileApiService {
  /**
   * Fetch user profile data
   * Uses the centralized API client with interceptors
   */
  static async getUserProfile(): Promise<UserProfileApiResponse> {
    try {
      // For now, use mock data. In production, replace with:
      // const response = await apiClient.get<UserProfile>('/user/profile');
      
      // Simulate API delay for mock
      await new Promise(resolve => setTimeout(resolve, 150));
      
      console.log('🌐 API: Fetching user profile data...');
      
      // Return mock data from JSON file
      return {
        success: true,
        data: {
          user: userProfileData.user as UserProfile
        },
        message: 'User profile data fetched successfully'
      };
    } catch (error) {
      console.error('❌ API: Error fetching user profile data:', error);
      return {
        success: false,
        data: {
          user: {} as UserProfile
        },
        message: 'Failed to fetch user profile data'
      };
    }
  }

  /**
   * Update user profile data
   * Uses the centralized API client with interceptors
   */
  static async updateUserProfile(profileData: Partial<UserProfile>): Promise<UserProfileApiResponse> {
    try {
      // For now, use mock data. In production, replace with:
      // const response = await apiClient.put<UserProfile>('/user/profile', profileData);
      
      // Simulate API delay for mock
      await new Promise(resolve => setTimeout(resolve, 200));
      
      console.log('🌐 API: Updating user profile data...', profileData);
      
      // In a real API, this would make a PUT/PATCH request
      // For now, we'll just return success
      return {
        success: true,
        data: {
          user: { ...userProfileData.user, ...profileData } as UserProfile
        },
        message: 'User profile updated successfully'
      };
    } catch (error) {
      console.error('❌ API: Error updating user profile data:', error);
      return {
        success: false,
        data: {
          user: {} as UserProfile
        },
        message: 'Failed to update user profile data'
      };
    }
  }

  /**
   * Sign out user
   * Uses the centralized API client with interceptors
   */
  static async signOut(): Promise<{ success: boolean; message?: string }> {
    try {
      // For now, use mock data. In production, replace with:
      // const response = await apiClient.post('/auth/signout');
      
      // Simulate API delay for mock
      await new Promise(resolve => setTimeout(resolve, 100));
      
      console.log('🌐 API: Signing out user...');
      
      // In a real API, this would invalidate the session/token
      return {
        success: true,
        message: 'User signed out successfully'
      };
    } catch (error) {
      console.error('❌ API: Error signing out user:', error);
      return {
        success: false,
        message: 'Failed to sign out user'
      };
    }
  }
}

// Export a singleton instance for easier usage
export const userProfileApiService = new UserProfileApiService();
