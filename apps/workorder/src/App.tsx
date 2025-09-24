import React, { useEffect, useState } from 'react';
import { ThemeProvider, createTheme, CssBaseline, Container, Box, CircularProgress } from '@mui/material';
import WorkOrderList from './components/WorkOrderList';
import { createBrandPalette, customColors } from 'shared';
import i18n from './i18n';

// Component to wait for i18n initialization
const I18nLoader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isI18nReady, setIsI18nReady] = useState(false);

  useEffect(() => {
    const checkI18nReady = () => {
      // Check if i18n is initialized and has resources
      if (i18n.isInitialized && i18n.hasResourceBundle('en-US', 'translation')) {
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

const theme = createTheme({
  palette: {
    ...createBrandPalette('light'),
    primary: {
      main: customColors.workorder.primary,
      light: customColors.workorder.secondary,
      dark: '#C55A2A',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: customColors.workorder.secondary,
      light: '#F5A896',
      dark: '#B85A4A',
      contrastText: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 600,
      color: customColors.workorder.primary,
    },
    h2: {
      fontWeight: 600,
      color: customColors.workorder.primary,
    },
    h3: {
      fontWeight: 500,
      color: customColors.workorder.primary,
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
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
  },
});

const App: React.FC = () => {
  return (
    <I18nLoader>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="xl">
          <WorkOrderList />
        </Container>
      </ThemeProvider>
    </I18nLoader>
  );
};

export default App;
