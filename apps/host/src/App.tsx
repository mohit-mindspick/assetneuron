import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, Box, CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { AppProvider, useAppContext } from './context/AppContext';
import { AuthProvider } from './context/AuthContext';
import Navigation from './components/Navigation';
import Sidebar from './components/Sidebar';
import HomePage from './components/HomePage';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import MicrofrontendLoader from './components/MicrofrontendLoader';
import { createBrandPalette, customColors } from 'shared';
import i18n from './i18n';

// Component to wait for i18n initialization
const I18nLoader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isI18nReady, setIsI18nReady] = useState(false);

  useEffect(() => {
    const checkI18nReady = () => {
      // Check if i18n is initialized and has resources
      if (i18n.isInitialized && i18n.hasResourceBundle('en', 'translation')) {
        setIsI18nReady(true);
      } else {
        // Wait for i18n to be ready
        const timer = setTimeout(checkI18nReady, 100);
        return () => clearTimeout(timer);
      }
    };

    checkI18nReady();
  }, []);

  if (!isI18nReady) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <CircularProgress />
        <Box sx={{ color: 'text.secondary' }}>Loading translations...</Box>
      </Box>
    );
  }

  return <>{children}</>;
};

const AppContent: React.FC = () => {
  const { state } = useAppContext();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const theme = createTheme({
    palette: createBrandPalette(state.theme),
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 600,
        color: createBrandPalette(state.theme).primary.main,
      },
      h2: {
        fontWeight: 600,
        color: createBrandPalette(state.theme).primary.main,
      },
      h3: {
        fontWeight: 500,
        color: createBrandPalette(state.theme).primary.main,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: 'none',
            fontWeight: 500,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/*"
            element={
              <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <Navigation />
                <Box sx={{ display: 'flex', flexGrow: 1, marginTop: '64px' }}>
                  <Sidebar open={sidebarOpen} onToggle={handleSidebarToggle} />
                  <Box 
                    component="main" 
                    sx={{ 
                      flexGrow: 1,
                      marginLeft: sidebarOpen ? '280px' : '64px',
                      transition: 'margin-left 0.3s ease',
                      backgroundColor: '#fafafa',
                      minHeight: 'calc(100vh - 64px)',
                      padding: '24px',
                      position: 'relative',
                      zIndex: 1,
                    }}
                  >
                    <Routes>
                      <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
                      <Route path="/workorder/*" element={<ProtectedRoute><MicrofrontendLoader microfrontend="workorder" /></ProtectedRoute>} />
                      <Route path="/asset/*" element={<ProtectedRoute><MicrofrontendLoader microfrontend="asset" /></ProtectedRoute>} />
                      <Route path="/sites" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
                      <Route path="/inventory" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
                      <Route path="/cases" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
                      <Route path="/preventive-maintenance" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
                      <Route path="/smart-scheduling" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
                      <Route path="/people" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
                      <Route path="/investment-planning" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
                      <Route path="/sustainability" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
                      <Route path="/analytics" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
                    </Routes>
                  </Box>
                </Box>
              </Box>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <AuthProvider>
        <I18nLoader>
          <AppContent />
        </I18nLoader>
      </AuthProvider>
    </AppProvider>
  );
};

export default App;
