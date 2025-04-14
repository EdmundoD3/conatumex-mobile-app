// Interfaces para filtros y paginación
export interface PaginationOptions {
  limit?: number;
  offset?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface CustomerFilter extends PaginationOptions {
  name?: string;
  cobradorId?: string;
  statusId?: string;
  isActive?: boolean;
}

export interface PurchaseFilter extends PaginationOptions {
  customerId?: string;
  cobradorId?: string;
  vendedorId?: string;
  statusId?: string;
  isActive?: boolean;
  minDate?: string;
  maxDate?: string;
  minAmount?: number;
  maxAmount?: number;
}

// Interfaces para reportes
export interface CollectionReport {
  cobradorId: string;
  cobradorName: string;
  totalCollected: number;
  totalPending: number;
  visitsCompleted: number;
  visitsPending: number;
}

export interface SalesReport {
  vendedorId?: string;
  vendedorName?: string;
  totalSales: number;
  totalCash: number;
  totalCredit: number;
  averageSale: number;
  salesCount: number;
}