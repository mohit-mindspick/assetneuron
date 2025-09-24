import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  IconButton,
  Divider,
  Collapse,
} from '@mui/material';
import {
  ChevronLeft,
  ExpandLess,
  ExpandMore,
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
} from '@mui/icons-material';
import {
  DashboardIcon,
  SitesIcon,
  AssetsIcon,
  InventoryIcon,
  CasesIcon,
  PreventiveMaintenanceIcon,
  WorkOrderIcon,
  SmartSchedulingIcon,
  PeopleIcon,
  CapitalPlanningIcon,
  SustainabilityIcon,
  AnalyticsIcon,
} from '../icons/CustomIcons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '../context/AppContext';
import { getCustomColors, ThemeType } from 'shared';
import navigationMenuData from '../data/navigationMenu.json';

const DRAWER_WIDTH = 280;
const DRAWER_WIDTH_COLLAPSED = 64;

interface SidebarProps {
  open: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, onToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const { state } = useAppContext();
  const [analyticsExpanded, setAnalyticsExpanded] = useState(false);
  
  const themeType = state.theme as ThemeType;
  const customColors = getCustomColors(themeType);

  const iconMap: { [key: string]: React.ComponentType<any> } = {
    DashboardIcon,
    SitesIcon,
    AssetsIcon,
    InventoryIcon,
    CasesIcon,
    PreventiveMaintenanceIcon,
    WorkOrderIcon,
    SmartSchedulingIcon,
    PeopleIcon,
    CapitalPlanningIcon,
    SustainabilityIcon,
    AnalyticsIcon,
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleAnalyticsToggle = () => {
    setAnalyticsExpanded(!analyticsExpanded);
  };

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  // Get theme-specific colors
  const getSidebarColors = () => {
    if (themeType === 'blackWhite') {
      return {
        backgroundColor: '#FFFFFF',
        borderColor: '#000000',
        textColor: '#000000',
        textSecondary: '#333333',
        hoverColor: '#F5F5F5',
        activeColor: '#E0E0E0',
        activeBorder: '#000000',
        activeIndicator: '#000000',
      };
    }
    if (themeType === 'blueYellow') {
      return {
        backgroundColor: '#FFFFCC',
        borderColor: '#0000FF',
        textColor: '#0000FF',
        textSecondary: '#003399',
        hoverColor: '#FFFF99',
        activeColor: '#FFFF66',
        activeBorder: '#0000FF',
        activeIndicator: '#0000FF',
      };
    }
    // Default theme colors
    return {
      backgroundColor: 'white',
      borderColor: '#e0e0e0',
      textColor: '#424242',
      textSecondary: '#9e9e9e',
      hoverColor: '#f5f5f5',
      activeColor: '#fff2e6',
      activeBorder: '#ff8a00',
      activeIndicator: '#ff8a00',
    };
  };

  const sidebarColors = getSidebarColors();

  return (
    <Drawer
      variant="permanent"
      aria-label="Main navigation sidebar"
      sx={{
        width: open ? DRAWER_WIDTH : DRAWER_WIDTH_COLLAPSED,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: open ? DRAWER_WIDTH : DRAWER_WIDTH_COLLAPSED,
          boxSizing: 'border-box',
          backgroundColor: sidebarColors.backgroundColor,
          borderRight: `2px solid ${sidebarColors.borderColor}`,
          borderTop: 'none',
          borderLeft: 'none',
          borderBottom: 'none',
          transition: 'width 0.3s ease',
          overflowX: 'hidden',
          top: '64px',
          height: 'calc(100vh - 64px)',
          position: 'fixed',
          boxShadow: 'none',
          zIndex: 1100,
          '&::before': {
            display: 'none',
          },
          '&::after': {
            display: 'none',
          },
        },
      }}
    >
      {/* Header */}
      <Box
        role="button"
        tabIndex={0}
        aria-label={open ? 'Collapse sidebar' : 'Expand sidebar'}
        aria-expanded={open}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: open ? 'space-between' : 'center',
          padding: '16px',
          minHeight: '48px',
          borderBottom: 'none',
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: sidebarColors.hoverColor,
          },
          '&:focus': {
            outlineOffset: '2px',
          },
        }}
        onClick={onToggle}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onToggle();
          }
        }}
      >
        {open && (
          <Typography
            variant="body2"
            sx={{
              color: sidebarColors.textSecondary,
              fontSize: '0.875rem',
              fontWeight: 400,
            }}
          >
{t('sidebar.collapse')}
          </Typography>
        )}
        <Box sx={{ display: 'flex', alignItems: 'center' }} aria-hidden="true">
          {open ? (
            <KeyboardDoubleArrowLeft
              sx={{
                color: sidebarColors.textColor,
                fontSize: '2.0rem',
                fontWeight: 300,
                fontVariationSettings: '"wght" 300',
              }}
            />
          ) : (
            <KeyboardDoubleArrowRight
              sx={{
                color: sidebarColors.textColor,
                fontSize: '2.0rem',
                fontWeight: 300,
                fontVariationSettings: '"wght" 300',
              }}
            />
          )}
        </Box>
      </Box>

      {/* Navigation Items */}
      <List 
        role="navigation" 
        aria-label="Main navigation menu"
        sx={{ padding: 0 }}
      >
        {navigationMenuData.menuItems.map((item) => {
          const IconComponent = iconMap[item.icon];
          const isItemActive = isActive(item.path);
          const isAnalytics = item.id === 'analytics';

          return (
            <React.Fragment key={item.id}>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    if (isAnalytics) {
                      handleAnalyticsToggle();
                    } else {
                      handleNavigation(item.path);
                    }
                  }}
                  aria-label={`Navigate to ${t(item.labelKey)}${isItemActive ? ' (current page)' : ''}`}
                  aria-current={isItemActive ? 'page' : undefined}
                  sx={{
                    minHeight: '48px',
                    padding: '12px 16px',
                    margin: '2px 8px',
                    borderRadius: '6px',
                    backgroundColor: isItemActive ? sidebarColors.activeColor : 'transparent',
                    border: themeType === 'blackWhite' || themeType === 'blueYellow' ? 
                      `2px solid ${isItemActive ? sidebarColors.activeBorder : 'transparent'}` : 'none',
                    position: 'relative',
                    '&:hover': {
                      backgroundColor: isItemActive ? sidebarColors.activeColor : sidebarColors.hoverColor,
                      border: themeType === 'blackWhite' || themeType === 'blueYellow' ? 
                        `2px solid ${sidebarColors.activeBorder}` : 'none',
                    },
                    '&::before': isItemActive && (themeType === 'light' || themeType === 'dark') ? {
                      content: '""',
                      position: 'absolute',
                      left: 10,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '3px',
                      height: '30px',
                      backgroundColor: sidebarColors.activeIndicator,
                      borderRadius: '0 2px 2px 0',
                    } : {
                      display: 'none',
                    },
                    '& .MuiListItemIcon-root': {
                      minWidth: open ? '40px' : 'auto',
                      color: isItemActive ? sidebarColors.activeBorder : sidebarColors.textColor,
                      fontSize: '1.2rem',
                    },
                    '& .MuiListItemText-primary': {
                      color: isItemActive ? sidebarColors.textColor : sidebarColors.textColor,
                      fontSize: '0.875rem',
                      fontWeight: isItemActive ? 600 : 400,
                    },
                  }}
                >
                  <ListItemIcon aria-hidden="true">
                    <IconComponent />
                  </ListItemIcon>
                  {open && (
                    <>
                      <ListItemText primary={t(item.labelKey)} />
                      {isAnalytics && (
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAnalyticsToggle();
                          }}
                          aria-label={`${analyticsExpanded ? 'Collapse' : 'Expand'} analytics submenu`}
                          aria-expanded={analyticsExpanded}
                          sx={{ ml: 1 }}
                        >
                          {analyticsExpanded ? <ExpandLess aria-hidden="true" /> : <ExpandMore aria-hidden="true" />}
                        </IconButton>
                      )}
                    </>
                  )}
                </ListItemButton>
              </ListItem>
            </React.Fragment>
          );
        })}
      </List>
    </Drawer>
  );
};

export default Sidebar;
