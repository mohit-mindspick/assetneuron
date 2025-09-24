import React, { useState, useEffect } from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  FormControl,
  Select,
  MenuItem,
  Button,
  InputLabel,
  FormHelperText,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  Close as CloseIcon,
  ArrowBack as ArrowBackIcon,
  Info as InfoIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import { handleLocaleChange } from '../i18n';
import { useLocaleData, useSaveUserPreferences } from '../hooks/useLocaleData';

interface LanguageAndRegionDrawerProps {
  open: boolean;
  onClose: () => void;
  onBack: () => void;
}

const LanguageAndRegionDrawer: React.FC<LanguageAndRegionDrawerProps> = ({ 
  open, 
  onClose, 
  onBack 
}) => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const [preferredLanguage, setPreferredLanguage] = useState('en-GB');
  const [country, setCountry] = useState('IN');
  const [timeZone, setTimeZone] = useState('IST');
  const [isSaving, setIsSaving] = useState(false);

  // Use the custom hooks for API data
  const { languages, countries, timezones, loading, error, refetch } = useLocaleData();
  const { savePreferences, saving: apiSaving, error: saveError } = useSaveUserPreferences();

  // Initialize state from localStorage and current i18n language
  useEffect(() => {
    // Load saved settings from localStorage
    const savedCountry = localStorage.getItem('userCountry') || 'IN';
    const savedTimeZone = localStorage.getItem('userTimeZone') || 'IST';
    const savedLanguage = localStorage.getItem('userPreferredLanguage');
    
    // Set country and timezone from saved values
    setCountry(savedCountry);
    setTimeZone(savedTimeZone);
    
    // Set language from saved value or current i18n language
    if (savedLanguage) {
      setPreferredLanguage(savedLanguage);
    } else {
      // Map i18n locale back to language code
      const currentLanguage = i18n.language;
      const languageMap: { [key: string]: string } = {
        'en': 'en-GB', // Default to en-GB for English
        'es': 'es-ES',
        'fr': 'fr-FR',
        'de': 'de-DE',
        'hi': 'hi-IN',
      };
      const mappedLanguage = languageMap[currentLanguage] || 'en-GB';
      setPreferredLanguage(mappedLanguage);
    }
  }, [i18n.language]);

  // Map language codes to i18n locale codes
  const getLocaleFromLanguage = (languageCode: string): string => {
    const languageMap: { [key: string]: string } = {
      'en-GB': 'en',
      'en-US': 'en',
      'es-ES': 'es',
      'fr-FR': 'fr',
      'de-DE': 'de',
      'hi-IN': 'hi',
      'it-IT': 'it',
      'pt-BR': 'pt',
      'zh-CN': 'zh',
      'zh-TW': 'zh',
      'ja-JP': 'ja',
      'ko-KR': 'ko',
      'ru-RU': 'ru',
      'ar-SA': 'ar',
    };
    return languageMap[languageCode] || 'en';
  };

  const handleLanguageChange = (newLanguage: string) => {
    setPreferredLanguage(newLanguage);
    console.log(`Language selection changed to: ${newLanguage}`);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Get the corresponding locale code for the selected language
      const locale = getLocaleFromLanguage(preferredLanguage);
      
      console.log('Saving language and region settings:', {
        preferredLanguage,
        country,
        timeZone,
        targetLocale: locale,
        currentLocale: i18n.language,
      });
      
      // Save preferences to API
      const saveSuccess = await savePreferences({
        language: preferredLanguage,
        country: country,
        timezone: timeZone,
      });

      if (!saveSuccess) {
        throw new Error('Failed to save preferences to server');
      }
      
      // Change locale if it's different from current
      if (locale !== i18n.language) {
        console.log(`Changing locale from ${i18n.language} to ${locale}`);
        await handleLocaleChange(locale);
        console.log('Locale change completed successfully');
      } else {
        console.log('Locale is already set to the selected language');
      }
      
      // Save to localStorage as backup
      localStorage.setItem('userCountry', country);
      localStorage.setItem('userTimeZone', timeZone);
      localStorage.setItem('userPreferredLanguage', preferredLanguage);
      
      onClose();
    } catch (error) {
      console.error('Failed to save settings:', error);
      // You could show a toast notification here
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    onClose();
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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton
              onClick={onBack}
              sx={{
                color: 'black',
                '&:hover': {
                  backgroundColor: 'rgba(0,0,0,0.04)',
                },
              }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography
              variant="body2"
              sx={{
                color: '#666',
                fontSize: '0.9rem',
              }}
            >
              {t('languageAndRegion.breadcrumb')}
            </Typography>
          </Box>
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

        {/* Title */}
        <Box sx={{ p: 3, pb: 2 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 600,
              color: 'black',
              fontSize: '1.8rem',
              textAlign: 'center',
            }}
          >
            {t('languageAndRegion.title')}
          </Typography>
        </Box>

                {/* Content */}
                <Box sx={{ flexGrow: 1, p: 3, pt: 0 }}>
                  {/* Error State */}
                  {error && (
                    <Alert 
                      severity="error" 
                      sx={{ mb: 3 }}
                      action={
                        <Button color="inherit" size="small" onClick={refetch}>
                          Retry
                        </Button>
                      }
                    >
                      {error.message}
                    </Alert>
                  )}

                  {/* Loading State */}
                  {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 4 }}>
                      <CircularProgress />
                      <Typography sx={{ ml: 2 }}>Loading locale data...</Typography>
                    </Box>
                  ) : (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                      {/* Preferred Language */}
                      <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <Typography
                            variant="body1"
                            sx={{
                              color: 'black',
                              fontSize: '1rem',
                              fontWeight: 500,
                            }}
                          >
                            {t('languageAndRegion.preferredLanguage')} *
                          </Typography>
                          <InfoIcon
                            sx={{
                              color: '#666',
                              fontSize: '1.2rem',
                            }}
                          />
                        </Box>
                        <FormControl fullWidth>
                          <Select
                            value={preferredLanguage}
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
                          >
                            {languages.map((language) => (
                              <MenuItem key={language.value} value={language.value}>
                                {language.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Box>

                      {/* Country */}
                      <Box>
                        <Typography
                          variant="body1"
                          sx={{
                            color: 'black',
                            fontSize: '1rem',
                            fontWeight: 500,
                            mb: 1,
                          }}
                        >
                          {t('languageAndRegion.country')} *
                        </Typography>
                        <FormControl fullWidth>
                          <Select
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
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
                          >
                            {countries.map((countryOption) => (
                              <MenuItem key={countryOption.value} value={countryOption.value}>
                                {countryOption.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Box>

                      {/* Time Zone */}
                      <Box>
                        <Typography
                          variant="body1"
                          sx={{
                            color: 'black',
                            fontSize: '1rem',
                            fontWeight: 500,
                            mb: 1,
                          }}
                        >
                          {t('languageAndRegion.timeZone')} *
                        </Typography>
                        <FormControl fullWidth>
                          <Select
                            value={timeZone}
                            onChange={(e) => setTimeZone(e.target.value)}
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
                          >
                            {timezones.map((timezoneOption) => (
                              <MenuItem key={timezoneOption.value} value={timezoneOption.value}>
                                {timezoneOption.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Box>
                    </Box>
                  )}
                </Box>

        {/* Action Buttons */}
        <Box
          sx={{
            p: 3,
            pt: 2,
            borderTop: '1px solid #e0e0e0',
            display: 'flex',
            gap: 2,
            justifyContent: 'space-between',
          }}
        >
          <Button
            variant="text"
            onClick={handleCancel}
            sx={{
              color: theme.palette.primary.main,
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 500,
              px: 3,
              py: 1,
              '&:hover': {
                backgroundColor: 'transparent',
                color: theme.palette.primary.dark,
              },
            }}
          >
            {t('languageAndRegion.cancel')}
          </Button>
                  <Button
                    variant="contained"
                    onClick={handleSave}
                    disabled={isSaving || apiSaving || loading}
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
                      '&:disabled': {
                        backgroundColor: '#ccc',
                        color: '#666',
                      },
                    }}
                  >
                    {(isSaving || apiSaving) ? t('common.saving', 'Saving...') : t('languageAndRegion.save')}
                  </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default LanguageAndRegionDrawer;
