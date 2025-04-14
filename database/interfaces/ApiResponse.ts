// Interfaces para respuestas estandarizadas
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  pagination?: {
    total: number;
    limit: number;
    offset: number;
  };
}

export interface ListResponse<T> {
  items: T[];
  total: number;
  limit: number;
  offset: number;
}

// Interfaces para sincronización
export interface SyncPayload {
  customers: Customer[];
  purchases: Purchase[];
  products: Product[];
  users: User[];
  statuses: Status[];
  lastSync: string;
}

export interface SyncResult {
  created: number;
  updated: number;
  deleted: number;
  lastSync: string;
}