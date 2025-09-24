export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'manager';
}

export type ThemeType = 'light' | 'dark' | 'blackWhite' | 'blueYellow';

export interface AppState {
  user: User | null;
  currentRoute: string;
  theme: ThemeType;
}

export interface AppContextType {
  state: AppState;
  setUser: (user: User | null) => void;
  setCurrentRoute: (route: string) => void;
  setTheme: (theme: ThemeType) => void;
}
