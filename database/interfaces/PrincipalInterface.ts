

// Interfaces de usuario y autenticación
export interface User {
  id:string;
  name: string;
  username: string;
  email?: string;
  role?: 'admin' | 'cobrador' | 'vendedor';
  isActive?: boolean;
}

export interface AuthUser {
  id: string;
  name: string;
  username: string;
  token: string;
  role: 'admin' | 'cobrador' | 'vendedor';
}

// Interfaces de ubicación
export interface Direction {
  calle?: string;
  numeroCasa?: string;
  coloniaId?: string;
  estadoId?: string;
  ciudadId?: string;
  entreCalles?: string;
  referencia?: string;
  location?: {
    lat: number;
    lng: number;
  };
}

export interface Estado {
  id: string;
  name: string;
}

export interface Ciudad {
  id: string;
  name: string;
  estadoId: string;
}

export interface Colonia {
  id: string;
  name: string;
  ciudadId: string;
  codigoPostal?: string;
}

// Interfaces de notas
export interface Note {
  id?: number;
  customerId:string;
  content: string;
  createdAt: string;
  updatedAt:string;
  createdBy?: string;
  user?: User; // Populate
}

// Interfaces de cliente
export interface Customer {
  id:string;
  date:string;
  name: string;
  phone?: string;
  direction: Direction;
  statusId: string;
  status?: Status; // Populate
  cobradorId?: string;
  cobrador?: User; // Populate
  purchasesId?: string[]; // IDs de compras
  notes?: Note[];
}

// Interfaces de productos
export interface Product {
  id:string;
  name: string;
  price: number;
  description?: string;
  code?: string;
  isActive: boolean;
  stock?: number;
}

export interface ProductItem {
  productId: string;
  product?: Product; // Populate
  quantity: number;
  unitPrice?: number;
  discount?: number;
}

// Interfaces de estado/status
export interface Status {
  id:string;
  name: string;
  type?: 'customer' | 'purchase' | 'payment';
  color?: string;
  isDefault?: boolean;
}

// Interfaces de frecuencia de cobro
export interface CollectionFrequency {
  amount?: number;
  frequency?: string|number; // Días entre cobros
  nextVisit?: string; // Próxima fecha de visita calculada
}

// Interfaces de historial de cobradores
export interface CobradorHistorial {
  cobradorId: string;
  cobrador?: User; // Populate
  asignadoDesde: string;
  asignadoHasta?: string;
  reason?: string;
}

// Interfaces de pagos
export interface Payment {
  id:string;
  createdAt:string;
  amount: number;
  date: string;
  method?: string;
  receiptId?: string;
  userId: string;
  user?: User; // Populate
  notes?: string;
  images?: string[]; // URLs de comprobantes
}

// Interfaces de compras/ventas
export interface Purchase {
  id:string;
  createdAt:string;
  // updatedAt:string;
  customerId: string;
  customer?: Customer; // Populate
  vendedorId?: string;
  vendedor?: User; // Populate
  cobradorId: string;
  cobrador?: User; // Populate
  saleDate: string;
  creditPrice: number;
  cashPrice: number;
  cashPriceEndDate: string;
  collectionDate: string;
  products: ProductItem[];
  totalPaid: number;
  statusId: string;
  status?: Status; // Populate
  isActive: boolean;
  cobradorHistorial: CobradorHistorial[];
  payments: Payment[];
  collectionFrequency?: CollectionFrequency;
  discount?: number;
  tax?: number;
  total: number;
}