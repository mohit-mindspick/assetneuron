import React, { useState } from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  Close as CloseIcon,
  Language as LanguageIcon,
  Lock as LockIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import LanguageAndRegionDrawer from './LanguageAndRegionDrawer';

interface SettingsDrawerProps {
  open: boolean;
  onClose: () => void;
}

const SettingsDrawer: React.FC<SettingsDrawerProps> = ({ open, onClose }) => {
  const { t } = useTranslation();
  const [languageDrawerOpen, setLanguageDrawerOpen] = useState(false);

  const handleLanguageClick = () => {
    setLanguageDrawerOpen(true);
  };

  const handleLanguageDrawerClose = () => {
    setLanguageDrawerOpen(false);
  };

  const handleLanguageDrawerBack = () => {
    setLanguageDrawerOpen(false);
  };

  const handlePasswordClick = () => {
    // Handle password settings
    console.log('Password clicked');
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: '66%',
          maxWidth: '600px',
          minWidth: '400px',
          backgroundColor: 'white',
          borderTopLeftRadius: '12px',
          borderBottomLeftRadius: '12px',
          boxShadow: '-4px 0 20px rgba(0,0,0,0.1)',
        },
      }}
    >
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 3,
            borderBottom: '1px solid #e0e0e0',
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              color: 'black',
              fontSize: '1.5rem',
            }}
          >
            {t('settings.title')}
          </Typography>
          <IconButton
            onClick={onClose}
            sx={{
              color: 'black',
              '&:hover': {
                backgroundColor: 'rgba(0,0,0,0.04)',
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Content */}
        <Box sx={{ flexGrow: 1, p: 0 }}>
          <List sx={{ p: 0 }}>
            {/* Language and region option */}
            <ListItem
              button
              onClick={handleLanguageClick}
              sx={{
                p: 3,
                '&:hover': {
                  backgroundColor: 'rgba(0,0,0,0.04)',
                },
                borderBottom: '1px solid #f0f0f0',
              }}
            >
              <ListItemIcon sx={{ minWidth: 48 }}>
                <LanguageIcon
                  sx={{
                    color: 'black',
                    fontSize: '1.5rem',
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary={t('settings.languageAndRegion')}
                primaryTypographyProps={{
                  sx: {
                    color: 'black',
                    fontSize: '1rem',
                    fontWeight: 400,
                  },
                }}
              />
            </ListItem>

            {/* Password option */}
            <ListItem
              button
              onClick={handlePasswordClick}
              sx={{
                p: 3,
                '&:hover': {
                  backgroundColor: 'rgba(0,0,0,0.04)',
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 48 }}>
                <LockIcon
                  sx={{
                    color: 'black',
                    fontSize: '1.5rem',
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary={t('settings.password')}
                primaryTypographyProps={{
                  sx: {
                    color: 'black',
                    fontSize: '1rem',
                    fontWeight: 400,
                  },
                }}
              />
            </ListItem>
          </List>
        </Box>
      </Box>
      
      {/* Language and Region Drawer */}
      <LanguageAndRegionDrawer
        open={languageDrawerOpen}
        onClose={handleLanguageDrawerClose}
        onBack={handleLanguageDrawerBack}
      />
    </Drawer>
  );
};

export default SettingsDrawer;
