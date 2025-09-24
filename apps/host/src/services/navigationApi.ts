import navigationData from '../data/navigation.json';

// Site data structure
export interface Site {
  id: string;
  name: string;
  status: 'ACTIVE' | 'INACTIVE';
  location: string;
  type: 'Region' | 'Site' | 'Location' | 'Building' | 'Floor';
}

// API Response structure
export interface NavigationApiResponse {
  success: boolean;
  data: {
    sites: Site[];
  };
  message?: string;
}

// Mock API service for navigation data
export class NavigationApiService {
  /**
   * Mock API call to fetch sites data
   * This can be easily replaced with actual API call later
   */
  static async getSites(): Promise<NavigationApiResponse> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 100));
      
      console.log('🌐 Mock API: Fetching sites data...');
      
      // Return mock data from JSON file
      return {
        success: true,
        data: {
          sites: navigationData.sites as Site[]
        },
        message: 'Sites data fetched successfully'
      };
    } catch (error) {
      console.error('❌ Mock API: Error fetching sites data:', error);
      return {
        success: false,
        data: {
          sites: []
        },
        message: 'Failed to fetch sites data'
      };
    }
  }

  /**
   * Mock API call to fetch a specific site by ID
   */
  static async getSiteById(siteId: string): Promise<NavigationApiResponse> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 50));
      
      console.log(`🌐 Mock API: Fetching site data for ID: ${siteId}`);
      
      const site = navigationData.sites.find(s => s.id === siteId);
      
      if (site) {
        return {
          success: true,
          data: {
            sites: [site as Site]
          },
          message: 'Site data fetched successfully'
        };
      } else {
        return {
          success: false,
          data: {
            sites: []
          },
          message: 'Site not found'
        };
      }
    } catch (error) {
      console.error('❌ Mock API: Error fetching site data:', error);
      return {
        success: false,
        data: {
          sites: []
        },
        message: 'Failed to fetch site data'
      };
    }
  }

  /**
   * Mock API call to fetch sites by type
   */
  static async getSitesByType(type: Site['type']): Promise<NavigationApiResponse> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 75));
      
      console.log(`🌐 Mock API: Fetching sites data for type: ${type}`);
      
      const filteredSites = navigationData.sites.filter(s => s.type === type);
      
      return {
        success: true,
        data: {
          sites: filteredSites as Site[]
        },
        message: `Sites of type ${type} fetched successfully`
      };
    } catch (error) {
      console.error('❌ Mock API: Error fetching sites by type:', error);
      return {
        success: false,
        data: {
          sites: []
        },
        message: 'Failed to fetch sites by type'
      };
    }
  }
}

// Export a singleton instance for easier usage
export const navigationApiService = new NavigationApiService();
