
export interface Customer {
  id?: string; // Mantenemos el _id de MongoDB por si acaso
  name: string;
  cobradorId?: string;
  phone?: string;
  date: string; // Usamos string para las fechas en SQLite
  direction: Direction;
  statusId: string;
  purchases?: string[]; // Array de IDs de purchases
  updatedAt: string;
  notes?: Note[];
  v?: number;
}

export interface Direction {
  calle: string;
  numeroCasa: string;
  coloniaId: string;
  estadoId: string;
  ciudadId: string;
  entreCalles?: string;
  referencia?: string;
}

export interface Note {
  content: string;
  createdAt: string;
}

export interface Purchase {
  id: string; // Mantener el ID de MongoDB
  customerId: string;
  vendedorId?: string;
  cobradorId: string;
  saleDate: string; // ISO string
  creditPrice: number;
  cashPrice: number;
  cashPriceEndDate: string;
  collectionDate: string;
  sentToCobrador: boolean;
  totalPaid: number;
  updatedAt: string;
  statusId: string;
  isActive: boolean;

  // Relaciones (equivalente a populate)
  customer?: Customer; // Para simular populate
  cobrador?: User;
  vendedor?: User;
  status?: Status;

  // Arrays (se guardarán en tablas separadas)
  cobradorHistorial: CobradorHistorial[];
  notes: Note[];
  products: ProductItem[];
  payments: Payment[];
  collectionFrequency?: CollectionFrequency;
}

export interface CobradorHistorial {
  cobradorId: string;
  asignadoDesde: string;
  asignadoHasta?: string;
}

export interface CollectionFrequency {
  amount?: string;
  frequency?: number;
}

export interface ProductItem {
  quantity: number;
  productId: string;
  product?: Product; // Para simular populate
}

export interface Payment {
  date: string;
  amount: number;
  receiptId?: string;
  userId: string;
  user?: User; // Para simular populate
}

export interface Status {
  id: string;
  name:string
}
export interface User {
  id:string;
  name:string;
  username:string;
}

export interface Product {
  id:string;
  name:string;
  price:string;
}
