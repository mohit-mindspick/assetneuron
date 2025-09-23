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
        return <WorkorderApp />;
      case 'asset':
        return <AssetApp />;
      default:
        return (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6" color="error">
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
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '400px',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <CircularProgress />
          <Typography variant="body1">
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
