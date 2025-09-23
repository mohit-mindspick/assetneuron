import React from 'react';
import { ThemeProvider, createTheme, CssBaseline, Container } from '@mui/material';
import AssetList from './components/AssetList';
import { createBrandPalette, customColors } from 'shared';

const theme = createTheme({
  palette: {
    ...createBrandPalette('light'),
    primary: {
      main: customColors.asset.primary,
      light: customColors.asset.secondary,
      dark: '#8B7A3A',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: customColors.asset.secondary,
      light: '#E8DDB8',
      dark: '#B8A86A',
      contrastText: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 600,
      color: customColors.asset.primary,
    },
    h2: {
      fontWeight: 600,
      color: customColors.asset.primary,
    },
    h3: {
      fontWeight: 500,
      color: customColors.asset.primary,
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
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: customColors.asset.primary,
        },
      },
    },
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="xl">
        <AssetList />
      </Container>
    </ThemeProvider>
  );
};

export default App;
