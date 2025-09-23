import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { AppProvider, useAppContext } from './context/AppContext';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import MicrofrontendLoader from './components/MicrofrontendLoader';
import { createBrandPalette, customColors } from 'shared';

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
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: createBrandPalette(state.theme).primary.main,
          },
        },
      },
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
      <AppContent />
    </AppProvider>
  );
};

export default App;
