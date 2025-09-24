import demoUsers from '../data/demoUsers.json';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  username: string;
  password: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  message?: string;
}

// Mock authentication API
export class AuthApi {
  private static instance: AuthApi;
  private currentUser: User | null = null;

  private constructor() {}

  public static getInstance(): AuthApi {
    if (!AuthApi.instance) {
      AuthApi.instance = new AuthApi();
    }
    return AuthApi.instance;
  }

  // Simulate API delay
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Login with username/email and password
  public async login(credentials: LoginCredentials): Promise<AuthResponse> {
    await this.delay(1000); // Simulate network delay

    const { username, password } = credentials;
    
    // Find user by username or email
    const user = demoUsers.users.find(
      u => (u.username === username || u.email === username) && u.password === password
    );

    if (user) {
      this.currentUser = user;
      // Store in localStorage for persistence
      localStorage.setItem('seams_user', JSON.stringify(user));
      return {
        success: true,
        user: user,
        message: 'Login successful'
      };
    }

    return {
      success: false,
      message: 'Invalid username or password'
    };
  }

  // Login with demo user (quick login)
  public async loginWithDemoUser(userId: string): Promise<AuthResponse> {
    await this.delay(500); // Simulate network delay

    const user = demoUsers.users.find(u => u.id === userId);

    if (user) {
      this.currentUser = user;
      // Store in localStorage for persistence
      localStorage.setItem('seams_user', JSON.stringify(user));
      return {
        success: true,
        user: user,
        message: 'Demo login successful'
      };
    }

    return {
      success: false,
      message: 'Demo user not found'
    };
  }

  // Get current user
  public getCurrentUser(): User | null {
    if (this.currentUser) {
      return this.currentUser;
    }

    // Try to restore from localStorage
    const storedUser = localStorage.getItem('seams_user');
    if (storedUser) {
      try {
        this.currentUser = JSON.parse(storedUser);
        return this.currentUser;
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('seams_user');
      }
    }

    return null;
  }

  // Logout
  public logout(): void {
    this.currentUser = null;
    localStorage.removeItem('seams_user');
  }

  // Check if user is authenticated
  public isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }

  // Get all demo users for quick login
  public getDemoUsers(): User[] {
    return demoUsers.users;
  }
}

const authApi = AuthApi.getInstance();
export default authApi;
