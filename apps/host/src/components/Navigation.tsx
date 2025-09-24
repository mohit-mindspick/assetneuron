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
  ListItemIcon,
  ListItemText,
  Divider,
  Chip,
  alpha,
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
  Check,
  ExitToApp,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import { useAppContext } from '../context/AppContext';
import { handleLocaleChange } from '../i18n';
import SettingsDrawer from './SettingsDrawer';
import { useNavigationData } from '../hooks/useNavigationData';
import { Site } from '../services/navigationApi';
import { useUserProfile } from '../hooks/useUserProfile';
import { customColors } from '../../../../packages/shared/theme';

// Site data structure is now imported from navigationApi.ts

const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state, setTheme } = useAppContext();
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [siteMenuAnchor, setSiteMenuAnchor] = React.useState<null | HTMLElement>(null);
  const [settingsDrawerOpen, setSettingsDrawerOpen] = React.useState(false);
  const [selectedSite, setSelectedSite] = React.useState<string>('all-sites');

  // Use the custom hook to fetch sites data
  const { sites, loading: sitesLoading, error: sitesError, refetch: refetchSites } = useNavigationData();
  
  // Use the custom hook to fetch user profile data
  const { user, loading: userLoading, error: userError, signOut: handleSignOut } = useUserProfile();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOutClick = async () => {
    const success = await handleSignOut();
    if (success) {
      handleClose();
      // You can add additional sign out logic here (e.g., redirect to login page)
      console.log('User signed out successfully');
    }
  };

  const handleSiteMenu = (event: React.MouseEvent<HTMLElement>) => {
    setSiteMenuAnchor(event.currentTarget);
  };

  const handleSiteMenuClose = () => {
    setSiteMenuAnchor(null);
  };

  const handleSiteSelection = (siteId: string) => {
    setSelectedSite(siteId);
    setSiteMenuAnchor(null);
  };

  const getSelectedSiteDisplay = () => {
    if (selectedSite === 'all-sites') {
      return `${t('header.allSites')} | ${t('header.fallbackCompanyName')}`;
    }
    const site = sites.find(s => s.id === selectedSite);
    return site?.name;
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
          <Button 
              size="small" 
              onClick={handleSiteMenu}
              sx={{ color: '#6B7C32' }}
            >
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'black',
                fontSize: '0.9rem',
                mr: 1,
                fontWeight: 600
              }}
            >
              {getSelectedSiteDisplay()}
            </Typography>
           
              <KeyboardArrowDown />
            </Button>
            <Menu
              anchorEl={siteMenuAnchor}
              open={Boolean(siteMenuAnchor)}
              onClose={handleSiteMenuClose}
              PaperProps={{
                sx: {
                  width: 320,
                  borderRadius: '12px',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                  border: '1px solid #e0e0e0',
                  mt: 1,
                }
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              {/* All Sites Option */}
              <MenuItem
                onClick={() => handleSiteSelection('all-sites')}
                sx={{
                  px: 2,
                  py: 1.5,
                  backgroundColor: selectedSite === 'all-sites' ? customColors.navigation.selectedBackground : 'transparent',
                  '&:hover': {
                    backgroundColor: selectedSite === 'all-sites' ? customColors.navigation.hoverBackground : customColors.navigation.unselectedHoverBackground,
                  },
                }}
              >
                <Box sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      color: 'black',
                      fontSize: '0.9rem',
                      mb: 0.5,
                    }}
                  >
                    {t('header.allSites')}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: '#666',
                      fontSize: '0.75rem',
                    }}
                  >
                    {t('header.aggregatedView')}
                  </Typography>
                </Box>
                {selectedSite === 'all-sites' && (
                  <Box
                    sx={{
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      backgroundColor: '#1976d2',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Check sx={{ color: 'white', fontSize: '0.8rem' }} />
                  </Box>
                )}
              </MenuItem>

              {/* Separator Line */}
              <Divider sx={{ mx: 0 }} />

              {/* Site List */}
              {sitesLoading ? (
                <MenuItem disabled>
                  <Typography variant="body2" sx={{ color: '#666', fontStyle: 'italic' }}>
                    Loading sites...
                  </Typography>
                </MenuItem>
              ) : sitesError ? (
                <MenuItem disabled>
                  <Typography variant="body2" sx={{ color: '#d32f2f' }}>
                    Error loading sites: {sitesError}
                  </Typography>
                </MenuItem>
              ) : sites.length === 0 ? (
                <MenuItem disabled>
                  <Typography variant="body2" sx={{ color: '#666', fontStyle: 'italic' }}>
                    No sites available
                  </Typography>
                </MenuItem>
              ) : (
                sites.map((site) => (
                <MenuItem
                  key={site.id}
                  onClick={() => handleSiteSelection(site.id)}
                  sx={{
                    px: 2,
                    py: 1,
                    backgroundColor: selectedSite === site.id ? customColors.navigation.selectedBackground : 'transparent',
                    '&:hover': {
                      backgroundColor: selectedSite === site.id ? customColors.navigation.hoverBackground : customColors.navigation.unselectedHoverBackground,
                    },
                  }}
                >
                  <Box sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.25 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          color: 'black',
                          fontSize: '0.8rem',
                        }}
                      >
                        {site.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: '#4caf50',
                          fontSize: '0.5rem',
                          fontWeight: 400,
                        }}
                      >
                        {site.status}
                      </Typography>
                    </Box>
                    <Typography
                      variant="caption"
                      sx={{
                        color: '#666',
                        fontSize: '0.75rem',
                      }}
                    >
                      {site.location}
                    </Typography>
                  </Box>
                  {selectedSite === site.id && (
                    <Box
                      sx={{
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        backgroundColor: '#1976d2',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Check sx={{ color: 'white', fontSize: '0.8rem' }} />
                    </Box>
                  )}
                </MenuItem>
                ))
              )}
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
                  backgroundColor: customColors.userProfile.avatarBackgroundColor,
                  color: 'white',
                  fontSize: '0.8rem',
                  fontWeight: 600
                }}
              >
                {user?.avatar?.initials || 'JA'}
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
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              PaperProps={{
                sx: {
                  width: 280,
                  borderRadius: '12px',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                  border: '1px solid #e0e0e0',
                  mt: 1,
                  p: 0,
                }
              }}
            >
              {/* User Information Section */}
              <Box
                sx={{
                  p: 3,
                  backgroundColor: '#F5F5F5',
                  borderTopLeftRadius: '12px',
                  borderTopRightRadius: '12px',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar 
                    sx={{ 
                      width: 48, 
                      height: 48, 
                      backgroundColor: customColors.userProfile.avatarBackgroundColor,
                      color: 'white',
                      fontSize: '1.2rem',
                      fontWeight: 600
                    }}
                  >
                    {user?.avatar?.initials || 'JA'}
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    {userLoading ? (
                      <Typography variant="body2" sx={{ color: '#666', fontStyle: 'italic' }}>
                        Loading user data...
                      </Typography>
                    ) : userError ? (
                      <Typography variant="body2" sx={{ color: '#d32f2f' }}>
                        Error loading user data
                      </Typography>
                    ) : user ? (
                      <>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 600,
                            color: 'black',
                            fontSize: '1.1rem',
                            mb: 0.5,
                          }}
                        >
                          {user.firstName} {user.lastName}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: '#666',
                            fontSize: '0.8rem',
                            mb: 0.25,
                          }}
                        >
                          Email
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: 'black',
                            fontSize: '0.9rem',
                            mb: 0.25,
                          }}
                        >
                          {user.email}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: 'black',
                            fontSize: '0.9rem',
                          }}
                        >
                          {user.role}
                        </Typography>
                      </>
                    ) : (
                      <Typography variant="body2" sx={{ color: '#666', fontStyle: 'italic' }}>
                        No user data available
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Box>

              {/* Sign Out Button */}
              <Box sx={{ p: 3, pt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  endIcon={<ExitToApp />}
                  onClick={handleSignOutClick}
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                    textTransform: 'none',
                    fontSize: '1rem',
                    fontWeight: 500,
                    borderRadius: '6px',
                    px: 3,
                    py: 1,
                    boxShadow: 'none',
                    '&:hover': {
                      backgroundColor: theme.palette.primary.dark,
                      boxShadow: 'none',
                    },
                  }}
                >
                  Sign Out
                </Button>
              </Box>
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
