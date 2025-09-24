import React, { Suspense, lazy, useEffect } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { refreshAllMicrofrontendLocales } from 'shared';

// Lazy load microfrontends
const WorkorderApp = lazy(() => import('workorder/WorkorderApp'));
const AssetApp = lazy(() => import('asset/AssetApp'));

interface MicrofrontendLoaderProps {
  microfrontend: 'workorder' | 'asset';
}

const MicrofrontendLoader: React.FC<MicrofrontendLoaderProps> = ({ microfrontend }) => {
  const { t } = useTranslation();
  
  // Refresh microfrontend locales when a microfrontend is loaded
  useEffect(() => {
    console.log(`🔄 Microfrontend ${microfrontend} loaded, refreshing locales...`);
    refreshAllMicrofrontendLocales().catch(error => {
      console.error(`❌ Failed to refresh locales for ${microfrontend}:`, error);
    });
  }, [microfrontend]);
  
  const renderMicrofrontend = () => {
    switch (microfrontend) {
      case 'workorder':
        return (
          <Box 
            role="main"
            aria-label="Work Order Management Application"
            sx={{ 
              width: '100%',
              height: '100%',
              minHeight: 'calc(100vh - 200px)',
            }}
          >
            <WorkorderApp />
          </Box>
        );
      case 'asset':
        return (
          <Box 
            role="main"
            aria-label="Asset Management Application"
            sx={{ 
              width: '100%',
              height: '100%',
              minHeight: 'calc(100vh - 200px)',
            }}
          >
            <AssetApp />
          </Box>
        );
      default:
        return (
          <Box 
            role="main"
            aria-label="Application Error"
            sx={{ 
              p: 3, 
              textAlign: 'center',
              width: '100%',
              height: '100%',
              minHeight: 'calc(100vh - 200px)',
            }}
          >
            <Typography variant="h6" color="error" role="alert" aria-live="polite">
              {t('microfrontend.notFound')}
            </Typography>
          </Box>
        );
    }
  };

  return (
    <Suspense
      fallback={
        <Box
          role="status"
          aria-label={`Loading ${microfrontend} application`}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 'calc(100vh - 200px)',
            width: '100%',
            height: '100%',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <CircularProgress aria-hidden="true" />
          <Typography variant="body1" aria-live="polite">
            {t('microfrontend.loading', { app: microfrontend })}
          </Typography>
        </Box>
      }
    >
      {renderMicrofrontend()}
    </Suspense>
  );
};

export default MicrofrontendLoader;
