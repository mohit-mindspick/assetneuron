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
  const [analyticsExpanded, setAnalyticsExpanded] = useState(false);

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

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? DRAWER_WIDTH : DRAWER_WIDTH_COLLAPSED,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: open ? DRAWER_WIDTH : DRAWER_WIDTH_COLLAPSED,
          boxSizing: 'border-box',
          backgroundColor: 'white',
          borderRight: '1px solid #e0e0e0',
          borderTop: 'none',
          transition: 'width 0.3s ease',
          overflowX: 'hidden',
          top: '64px',
          height: 'calc(100vh - 64px)',
          position: 'fixed',
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: open ? 'space-between' : 'center',
          padding: '16px',
          minHeight: '48px',
          borderBottom: 'none',
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: '#f5f5f5',
          },
        }}
        onClick={onToggle}
      >
        {open && (
          <Typography
            variant="body2"
            sx={{
              color: '#9e9e9e',
              fontSize: '0.875rem',
              fontWeight: 400,
            }}
          >
{t('sidebar.collapse')}
          </Typography>
        )}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {open ? (
            <KeyboardDoubleArrowLeft
              sx={{
                color: '#424242',
                fontSize: '2.0rem',
                fontWeight: 300,
                fontVariationSettings: '"wght" 300',
              }}
            />
          ) : (
            <KeyboardDoubleArrowRight
              sx={{
                color: '#424242',
                fontSize: '2.0rem',
                fontWeight: 300,
                fontVariationSettings: '"wght" 300',
              }}
            />
          )}
        </Box>
      </Box>

      {/* Navigation Items */}
      <List sx={{ padding: 0 }}>
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
                  sx={{
                    minHeight: '48px',
                    padding: '12px 16px',
                    margin: '2px 8px',
                    borderRadius: '6px',
                    backgroundColor: isItemActive ? '#fff2e6' : 'transparent',
                    position: 'relative',
                    '&:hover': {
                      backgroundColor: isItemActive ? '#fff2e6' : '#f5f5f5',
                    },
                    '&::before': isItemActive ? {
                      content: '""',
                      position: 'absolute',
                      left: 10,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '3px',
                      height: '30px',
                      backgroundColor: '#ff8a00',
                      borderRadius: '0 2px 2px 0',
                    } : {},
                    '& .MuiListItemIcon-root': {
                      minWidth: open ? '40px' : 'auto',
                      color: isItemActive ? '#ff8a00' : '#424242',
                      fontSize: '1.2rem',
                    },
                    '& .MuiListItemText-primary': {
                      color: isItemActive ? '#000000' : '#424242',
                      fontSize: '0.875rem',
                      fontWeight: isItemActive ? 600 : 400,
                    },
                  }}
                >
                  <ListItemIcon>
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
                          sx={{ ml: 1 }}
                        >
                          {analyticsExpanded ? <ExpandLess /> : <ExpandMore />}
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
