import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Divider,
  Avatar,
  Chip,
  Alert,
  CircularProgress,
  IconButton,
  Collapse,
} from '@mui/material';
import {
  Person,
  Google,
  Visibility,
  VisibilityOff,
  ExpandLess,
  ExpandMore,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { useAppContext } from '../context/AppContext';
import { getCustomColors } from '../../../../packages/shared/theme';
import authApi, { User } from '../services/authApi';
import LanguageSelector from './LanguageSelector';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, loginWithDemoUser, isLoading } = useAuth();
  const { state } = useAppContext();
  const { t } = useTranslation();
  const customColors = getCustomColors(state.theme);
  const [showManualLogin, setShowManualLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [demoUsers] = useState<User[]>(authApi.getDemoUsers());

  const handleDemoUserLogin = async (userId: string) => {
    setError('');
    const result = await loginWithDemoUser(userId);
    if (result.success) {
      navigate('/');
    } else {
      setError(result.message || 'Login failed');
    }
  };

  const handleManualLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    const result = await login(username, password);
    if (result.success) {
      navigate('/');
    } else {
      setError(result.message || 'Login failed');
    }
  };

  const handleGoogleLogin = () => {
    // Mock Google login - in real app, this would integrate with Google OAuth
    setError('Google login not implemented in demo');
  };

  const getRoleColor = (role: string): string => {
    return customColors.common.roles[role as keyof typeof customColors.common.roles] || customColors.common.gray[500];
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(135deg, ${customColors.common.backgrounds.light} 0%, ${customColors.common.backgrounds.dark} 100%)`,
        padding: 2,
      }}
    >
      <Card
        sx={{
          maxWidth: 500,
          width: '100%',
          borderRadius: 3,
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        }}
      >
        <CardContent sx={{ p: 4 }}>
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography
                variant="h4"
                sx={{
                  color: 'primary.main',
                  fontWeight: 'bold',
                  letterSpacing: 2,
                }}
              >
                AssetNeuron
              </Typography>
              <LanguageSelector variant="icon" size="medium" />
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: customColors.common.gray[800] }}>
              {t('login.title')}
            </Typography>
          </Box>

          {/* Error Alert */}
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {/* Demo Users Section */}
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="h6"
              sx={{
                color: 'customColors.common.brand.gold',
                mb: 2,
                fontWeight: 500,
              }}
            >
              {t('login.selectDemoUser')}
            </Typography>
            {demoUsers.slice(0, 4).map((user) => (
              <Card
                key={user.id}
                sx={{
                  mb: 2,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 2,
                  },
                }}
                onClick={() => handleDemoUserLogin(user.id)}
              >
                <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        {user.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {user.department}
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      <Chip
                        label={user.role}
                        size="small"
                        sx={{
                          backgroundColor: getRoleColor(user.role),
                          color: 'text.primary',
                          mb: 1,
                        }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        {user.username}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>

          {/* Divider */}
          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" color="text.secondary">
              or
            </Typography>
          </Divider>

          {/* Google Login */}
          <Button
            fullWidth
            variant="outlined"
            startIcon={<Google />}
            onClick={handleGoogleLogin}
            disabled={isLoading}
            sx={{
              mb: 2,
              py: 1.5,
              borderColor: 'customColors.common.brand.oliveDark',
              color: 'customColors.common.gray[800]',
              '&:hover': {
                borderColor: 'customColors.common.brand.oliveDark',
                backgroundColor: 'customColors.common.backgrounds.selected',
              },
            }}
          >
{t('login.continueWithGoogle')}
          </Button>

          {/* Manual Login Toggle */}
          <Button
            fullWidth
            variant="outlined"
            onClick={() => setShowManualLogin(!showManualLogin)}
            disabled={isLoading}
            sx={{
              py: 1.5,
              borderColor: 'customColors.common.brand.oliveDark',
              color: 'customColors.common.brand.oliveDark',
              '&:hover': {
                borderColor: 'customColors.common.brand.oliveDark',
                backgroundColor: 'customColors.common.backgrounds.selected',
              },
            }}
          >
{t('login.manualLogin')}
            {showManualLogin ? <ExpandLess /> : <ExpandMore />}
          </Button>

          {/* Manual Login Form */}
          <Collapse in={showManualLogin}>
            <Box component="form" onSubmit={handleManualLogin} sx={{ mt: 3 }}>
              <TextField
                fullWidth
                label={t('login.username')}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
                sx={{ mb: 2 }}
                InputProps={{
                  startAdornment: <Person sx={{ mr: 1, color: 'text.secondary' }} />,
                }}
              />
              <TextField
                fullWidth
                label={t('login.password')}
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                sx={{ mb: 3 }}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  ),
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isLoading}
                sx={{
                  py: 1.5,
                  backgroundColor: 'customColors.common.brand.oliveDark',
                  '&:hover': {
                    backgroundColor: 'customColors.common.brand.oliveLight',
                  },
                }}
              >
                {isLoading ? <CircularProgress size={24} /> : t('login.loginButton')}
              </Button>
            </Box>
          </Collapse>

          {/* Back to Main Login Link */}
          {/* <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Button
              variant="text"
              onClick={() => navigate('/')}
              sx={{ color: 'customColors.common.brand.oliveDark' }}
            >
{t('login.backToMainLogin')}
            </Button>
          </Box> */}
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
