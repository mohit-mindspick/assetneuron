import { useState, useEffect } from 'react';
import { NavigationApiService, Site, NavigationApiResponse } from '../services/navigationApi';

interface UseNavigationDataReturn {
  sites: Site[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Custom hook to manage navigation data (sites)
 * Handles loading states, error handling, and data fetching
 */
export const useNavigationData = (): UseNavigationDataReturn => {
  const [sites, setSites] = useState<Site[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSites = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔄 Fetching navigation data...');
      const response: NavigationApiResponse = await NavigationApiService.getSites();
      
      if (response.success) {
        setSites(response.data.sites);
        console.log('✅ Navigation data loaded successfully');
      } else {
        throw new Error(response.message || 'Failed to fetch navigation data');
      }
    } catch (err) {
      console.error('❌ Error fetching navigation data:', err);
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      
      // Set fallback data in case of error
      setSites([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on mount
  useEffect(() => {
    fetchSites();
  }, []);

  return {
    sites,
    loading,
    error,
    refetch: fetchSites,
  };
};

/**
 * Hook to get a specific site by ID
 */
export const useSiteById = (siteId: string) => {
  const [site, setSite] = useState<Site | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSite = async (): Promise<void> => {
    if (!siteId) return;
    
    try {
      setLoading(true);
      setError(null);
      
      console.log(`🔄 Fetching site data for ID: ${siteId}`);
      const response: NavigationApiResponse = await NavigationApiService.getSiteById(siteId);
      
      if (response.success && response.data.sites.length > 0) {
        setSite(response.data.sites[0]);
        console.log('✅ Site data loaded successfully');
      } else {
        throw new Error(response.message || 'Site not found');
      }
    } catch (err) {
      console.error('❌ Error fetching site data:', err);
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      setSite(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSite();
  }, [siteId]);

  return {
    site,
    loading,
    error,
    refetch: fetchSite,
  };
};

/**
 * Hook to get sites by type
 */
export const useSitesByType = (type: Site['type']) => {
  const [sites, setSites] = useState<Site[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSitesByType = async (): Promise<void> => {
    if (!type) return;
    
    try {
      setLoading(true);
      setError(null);
      
      console.log(`🔄 Fetching sites data for type: ${type}`);
      const response: NavigationApiResponse = await NavigationApiService.getSitesByType(type);
      
      if (response.success) {
        setSites(response.data.sites);
        console.log('✅ Sites data loaded successfully');
      } else {
        throw new Error(response.message || 'Failed to fetch sites by type');
      }
    } catch (err) {
      console.error('❌ Error fetching sites by type:', err);
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      setSites([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSitesByType();
  }, [type]);

  return {
    sites,
    loading,
    error,
    refetch: fetchSitesByType,
  };
};
