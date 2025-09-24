import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, Box, CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { AppProvider, useAppContext } from './context/AppContext';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
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
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navigation />
          <Box component="main" sx={{ flexGrow: 1 }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/workorder/*" element={<MicrofrontendLoader microfrontend="workorder" />} />
              <Route path="/asset/*" element={<MicrofrontendLoader microfrontend="asset" />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <I18nLoader>
        <AppContent />
      </I18nLoader>
    </AppProvider>
  );
};

export default App;
