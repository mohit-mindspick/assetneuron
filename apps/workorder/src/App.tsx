import React from 'react';
import { ThemeProvider, createTheme, CssBaseline, Container } from '@mui/material';
import WorkOrderList from './components/WorkOrderList';
import { createBrandPalette, customColors } from 'shared';

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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="xl">
        <WorkOrderList />
      </Container>
    </ThemeProvider>
  );
};

export default App;
