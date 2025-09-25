// AssetNeuron Brand Color Palette
export const brandColors = {
  primary: '#695813',
  accentC: '#EF7E4C',
  accentN: '#944248', 
  accentE: '#D900BA',
  accentD: '#D47C6E',
  secondary: '#D3C795',
  background: '#F5F3EC',
  neutralL: '#E0DED6',
  supportC: '#A6934D',
} as const;

// Accessibility Color Palettes
export const accessibilityColors = {
  blackWhite: {
    primary: '#000000',
    secondary: '#666666',
    background: '#FFFFFF',
    paper: '#FFFFFF',
    text: '#000000',
    textSecondary: '#333333',
    border: '#CCCCCC',
    hover: '#F5F5F5',
    selected: '#E0E0E0',
    error: '#000000',
    warning: '#333333',
    info: '#666666',
    success: '#000000',
  },
  blueYellow: {
    primary: '#0000FF',
    secondary: '#0066CC',
    background: '#FFFF00',
    paper: '#FFFFCC',
    text: '#0000FF',
    textSecondary: '#003399',
    border: '#0066CC',
    hover: '#FFFF99',
    selected: '#FFFF66',
    error: '#FF0000',
    warning: '#FF6600',
    info: '#0000FF',
    success: '#00AA00',
  },
} as const;

// Theme type definition
export type ThemeType = 'light' | 'dark' | 'blackWhite' | 'blueYellow';

// Material-UI theme palette configuration
export const createBrandPalette = (themeType: ThemeType = 'light') => {
  // Handle accessibility themes
  if (themeType === 'blackWhite') {
    const colors = accessibilityColors.blackWhite;
    return {
      mode: 'light' as const,
      primary: {
        main: colors.primary,
        light: colors.secondary,
        dark: colors.text,
        contrastText: colors.background,
      },
      secondary: {
        main: colors.secondary,
        light: colors.border,
        dark: colors.text,
        contrastText: colors.background,
      },
      error: {
        main: colors.error,
        light: colors.border,
        dark: colors.text,
        contrastText: colors.background,
      },
      warning: {
        main: colors.warning,
        light: colors.border,
        dark: colors.text,
        contrastText: colors.background,
      },
      info: {
        main: colors.info,
        light: colors.border,
        dark: colors.text,
        contrastText: colors.background,
      },
      success: {
        main: colors.success,
        light: colors.border,
        dark: colors.text,
        contrastText: colors.background,
      },
      background: {
        default: colors.background,
        paper: colors.paper,
      },
      text: {
        primary: colors.text,
        secondary: colors.textSecondary,
      },
      divider: colors.border,
    };
  }

  if (themeType === 'blueYellow') {
    const colors = accessibilityColors.blueYellow;
    return {
      mode: 'light' as const,
      primary: {
        main: colors.primary,
        light: colors.secondary,
        dark: colors.textSecondary,
        contrastText: colors.background,
      },
      secondary: {
        main: colors.secondary,
        light: colors.border,
        dark: colors.textSecondary,
        contrastText: colors.background,
      },
      error: {
        main: colors.error,
        light: colors.warning,
        dark: '#CC0000',
        contrastText: colors.background,
      },
      warning: {
        main: colors.warning,
        light: '#FF9933',
        dark: '#CC5500',
        contrastText: colors.background,
      },
      info: {
        main: colors.info,
        light: colors.secondary,
        dark: colors.textSecondary,
        contrastText: colors.background,
      },
      success: {
        main: colors.success,
        light: '#33CC33',
        dark: '#008800',
        contrastText: colors.background,
      },
      background: {
        default: colors.background,
        paper: colors.paper,
      },
      text: {
        primary: colors.text,
        secondary: colors.textSecondary,
      },
      divider: colors.border,
    };
  }

  // Handle original light/dark themes
  const mode = themeType as 'light' | 'dark';
  return {
    mode,
    primary: {
      main: brandColors.primary,
      light: brandColors.secondary,
      dark: brandColors.supportC,
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: brandColors.accentC,
      light: brandColors.accentD,
      dark: brandColors.accentN,
      contrastText: '#FFFFFF',
    },
    error: {
      main: brandColors.accentN,
      light: brandColors.accentD,
      dark: '#7A2E35',
      contrastText: '#FFFFFF',
    },
    warning: {
      main: brandColors.accentC,
      light: brandColors.accentD,
      dark: brandColors.accentN,
      contrastText: '#FFFFFF',
    },
    info: {
      main: brandColors.accentE,
      light: '#E633CC',
      dark: '#B8009E',
      contrastText: '#FFFFFF',
    },
    success: {
      main: brandColors.supportC,
      light: brandColors.secondary,
      dark: brandColors.primary,
      contrastText: '#FFFFFF',
    },
    background: {
      default: mode === 'light' ? brandColors.background : '#1A1A1A',
      paper: mode === 'light' ? '#FFFFFF' : '#2D2D2D',
    },
    text: {
      primary: mode === 'light' ? brandColors.primary : '#FFFFFF',
      secondary: mode === 'light' ? brandColors.supportC : brandColors.neutralL,
    },
  };
};

// Common UI colors used throughout the application
export const commonColors = {
  // Neutral colors
  white: '#FFFFFF',
  black: '#000000',
  gray: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e0e0e0',
    300: '#d0d0d0',
    400: '#ccc',
    500: '#9e9e9e',
    600: '#666666',
    700: '#424242',
    800: '#333333',
    900: '#1a1a1a',
  },
  // Brand-specific colors
  brand: {
    olive: '#6B7C32',
    oliveDark: '#556b2f',
    oliveLight: '#4a5a2a',
    gold: '#d4af37',
    darkGold: '#4caf50',
  },
  // Status colors
  status: {
    success: '#4caf50',
    error: '#d32f2f',
    warning: '#ff9800',
    info: '#1976d2',
  },
  // Role-specific colors
  roles: {
    'Regional Manager': '#9c27b0',
    'Plant Manager': '#2196f3',
    'Maintenance Manager': '#4caf50',
    'Asset Manager': '#ff9800',
    'Maintenance Technician': '#f44336',
    'Executive': '#2196f3',
  },
  // Background colors
  backgrounds: {
    light: '#f5f5dc',
    dark: '#e8e8e8',
    card: '#F5F5F5',
    hover: 'rgba(0,0,0,0.04)',
    selected: 'rgba(85, 107, 47, 0.04)',
  },
  // Border colors
  borders: {
    light: '#e0e0e0',
    medium: '#d0d0d0',
    dark: '#6B7C32',
  },
} as const;

// Custom color variants for specific use cases
export const getCustomColors = (themeType: ThemeType) => {
  if (themeType === 'blackWhite') {
    return {
      workorder: {
        primary: accessibilityColors.blackWhite.primary,
        secondary: accessibilityColors.blackWhite.secondary,
      },
      asset: {
        primary: accessibilityColors.blackWhite.primary,
        secondary: accessibilityColors.blackWhite.secondary,
      },
      dashboard: {
        primary: accessibilityColors.blackWhite.primary,
        secondary: accessibilityColors.blackWhite.secondary,
      },
      navigation: {
        selectedBackground: accessibilityColors.blackWhite.selected,
        hoverBackground: accessibilityColors.blackWhite.hover,
        unselectedHoverBackground: accessibilityColors.blackWhite.hover,
        primaryHoverAlpha: 0.12,
      },
      userProfile: {
        avatarBackgroundColor: accessibilityColors.blackWhite.secondary,
      },
      // Common colors for accessibility themes
      common: {
        ...commonColors,
        // Override with accessibility-appropriate colors
        gray: {
          ...commonColors.gray,
          200: accessibilityColors.blackWhite.border,
          500: accessibilityColors.blackWhite.secondary,
          600: accessibilityColors.blackWhite.textSecondary,
          700: accessibilityColors.blackWhite.text,
        },
        brand: {
          ...commonColors.brand,
          olive: accessibilityColors.blackWhite.primary,
          oliveDark: accessibilityColors.blackWhite.primary,
        },
        borders: {
          light: accessibilityColors.blackWhite.border,
          medium: accessibilityColors.blackWhite.border,
          dark: accessibilityColors.blackWhite.primary,
        },
      },
    };
  }

  if (themeType === 'blueYellow') {
    return {
      workorder: {
        primary: accessibilityColors.blueYellow.primary,
        secondary: accessibilityColors.blueYellow.secondary,
      },
      asset: {
        primary: accessibilityColors.blueYellow.primary,
        secondary: accessibilityColors.blueYellow.secondary,
      },
      dashboard: {
        primary: accessibilityColors.blueYellow.primary,
        secondary: accessibilityColors.blueYellow.secondary,
      },
      navigation: {
        selectedBackground: accessibilityColors.blueYellow.selected,
        hoverBackground: accessibilityColors.blueYellow.hover,
        unselectedHoverBackground: accessibilityColors.blueYellow.hover,
        primaryHoverAlpha: 0.12,
      },
      userProfile: {
        avatarBackgroundColor: accessibilityColors.blueYellow.secondary,
      },
      // Common colors for accessibility themes
      common: {
        ...commonColors,
        // Override with accessibility-appropriate colors
        gray: {
          ...commonColors.gray,
          200: accessibilityColors.blueYellow.border,
          500: accessibilityColors.blueYellow.secondary,
          600: accessibilityColors.blueYellow.textSecondary,
          700: accessibilityColors.blueYellow.text,
        },
        brand: {
          ...commonColors.brand,
          olive: accessibilityColors.blueYellow.primary,
          oliveDark: accessibilityColors.blueYellow.primary,
        },
        borders: {
          light: accessibilityColors.blueYellow.border,
          medium: accessibilityColors.blueYellow.border,
          dark: accessibilityColors.blueYellow.primary,
        },
      },
    };
  }

  // Default brand colors
  return {
    workorder: {
      primary: brandColors.accentC,
      secondary: brandColors.accentD,
    },
    asset: {
      primary: brandColors.supportC,
      secondary: brandColors.secondary,
    },
    dashboard: {
      primary: brandColors.accentE,
      secondary: brandColors.accentN,
    },
    navigation: {
      selectedBackground: '#EFF3FF',
      hoverBackground: '#EFF3FF',
      unselectedHoverBackground: '#F0F7FF',
      primaryHoverAlpha: 0.12,
    },
    userProfile: {
      avatarBackgroundColor: commonColors.gray[500],
    },
    // Common colors for all themes
    common: commonColors,
  };
};

// Legacy export for backward compatibility
export const customColors = getCustomColors('light');

// Accessibility-focused component overrides
export const getAccessibilityOverrides = (themeType: ThemeType) => {
  if (themeType === 'blackWhite') {
    return {
      MuiButton: {
        styleOverrides: {
          root: {
            border: '2px solid #000000',
            fontWeight: 600,
            '&:hover': {
              backgroundColor: '#F5F5F5',
              border: '2px solid #000000',
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              border: '2px solid #CCCCCC',
              '&:hover': {
                border: '2px solid #000000',
              },
              '&.Mui-focused': {
                border: '2px solid #000000',
              },
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            border: '2px solid #CCCCCC',
            boxShadow: 'none',
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            borderRight: '2px solid #000000',
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            '&:hover': {
              backgroundColor: '#F5F5F5',
              border: '2px solid #000000',
            },
            '&.Mui-selected': {
              backgroundColor: '#E0E0E0',
              border: '2px solid #000000',
            },
          },
        },
      },
    };
  }

  if (themeType === 'blueYellow') {
    return {
      MuiButton: {
        styleOverrides: {
          root: {
            border: '2px solid #0000FF',
            fontWeight: 600,
            '&:hover': {
              backgroundColor: '#FFFF99',
              border: '2px solid #0000FF',
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              border: '2px solid #0066CC',
              '&:hover': {
                border: '2px solid #0000FF',
              },
              '&.Mui-focused': {
                border: '2px solid #0000FF',
              },
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            border: '2px solid #0066CC',
            boxShadow: 'none',
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            borderRight: '2px solid #0000FF',
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            '&:hover': {
              backgroundColor: '#FFFF99',
              border: '2px solid #0000FF',
            },
            '&.Mui-selected': {
              backgroundColor: '#FFFF66',
              border: '2px solid #0000FF',
            },
          },
        },
      },
    };
  }

  return {};
};
