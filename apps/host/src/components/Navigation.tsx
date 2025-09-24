import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Switch,
  FormControlLabel,
  Select,
  FormControl,
  TextField,
  InputAdornment,
  Badge,
  Avatar,
} from '@mui/material';
import {
  Menu as MenuIcon,
  AccountCircle,
  Assignment,
  Business,
  Home,
  Language,
  Search,
  MicOff,
  Settings,
  Notifications,
  KeyboardArrowDown,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '../context/AppContext';
import { handleLocaleChange } from '../i18n';
import SettingsDrawer from './SettingsDrawer';

const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state, setTheme } = useAppContext();
  const { t, i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [siteMenuAnchor, setSiteMenuAnchor] = React.useState<null | HTMLElement>(null);
  const [settingsDrawerOpen, setSettingsDrawerOpen] = React.useState(false);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSiteMenu = (event: React.MouseEvent<HTMLElement>) => {
    setSiteMenuAnchor(event.currentTarget);
  };

  const handleSiteMenuClose = () => {
    setSiteMenuAnchor(null);
  };

  const handleSettingsClick = () => {
    setSettingsDrawerOpen(true);
  };

  const handleSettingsDrawerClose = () => {
    setSettingsDrawerOpen(false);
  };

  const handleThemeToggle = () => {
    setTheme(state.theme === 'light' ? 'dark' : 'light');
  };

  const handleLanguageChange = async (event: any) => {
    const newLocale = event.target.value;
    console.log(`Host: Language change requested to: ${newLocale}`);
    
    // Use the dynamic locale change handler to update all microfrontends
    await handleLocaleChange(newLocale);
  };

  return (
    <AppBar 
      position="static" 
      sx={{ 
        backgroundColor: 'white',
        color: 'black',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        borderBottom: '1px solid #e0e0e0'
      }}
    >
      <Toolbar sx={{ minHeight: '64px !important' }}>
        {/* Menu Icon and Logo */}
        <IconButton
          size="large"
          edge="start"
          aria-label="menu"
          sx={{ mr: 2, color: 'black' }}
        >
          <MenuIcon />
        </IconButton>
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
            color: '#6B7C32', // Dark olive green
            fontWeight: 600,
            fontSize: '1.5rem',
            flexGrow: 1
          }}
        >
          SEAMS
        </Typography>
        
        {/* Right-aligned components container */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          {/* Search Bar */}
          <Box sx={{ maxWidth: '400px', width: '300px' }}>
            <TextField
              fullWidth
              placeholder={t('header.searchPlaceholder') as string}
              variant="outlined"
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  backgroundColor: '#f5f5f5',
                  '& fieldset': {
                    borderColor: '#e0e0e0',
                  },
                  '&:hover fieldset': {
                    borderColor: '#d0d0d0',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#6B7C32',
                  },
                },
                '& .MuiInputBase-input': {
                  padding: '12px 14px',
                  fontSize: '0.95rem',
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton size="small" sx={{ color: '#666', mr: 1 }}>
                      <MicOff />
                    </IconButton>
                    <IconButton size="small" sx={{ color: '#666' }}>
                      <Search />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {/* Site Selector */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'black',
                fontSize: '0.9rem',
                mr: 1
              }}
            >
              {t('header.allSites')} | {t('header.bharatManufacturing')}
            </Typography>
            <IconButton 
              size="small" 
              onClick={handleSiteMenu}
              sx={{ color: '#6B7C32' }}
            >
              <KeyboardArrowDown />
            </IconButton>
            <Menu
              anchorEl={siteMenuAnchor}
              open={Boolean(siteMenuAnchor)}
              onClose={handleSiteMenuClose}
            >
              <MenuItem onClick={handleSiteMenuClose}>{t('header.allSites')}</MenuItem>
              <MenuItem onClick={handleSiteMenuClose}>{t('header.bharatManufacturing')}</MenuItem>
              <MenuItem onClick={handleSiteMenuClose}>Other Site</MenuItem>
            </Menu>
          </Box>

          {/* Action Icons */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton 
              size="medium" 
              sx={{ color: 'black' }}
              onClick={handleSettingsClick}
            >
              <Settings />
            </IconButton>
            
            <IconButton size="medium" sx={{ color: 'black' }}>
              <Badge badgeContent={3} color="error">
                <Notifications />
              </Badge>
            </IconButton>
            
            <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
              <Avatar 
                sx={{ 
                  width: 32, 
                  height: 32, 
                  backgroundColor: '#9e9e9e',
                  color: 'white',
                  fontSize: '0.8rem',
                  fontWeight: 600
                }}
              >
                JA
              </Avatar>
              <IconButton 
                size="small" 
                onClick={handleMenu}
                sx={{ color: '#6B7C32', ml: 0.5 }}
              >
                <KeyboardArrowDown />
              </IconButton>
            </Box>
            
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>{t('common.profile')}</MenuItem>
              <MenuItem onClick={handleClose}>{t('common.myAccount')}</MenuItem>
              <MenuItem onClick={handleClose}>{t('common.logout')}</MenuItem>
            </Menu>
          </Box>
        </Box>
      </Toolbar>
      
      {/* Settings Drawer */}
      <SettingsDrawer 
        open={settingsDrawerOpen} 
        onClose={handleSettingsDrawerClose} 
      />
    </AppBar>
  );
};

export default Navigation;
