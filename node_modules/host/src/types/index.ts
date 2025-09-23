export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'manager';
}

export interface AppState {
  user: User | null;
  currentRoute: string;
  theme: 'light' | 'dark';
}

export interface AppContextType {
  state: AppState;
  setUser: (user: User | null) => void;
  setCurrentRoute: (route: string) => void;
  setTheme: (theme: 'light' | 'dark') => void;
}
