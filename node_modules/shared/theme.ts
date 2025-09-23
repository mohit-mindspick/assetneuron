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

// Material-UI theme palette configuration
export const createBrandPalette = (mode: 'light' | 'dark' = 'light') => ({
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
});

// Custom color variants for specific use cases
export const customColors = {
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
} as const;
