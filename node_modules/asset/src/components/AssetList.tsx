import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  IconButton,
  Button,
  Grid,
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
} from '@mui/material';
import {
  Add,
  Search,
  Edit,
  Delete,
  Visibility,
  LocationOn,
  AttachMoney,
  CalendarToday,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { Asset, AssetFormData } from '../types';

const AssetList: React.FC = () => {
  const { t } = useTranslation();
  
  const [assets, setAssets] = useState<Asset[]>([]);

  // Initialize assets with translations after i18n is ready
  useEffect(() => {
    const initialAssets: Asset[] = [
      {
        id: 'ASSET-001',
        name: t('asset.sampleData.hvacSystem.name'),
        type: 'equipment',
        status: 'active',
        location: 'Building A - Floor 1',
        purchaseDate: '2022-01-15',
        warrantyExpiry: '2025-01-15',
        value: 25000,
        description: t('asset.sampleData.hvacSystem.description'),
        assignedTo: 'Facilities Team',
        lastMaintenanceDate: '2024-01-10',
        nextMaintenanceDate: '2024-04-10',
      },
      {
        id: 'ASSET-002',
        name: t('asset.sampleData.companyVehicle.name'),
        type: 'vehicle',
        status: 'active',
        location: 'Main Office Parking',
        purchaseDate: '2023-03-20',
        warrantyExpiry: '2026-03-20',
        value: 35000,
        description: t('asset.sampleData.companyVehicle.description'),
        assignedTo: 'Logistics Team',
        lastMaintenanceDate: '2024-01-05',
        nextMaintenanceDate: '2024-02-05',
      },
      {
        id: 'ASSET-003',
        name: t('asset.sampleData.officeBuilding.name'),
        type: 'building',
        status: 'active',
        location: '123 Business Street',
        purchaseDate: '2020-06-01',
        value: 2500000,
        description: t('asset.sampleData.officeBuilding.description'),
        assignedTo: 'Property Management',
      },
      {
        id: 'ASSET-004',
        name: t('asset.sampleData.conferenceFurniture.name'),
        type: 'furniture',
        status: 'active',
        location: 'Building A - Floor 2',
        purchaseDate: '2023-08-15',
        value: 15000,
        description: t('asset.sampleData.conferenceFurniture.description'),
        assignedTo: 'Office Manager',
      },
      {
        id: 'ASSET-005',
        name: t('asset.sampleData.serverRack.name'),
        type: 'technology',
        status: 'maintenance',
        location: 'Data Center - Basement',
        purchaseDate: '2021-11-10',
        warrantyExpiry: '2024-11-10',
        value: 45000,
        description: t('asset.sampleData.serverRack.description'),
        assignedTo: 'IT Department',
        lastMaintenanceDate: '2024-01-12',
        nextMaintenanceDate: '2024-01-25',
      },
    ];
    setAssets(initialAssets);
  }, [t]); // Dependency on t ensures re-initialization on language change

  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [openDialog, setOpenDialog] = useState(false);
  const [editingAsset, setEditingAsset] = useState<Asset | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'default';
      case 'maintenance':
        return 'warning';
      case 'retired':
        return 'error';
      default:
        return 'default';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'equipment':
        return '⚙️';
      case 'vehicle':
        return '🚗';
      case 'building':
        return '🏢';
      case 'furniture':
        return '🪑';
      case 'technology':
        return '💻';
      default:
        return '📦';
    }
  };

  const filteredAssets = assets.filter((asset) => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.assignedTo?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || asset.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || asset.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleDelete = (id: string) => {
    setAssets(assets.filter(asset => asset.id !== id));
  };

  const handleEdit = (asset: Asset) => {
    setEditingAsset(asset);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingAsset(null);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          {t('asset.title')}
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpenDialog(true)}
        >
          {t('asset.addAsset')}
        </Button>
      </Box>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            placeholder={t('asset.searchPlaceholder') || 'Search assets...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel>{t('asset.typeFilter')}</InputLabel>
            <Select
              value={typeFilter}
              label={t('asset.typeFilter')}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <MenuItem value="all">{t('asset.allTypes')}</MenuItem>
              <MenuItem value="equipment">{t('asset.type.equipment')}</MenuItem>
              <MenuItem value="vehicle">{t('asset.type.vehicle')}</MenuItem>
              <MenuItem value="building">{t('asset.type.building')}</MenuItem>
              <MenuItem value="furniture">{t('asset.type.furniture')}</MenuItem>
              <MenuItem value="technology">{t('asset.type.technology')}</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel>{t('asset.statusFilter')}</InputLabel>
            <Select
              value={statusFilter}
              label={t('asset.statusFilter')}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <MenuItem value="all">{t('asset.allStatus')}</MenuItem>
              <MenuItem value="active">{t('asset.status.active')}</MenuItem>
              <MenuItem value="inactive">{t('asset.status.inactive')}</MenuItem>
              <MenuItem value="maintenance">{t('asset.status.maintenance')}</MenuItem>
              <MenuItem value="retired">{t('asset.status.retired')}</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        {filteredAssets.map((asset) => (
          <Grid item xs={12} md={6} lg={4} key={asset.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexGrow: 1 }}>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      {getTypeIcon(asset.type)}
                    </Avatar>
                    <Box>
                      <Typography variant="h6" component="h2">
                        {asset.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {asset.id}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton size="small" onClick={() => handleEdit(asset)}>
                      <Edit />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleDelete(asset.id)}>
                      <Delete />
                    </IconButton>
                  </Box>
                </Box>
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {asset.description}
                </Typography>
                
                <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                  <Chip
                    label={asset.type}
                    variant="outlined"
                    size="small"
                  />
                  <Chip
                    label={asset.status}
                    color={getStatusColor(asset.status) as any}
                    size="small"
                  />
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <LocationOn fontSize="small" color="action" />
                  <Typography variant="body2">
                    {asset.location}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <AttachMoney fontSize="small" color="action" />
                  <Typography variant="body2">
                    {formatCurrency(asset.value)}
                  </Typography>
                </Box>
                
                {asset.assignedTo && (
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Assigned to:</strong> {asset.assignedTo}
                  </Typography>
                )}
                
                {asset.nextMaintenanceDate && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CalendarToday fontSize="small" color="action" />
                    <Typography variant="body2">
                      Next maintenance: {asset.nextMaintenanceDate}
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingAsset ? t('asset.editAsset') : t('asset.addAsset')}
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary">
            {t('asset.assetForm')}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>{t('common.cancel')}</Button>
          <Button variant="contained" onClick={handleCloseDialog}>
            {editingAsset ? t('common.update') : t('common.create')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AssetList;
