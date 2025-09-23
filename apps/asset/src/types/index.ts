export interface Asset {
  id: string;
  name: string;
  type: 'equipment' | 'vehicle' | 'building' | 'furniture' | 'technology';
  status: 'active' | 'inactive' | 'maintenance' | 'retired';
  location: string;
  purchaseDate: string;
  warrantyExpiry?: string;
  value: number;
  description: string;
  assignedTo?: string;
  lastMaintenanceDate?: string;
  nextMaintenanceDate?: string;
}

export interface AssetFormData {
  name: string;
  type: 'equipment' | 'vehicle' | 'building' | 'furniture' | 'technology';
  location: string;
  purchaseDate: string;
  warrantyExpiry?: string;
  value: number;
  description: string;
  assignedTo?: string;
}
