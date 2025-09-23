import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
} from '@mui/material';
import { Assignment, Business, Dashboard } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { customColors } from 'shared';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const features = [
    {
      title: t('home.workOrders.title'),
      description: t('home.workOrders.description'),
      icon: <Assignment sx={{ fontSize: 40 }} />,
      path: '/workorder',
      color: customColors.workorder.primary,
    },
    {
      title: t('home.assets.title'),
      description: t('home.assets.description'),
      icon: <Business sx={{ fontSize: 40 }} />,
      path: '/asset',
      color: customColors.asset.primary,
    },
    {
      title: t('home.dashboard.title'),
      description: t('home.dashboard.description'),
      icon: <Dashboard sx={{ fontSize: 40 }} />,
      path: '/dashboard',
      color: customColors.dashboard.primary,
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          {t('app.welcome')}
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          {t('app.subtitle')}
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {features.map((feature) => (
          <Grid item xs={12} sm={6} md={4} key={feature.title}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4,
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                <Box
                  sx={{
                    color: feature.color,
                    mb: 2,
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  {feature.icon}
                </Box>
                <Typography variant="h5" component="h2" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                <Button
                  size="large"
                  variant="contained"
                  onClick={() => navigate(feature.path)}
                  sx={{ backgroundColor: feature.color }}
                >
{t('home.openFeature', { feature: feature.title })}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HomePage;
