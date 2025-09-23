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
} from '@mui/material';
import {
  Add,
  Search,
  Edit,
  Delete,
  Visibility,
  FilterList,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { WorkOrder, WorkOrderFormData } from '../types';

const WorkOrderList: React.FC = () => {
  const { t } = useTranslation();
  
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>([]);

  // Initialize work orders with translations after i18n is ready
  useEffect(() => {
    const initialWorkOrders: WorkOrder[] = [
      {
        id: '1',
        title: t('workorder.sampleData.hvacRepair.title'),
        description: t('workorder.sampleData.hvacRepair.description'),
        status: 'in-progress',
        priority: 'high',
        assignedTo: 'John Smith',
        createdAt: '2024-01-15',
        dueDate: '2024-01-20',
        assetId: 'ASSET-001',
      },
      {
        id: '2',
        title: t('workorder.sampleData.lightBulbs.title'),
        description: t('workorder.sampleData.lightBulbs.description'),
        status: 'pending',
        priority: 'medium',
        assignedTo: 'Jane Doe',
        createdAt: '2024-01-16',
        dueDate: '2024-01-22',
      },
      {
        id: '3',
        title: t('workorder.sampleData.maintenance.title'),
        description: t('workorder.sampleData.maintenance.description'),
        status: 'completed',
        priority: 'low',
        assignedTo: 'Mike Johnson',
        createdAt: '2024-01-10',
        dueDate: '2024-01-15',
      },
    ];
    setWorkOrders(initialWorkOrders);
  }, [t]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [openDialog, setOpenDialog] = useState(false);
  const [editingWorkOrder, setEditingWorkOrder] = useState<WorkOrder | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'in-progress':
        return 'info';
      case 'completed':
        return 'success';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'error';
      case 'high':
        return 'warning';
      case 'medium':
        return 'info';
      case 'low':
        return 'success';
      default:
        return 'default';
    }
  };

  const filteredWorkOrders = workOrders.filter((wo) => {
    const matchesSearch = wo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         wo.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         wo.assignedTo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || wo.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDelete = (id: string) => {
    setWorkOrders(workOrders.filter(wo => wo.id !== id));
  };

  const handleEdit = (workOrder: WorkOrder) => {
    setEditingWorkOrder(workOrder);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingWorkOrder(null);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          {t('workorder.title')}
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpenDialog(true)}
        >
          {t('workorder.createWorkOrder')}
        </Button>
      </Box>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={8}>
          <TextField
            fullWidth
            placeholder={t('workorder.searchPlaceholder') || 'Search work orders...'}
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
            <InputLabel>{t('workorder.statusFilter')}</InputLabel>
            <Select
              value={statusFilter}
              label={t('workorder.statusFilter')}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <MenuItem value="all">{t('workorder.allStatus')}</MenuItem>
              <MenuItem value="pending">{t('workorder.status.pending')}</MenuItem>
              <MenuItem value="in-progress">{t('workorder.status.inProgress')}</MenuItem>
              <MenuItem value="completed">{t('workorder.status.completed')}</MenuItem>
              <MenuItem value="cancelled">{t('workorder.status.cancelled')}</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        {filteredWorkOrders.map((workOrder) => (
          <Grid item xs={12} md={6} lg={4} key={workOrder.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Typography variant="h6" component="h2" sx={{ flexGrow: 1 }}>
                    {workOrder.title}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton size="small" onClick={() => handleEdit(workOrder)}>
                      <Edit />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleDelete(workOrder.id)}>
                      <Delete />
                    </IconButton>
                  </Box>
                </Box>
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {workOrder.description}
                </Typography>
                
                <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                  <Chip
                    label={workOrder.status}
                    color={getStatusColor(workOrder.status) as any}
                    size="small"
                  />
                  <Chip
                    label={workOrder.priority}
                    color={getPriorityColor(workOrder.priority) as any}
                    size="small"
                  />
                </Box>
                
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Assigned to:</strong> {workOrder.assignedTo}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Due Date:</strong> {workOrder.dueDate}
                </Typography>
                {workOrder.assetId && (
                  <Typography variant="body2">
                    <strong>Asset ID:</strong> {workOrder.assetId}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingWorkOrder ? t('workorder.editWorkOrder') : t('workorder.createWorkOrder')}
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary">
            {t('workorder.workOrderForm')}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>{t('common.cancel')}</Button>
          <Button variant="contained" onClick={handleCloseDialog}>
            {editingWorkOrder ? t('common.update') : t('common.create')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default WorkOrderList;
