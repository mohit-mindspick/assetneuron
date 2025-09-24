import React, { useState } from 'react';
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Tooltip,
} from '@mui/material';
import {
  Palette as PaletteIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
  Contrast as ContrastIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material';
import { useAppContext } from '../context/AppContext';
import { ThemeType } from '../types';

interface ThemeOption {
  value: ThemeType;
  label: string;
  description: string;
  icon: React.ReactElement;
  accessibility: string;
}

const themeOptions: ThemeOption[] = [
  {
    value: 'light',
    label: 'Light Theme',
    description: 'Default light theme',
    icon: <LightModeIcon />,
    accessibility: 'Standard contrast',
  },
  {
    value: 'dark',
    label: 'Dark Theme',
    description: 'Dark mode for low light',
    icon: <DarkModeIcon />,
    accessibility: 'Reduced eye strain',
  },
  {
    value: 'blackWhite',
    label: 'High Contrast',
    description: 'Black & white for accessibility',
    icon: <ContrastIcon />,
    accessibility: 'WCAG AAA compliant',
  },
  {
    value: 'blueYellow',
    label: 'Color Blind Friendly',
    description: 'Blue & yellow for color accessibility',
    icon: <VisibilityIcon />,
    accessibility: 'Color blind accessible',
  },
];

const ThemeSelector: React.FC = () => {
  const { state, setTheme } = useAppContext();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleThemeChange = (theme: ThemeType) => {
    setTheme(theme);
    handleClose();
  };

  const currentTheme = themeOptions.find(option => option.value === state.theme);

  return (
    <>
      <Tooltip title={`Current: ${currentTheme?.label || 'Unknown'}`}>
        <IconButton
          onClick={handleClick}
          size="small"
          aria-label={`Theme selector. Current theme: ${currentTheme?.label || 'Unknown'}. Click to change theme.`}
          aria-haspopup="menu"
          aria-expanded={open}
          sx={{
            color: 'inherit',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
          }}
        >
          <PaletteIcon aria-hidden="true" />
        </IconButton>
      </Tooltip>
      
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        role="menu"
        aria-label="Theme selection menu"
        PaperProps={{
          sx: {
            minWidth: 280,
            mt: 1,
            backgroundColor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box sx={{ px: 2, py: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.primary' }}>
            Choose Theme
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Select a theme for better accessibility
          </Typography>
        </Box>
        
        {themeOptions.map((option) => (
          <MenuItem
            key={option.value}
            onClick={() => handleThemeChange(option.value)}
            selected={state.theme === option.value}
            role="menuitemradio"
            aria-checked={state.theme === option.value}
            aria-label={`${option.label}: ${option.description}. ${option.accessibility}.`}
            sx={{
              py: 1.5,
              px: 2,
              '&.Mui-selected': {
                backgroundColor: 'action.selected',
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40, color: 'text.primary' }} aria-hidden="true">
              {option.icon}
            </ListItemIcon>
            <ListItemText
              primary={
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {option.label}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {option.description}
                  </Typography>
                </Box>
              }
              secondary={
                <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 500 }}>
                  {option.accessibility}
                </Typography>
              }
            />
          </MenuItem>
        ))}
        
        <Box sx={{ px: 2, py: 1, borderTop: '1px solid', borderColor: 'divider' }}>
          <Typography variant="caption" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
            Themes are optimized for accessibility and WCAG compliance
          </Typography>
        </Box>
      </Menu>
    </>
  );
};

export default ThemeSelector;
