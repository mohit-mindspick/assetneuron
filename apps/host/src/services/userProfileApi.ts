import userProfileData from '../data/userProfile.json';

// User profile data structure
export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  avatar: {
    initials: string;
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
   * Mock API call to fetch user profile data
   * This can be easily replaced with actual API call later
   */
  static async getUserProfile(): Promise<UserProfileApiResponse> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 150));
      
      console.log('🌐 Mock API: Fetching user profile data...');
      
      // Return mock data from JSON file
      return {
        success: true,
        data: {
          user: userProfileData.user as UserProfile
        },
        message: 'User profile data fetched successfully'
      };
    } catch (error) {
      console.error('❌ Mock API: Error fetching user profile data:', error);
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
   * Mock API call to update user profile
   */
  static async updateUserProfile(profileData: Partial<UserProfile>): Promise<UserProfileApiResponse> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 200));
      
      console.log('🌐 Mock API: Updating user profile data...', profileData);
      
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
      console.error('❌ Mock API: Error updating user profile data:', error);
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
   * Mock API call to sign out user
   */
  static async signOut(): Promise<{ success: boolean; message?: string }> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 100));
      
      console.log('🌐 Mock API: Signing out user...');
      
      // In a real API, this would invalidate the session/token
      return {
        success: true,
        message: 'User signed out successfully'
      };
    } catch (error) {
      console.error('❌ Mock API: Error signing out user:', error);
      return {
        success: false,
        message: 'Failed to sign out user'
      };
    }
  }
}

// Export a singleton instance for easier usage
export const userProfileApiService = new UserProfileApiService();
