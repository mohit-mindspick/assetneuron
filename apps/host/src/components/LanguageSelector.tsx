import React, { useState, useEffect } from 'react';
import {
  Select,
  MenuItem,
  FormControl,
  IconButton,
  Tooltip,
  Box,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { handleLocaleChange } from '../i18n';
import { Language } from '@mui/icons-material';


interface LanguageOption {
  value: string;
  label: string;
  flag: string;
}

const languageOptions: LanguageOption[] = [
  { value: 'en-US', label: 'English', flag: '🇺🇸' },
  { value: 'es-ES', label: 'Español', flag: '🇪🇸' },
];

interface LanguageSelectorProps {
  variant?: 'icon' | 'dropdown';
  size?: 'small' | 'medium';
  showLabel?: boolean;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  variant = 'icon', 
  size = 'medium',
  showLabel = false 
}) => {
  const { i18n } = useTranslation();
  
  // Initialize with current language or fallback to English
  const getInitialLanguage = () => {
    // First try to get from localStorage
    const savedLanguage = localStorage.getItem('userPreferredLanguage');
    
    if (savedLanguage && languageOptions.find(opt => opt.value === savedLanguage)) {
      return savedLanguage;
    }
    // Then try i18n language
    if (i18n.language && languageOptions.find(opt => opt.value === i18n.language)) {
      return i18n.language;
    }
    // Fallback to English
    return 'en-US';
  };

  const [selectedLanguage, setSelectedLanguage] = useState(getInitialLanguage());

  // Update selected language when i18n language changes
  useEffect(() => {
    const currentLanguage = i18n.language || 'en-US';
    if (currentLanguage !== selectedLanguage) {
      setSelectedLanguage(currentLanguage);
    }
  }, [i18n.language, selectedLanguage]);

  // Additional effect to handle i18n initialization
  useEffect(() => {
    if (i18n.isInitialized && i18n.language) {
      const currentLanguage = i18n.language;
      setSelectedLanguage(currentLanguage);
    }
  }, [i18n.isInitialized, i18n.language]);

  const handleLanguageChange = async (newLanguage: string) => {
    try {
      console.log(`🌍 Changing language from ${i18n.language} to ${newLanguage}`);
      
      // Save language preference to localStorage
      localStorage.setItem('userPreferredLanguage', newLanguage);
      
      // Change the locale using the shared handler
      await handleLocaleChange(newLanguage);
      
      setSelectedLanguage(newLanguage);
      console.log(`✅ Language changed successfully to ${newLanguage}`);
    } catch (error) {
      console.error('❌ Failed to change language:', error);
    }
  };

  const getCurrentLanguageOption = () => {
    return languageOptions.find(option => option.value === selectedLanguage) || languageOptions[0];
  };

  if (variant === 'icon') {
    return (
      <Tooltip title={getCurrentLanguageOption().label}>
        <FormControl size={size}>
          <Select
            key={selectedLanguage}
            value={selectedLanguage}
            onChange={(e) => handleLanguageChange(e.target.value as string)}
            sx={{
              '& .MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
              '& .MuiSelect-select': {
                padding: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                minWidth: 'auto',
              },
              '& .MuiSelect-icon': {
                display: 'none',
              },
            }}
            renderValue={() => (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                 <Language sx={{ fontSize: '1.2rem', color: '#556b2f' }} />
              </Box>
            )}
          >
            {languageOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <span style={{ fontSize: '1.2rem' }}>{option.flag}</span>
                  <span>{option.label}</span>
                </Box>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Tooltip>
    );
  }

  return (
    <FormControl size={size} sx={{ minWidth: 120 }}>
      <Select
        key={selectedLanguage}
        value={selectedLanguage}
        onChange={(e) => handleLanguageChange(e.target.value as string)}
        sx={{
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#e0e0e0',
            borderRadius: '8px',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#d0d0d0',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#6B7C32',
          },
        }}
        renderValue={() => (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <span style={{ fontSize: '1.2rem' }}>{getCurrentLanguageOption().flag}</span>
            {showLabel && <span>{getCurrentLanguageOption().label}</span>}
          </Box>
        )}
      >
        {languageOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <span style={{ fontSize: '1.2rem' }}>{option.flag}</span>
              <span>{option.label}</span>
            </Box>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default LanguageSelector;
