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
} from '@mui/material';
import {
  Menu as MenuIcon,
  AccountCircle,
  Assignment,
  Business,
  Home,
  Language,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '../context/AppContext';
import { handleLocaleChange } from '../i18n';

const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state, setTheme } = useAppContext();
  const { t, i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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

  const navigationItems = [
    { label: t('common.home'), path: '/', icon: <Home /> },
    { label: t('navigation.workOrders'), path: '/workorder', icon: <Assignment /> },
    { label: t('navigation.assets'), path: '/asset', icon: <Business /> },
  ];

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {t('app.title')}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {navigationItems.map((item) => (
            <Button
              key={item.path}
              color="inherit"
              startIcon={item.icon}
              onClick={() => navigate(item.path)}
              sx={{
                backgroundColor: location.pathname === item.path ? 'rgba(255,255,255,0.1)' : 'transparent',
              }}
            >
              {item.label}
            </Button>
          ))}
          
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <Select
              value={i18n.language}
              onChange={handleLanguageChange}
              sx={{ 
                color: 'white',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255,255,255,0.3)',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255,255,255,0.5)',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white',
                },
                '& .MuiSvgIcon-root': {
                  color: 'white',
                },
              }}
              inputProps={{
                sx: { color: 'white' }
              }}
            >
              <MenuItem value="en">{t('common.english')}</MenuItem>
              <MenuItem value="es">{t('common.spanish')}</MenuItem>
            </Select>
          </FormControl>

          <FormControlLabel
            control={
              <Switch
                checked={state.theme === 'dark'}
                onChange={handleThemeToggle}
                color="default"
              />
            }
            label={state.theme === 'dark' ? t('common.lightMode') : t('common.darkMode')}
            sx={{ color: 'white' }}
          />

          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
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
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>{t('common.logout')}</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
