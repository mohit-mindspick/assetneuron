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
  CostIcon,
} from '../icons/CustomIcons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '../context/AppContext';
import { getCustomColors, ThemeType, commonColors, accessibilityColors, brandColors } from 'shared';
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
    CostIcon,
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
        backgroundColor: accessibilityColors.blackWhite.paper, // Use same as header's background.paper
        borderColor: accessibilityColors.blackWhite.primary,
        textColor: accessibilityColors.blackWhite.text,
        textSecondary: accessibilityColors.blackWhite.textSecondary,
        hoverColor: accessibilityColors.blackWhite.hover,
        activeColor: accessibilityColors.blackWhite.selected,
        activeBorder: accessibilityColors.blackWhite.primary,
        activeIndicator: accessibilityColors.blackWhite.primary,
      };
    }
    if (themeType === 'blueYellow') {
      return {
        backgroundColor: accessibilityColors.blueYellow.paper,
        borderColor: accessibilityColors.blueYellow.border,
        textColor: accessibilityColors.blueYellow.text,
        textSecondary: accessibilityColors.blueYellow.textSecondary,
        hoverColor: accessibilityColors.blueYellow.hover,
        activeColor: accessibilityColors.blueYellow.selected,
        activeBorder: accessibilityColors.blueYellow.primary,
        activeIndicator: accessibilityColors.blueYellow.primary,
      };
    }
    // Default theme colors (light/dark)
    if (themeType === 'dark') {
      return {
        backgroundColor: '#2D2D2D', // Match header's background.paper color
        borderColor: '#3D3D3D', // Slightly lighter border
        textColor: '#FFFFFF', // White text
        textSecondary: brandColors.neutralL, // Light gray secondary text
        hoverColor: brandColors.accentD, // Dark orange hover for dark theme
        activeColor: '#E8A87C', // Lighter orange for selected state (lighter than hover)
        activeBorder: brandColors.accentC, // Brand accent color for active border
        activeIndicator: brandColors.accentC, // Brand accent color for active indicator
      };
    }
    
    // Light theme colors
    return {
      backgroundColor: commonColors.white,
      borderColor: commonColors.gray[200],
      textColor: commonColors.gray[700],
      textSecondary: commonColors.gray[500],
      hoverColor: commonColors.gray[100],
      activeColor: '#fff2e6', // Orange active color for default theme
      activeBorder: brandColors.accentC, // Use brand accent color for active border
      activeIndicator: brandColors.accentC, // Use brand accent color for active indicator
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
              
              {/* Render Analytics sub-items when expanded */}
              {isAnalytics && analyticsExpanded && open && item.subItems && (
                <List sx={{ padding: 0, pl: 2 }}>
                  {item.subItems.map((subItem) => {
                    const SubIconComponent = iconMap[subItem.icon];
                    const isSubItemActive = isActive(subItem.path);
                    
                    return (
                      <ListItem key={subItem.id} disablePadding>
                        <ListItemButton
                          onClick={() => handleNavigation(subItem.path)}
                          aria-label={`Navigate to ${t(subItem.labelKey)}${isSubItemActive ? ' (current page)' : ''}`}
                          aria-current={isSubItemActive ? 'page' : undefined}
                          sx={{
                            minHeight: '40px',
                            padding: '8px 12px',
                            margin: '1px 8px',
                            borderRadius: '4px',
                            backgroundColor: isSubItemActive ? sidebarColors.activeColor : 'transparent',
                            border: themeType === 'blackWhite' || themeType === 'blueYellow' ? 
                              `2px solid ${isSubItemActive ? sidebarColors.activeBorder : 'transparent'}` : 'none',
                            position: 'relative',
                            '&:hover': {
                              backgroundColor: isSubItemActive ? sidebarColors.activeColor : sidebarColors.hoverColor,
                              border: themeType === 'blackWhite' || themeType === 'blueYellow' ? 
                                `2px solid ${sidebarColors.activeBorder}` : 'none',
                            },
                            '&::before': isSubItemActive && (themeType === 'light' || themeType === 'dark') ? {
                              content: '""',
                              position: 'absolute',
                              left: 8,
                              top: '50%',
                              transform: 'translateY(-50%)',
                              width: '3px',
                              height: '24px',
                              backgroundColor: sidebarColors.activeIndicator,
                              borderRadius: '0 2px 2px 0',
                            } : {
                              display: 'none',
                            },
                            '& .MuiListItemIcon-root': {
                              minWidth: '32px',
                              color: isSubItemActive ? sidebarColors.activeBorder : sidebarColors.textColor,
                              fontSize: '1.0rem',
                            },
                            '& .MuiListItemText-primary': {
                              color: isSubItemActive ? sidebarColors.textColor : sidebarColors.textColor,
                              fontSize: '0.8rem',
                              fontWeight: isSubItemActive ? 600 : 400,
                            },
                          }}
                        >
                          <ListItemIcon aria-hidden="true">
                            <SubIconComponent />
                          </ListItemIcon>
                          <ListItemText primary={t(subItem.labelKey)} />
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
                </List>
              )}
            </React.Fragment>
          );
        })}
      </List>
    </Drawer>
  );
};

export default Sidebar;
