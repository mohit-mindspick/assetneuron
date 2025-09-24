import { useState, useEffect } from 'react';
import { UserProfileApiService, UserProfile, UserProfileApiResponse } from '../services/userProfileApi';

interface UseUserProfileReturn {
  user: UserProfile | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  updateProfile: (profileData: Partial<UserProfile>) => Promise<boolean>;
  signOut: () => Promise<boolean>;
}

/**
 * Custom hook to manage user profile data
 * Handles loading states, error handling, and data fetching
 */
export const useUserProfile = (): UseUserProfileReturn => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserProfile = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔄 Fetching user profile data...');
      const response: UserProfileApiResponse = await UserProfileApiService.getUserProfile();
      
      if (response.success) {
        setUser(response.data.user);
        console.log('✅ User profile data loaded successfully');
      } else {
        throw new Error(response.message || 'Failed to fetch user profile data');
      }
    } catch (err) {
      console.error('❌ Error fetching user profile data:', err);
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (profileData: Partial<UserProfile>): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔄 Updating user profile data...', profileData);
      const response: UserProfileApiResponse = await UserProfileApiService.updateUserProfile(profileData);
      
      if (response.success) {
        setUser(response.data.user);
        console.log('✅ User profile data updated successfully');
        return true;
      } else {
        throw new Error(response.message || 'Failed to update user profile data');
      }
    } catch (err) {
      console.error('❌ Error updating user profile data:', err);
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async (): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔄 Signing out user...');
      const response = await UserProfileApiService.signOut();
      
      if (response.success) {
        setUser(null);
        console.log('✅ User signed out successfully');
        return true;
      } else {
        throw new Error(response.message || 'Failed to sign out user');
      }
    } catch (err) {
      console.error('❌ Error signing out user:', err);
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on mount
  useEffect(() => {
    fetchUserProfile();
  }, []);

  return {
    user,
    loading,
    error,
    refetch: fetchUserProfile,
    updateProfile,
    signOut,
  };
};
