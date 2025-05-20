import { SQLiteDatabase } from "expo-sqlite";

const CustomerTables = {
  customer: "customers",
  directions: "customer_directions",
  notes: "customer_notes",
  relPurchases: "customer_purchases",
};

export type TCustomer = {
  id: string;
  name: string;
  cobradorId?: string;
  phone?: string;
  date: string;
  statusId: string;
};
const TableCustomer = `
      CREATE TABLE IF NOT EXISTS customers (
        id TEXT PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        cobradorId TEXT,
        phone TEXT,
        date TEXT NOT NULL,
        statusId TEXT NOT NULL,
        FOREIGN KEY (statusId) REFERENCES statuses(id),
        FOREIGN KEY (cobradorId) REFERENCES users(id)
      );
    `;
export type TDireccion = {
  customerId: string;
  calle?: string;
  numeroCasa?: string;
  coloniaId?: string;
  estadoId?: string;
  ciudadId?: string;
  entreCalles?: string;
  referencia?: string;
};


const TableDirection = `
CREATE TABLE IF NOT EXISTS customer_directions (
  customerId TEXT NOT NULL,
  calle TEXT,
  numeroCasa TEXT,
  coloniaId TEXT,
  estadoId TEXT,
  ciudadId TEXT,
  entreCalles TEXT,
  referencia TEXT,
  PRIMARY KEY (customerId),
  FOREIGN KEY (customerId) REFERENCES customers(id) ON DELETE CASCADE,
  FOREIGN KEY (coloniaId) REFERENCES direction_colonia(id),
  FOREIGN KEY (estadoId) REFERENCES direction_estado(id),
  FOREIGN KEY (ciudadId) REFERENCES direction_ciudad(id)
);`;
export type TColonia = {
  id: string;
  colonia: string;
};
const TableColonia = `
CREATE TABLE IF NOT EXISTS direction_colonia (
  id TEXT NOT NULL,
  colonia TEXT NOT NULL,
  PRIMARY KEY (id)
);`;


export type TEstado = {
  id: string;
  estado: string;
};
const TableEstado = `
CREATE TABLE IF NOT EXISTS direction_estado (
  id TEXT NOT NULL,
  estado TEXT NOT NULL,
  PRIMARY KEY (id)
);`;


export type TCiudad = {
  id: string;
  ciudad: string;
};
const TableCiudad = `
CREATE TABLE IF NOT EXISTS direction_ciudad (
  id TEXT NOT NULL,
  ciudad TEXT NOT NULL,
  PRIMARY KEY (id)
);`;

export type TNotes = {
  id: number;
  customerId: string;
  content: string;
  createdAt: string;
  updatedAt:string;
};
const TableNotes = `
      CREATE TABLE IF NOT EXISTS customer_notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        customerId TEXT NOT NULL,
        content TEXT NOT NULL,
        createdAt TEXT NOT NULL,
        updatedAt TEXT NOT NULL,
        FOREIGN KEY (customerId) REFERENCES customers(id) ON DELETE CASCADE
      );
    `;
export type TCustomerPurchase = {
  customerId: string;
  purchaseId: string;
};
const TablePurchases = `
      CREATE TABLE IF NOT EXISTS customer_purchases (
        customerId TEXT NOT NULL,
        purchaseId TEXT NOT NULL,
        PRIMARY KEY (customerId, purchaseId),
        FOREIGN KEY (customerId) REFERENCES customers(id) ON DELETE CASCADE,
        FOREIGN KEY (purchaseId) REFERENCES purchases(id) ON DELETE CASCADE
      );
    `;

export class CustomerTable {
  static async createTable(db: SQLiteDatabase) {
    await db.execAsync(TableCustomer);
    await db.execAsync(TableDirection);
    await db.execAsync(TableNotes);
    await db.execAsync(TablePurchases);
    await db.execAsync(TableColonia);
    await db.execAsync(TableEstado);
    await db.execAsync(TableCiudad);
  }
}
