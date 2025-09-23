import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { AppState, AppContextType, User } from '../types';

const initialState: AppState = {
  user: null,
  currentRoute: '/',
  theme: 'light',
};

type AppAction =
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_CURRENT_ROUTE'; payload: string }
  | { type: 'SET_THEME'; payload: 'light' | 'dark' };

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_CURRENT_ROUTE':
      return { ...state, currentRoute: action.payload };
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    default:
      return state;
  }
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const setUser = (user: User | null) => {
    dispatch({ type: 'SET_USER', payload: user });
  };

  const setCurrentRoute = (route: string) => {
    dispatch({ type: 'SET_CURRENT_ROUTE', payload: route });
  };

  const setTheme = (theme: 'light' | 'dark') => {
    dispatch({ type: 'SET_THEME', payload: theme });
  };

  const value: AppContextType = {
    state,
    setUser,
    setCurrentRoute,
    setTheme,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
