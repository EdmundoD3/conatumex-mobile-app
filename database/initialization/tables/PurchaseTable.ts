import { SQLiteDatabase } from "expo-sqlite";
export type TPurchase = {
  id: string;
  customerId: string;
  vendedorId?: string;
  collectorId: string;
  saleDate: string;
  creditPrice: number;
  cashPrice: number;
  cashPriceEndDate: string;
  collectionDate: string;
  total: number;
  totalPaid: number;
  createdAt: string;
  updatedAt: string;
  statusId: string;
  isActive: number;
};

const TablePurchase = `
      CREATE TABLE IF NOT EXISTS purchases (
        id TEXT PRIMARY KEY NOT NULL,
        customerId TEXT NOT NULL,
        vendedorId TEXT,
        cobradorId TEXT NOT NULL,
        saleDate TEXT NOT NULL,
        creditPrice REAL NOT NULL,
        cashPrice REAL NOT NULL,
        cashPriceEndDate TEXT NOT NULL,
        collectionDate TEXT NOT NULL,
        totalPaid REAL DEFAULT 0,
        updatedAt TEXT NOT NULL,
        statusId TEXT NOT NULL,
        isActive INTEGER DEFAULT 0,
        FOREIGN KEY (customerId) REFERENCES customers(id) ON DELETE CASCADE,
        FOREIGN KEY (cobradorId) REFERENCES users(id),
        FOREIGN KEY (vendedorId) REFERENCES users(id),
        FOREIGN KEY (statusId) REFERENCES statuses(id)
      );
    `

export type TCollectionFrequency = {
  purchaseId: string;
  amount: number;
  frequency: string | number;
  nextVisit: string;
};

export type TCollectorHistory = {
  id: number;
  purchaseId: string;
  cobradorId: string;
  asignadoDesde: string;
  asignadoHasta: string;
};

export type TPurchaseProduct = {
  purchaseId: string;
  productId: string;
  quantity: number;
};

export type TPayment = {
  id: number;
  purchaseId: string;
  date: string;
  amount: number;
  receiptId: string;
  userId: string;
};

export type TPurchaseNote = {
  id: number;
  purchaseId: string;
  content: string;
  createdAt: string;
};

export class PurchaseTables {
  static async createTable(db: SQLiteDatabase) {
    await db.execAsync(TablePurchase);
    await db.execAsync(`CREATE TABLE IF NOT EXISTS purchase_collection_frequency (
      purchaseId TEXT PRIMARY KEY NOT NULL,
      amount TEXT, 
      frequency TEXT, 
      nextVisit TEXT,
      FOREIGN KEY (purchaseId) REFERENCES purchases(id) ON DELETE CASCADE
      )`);

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS purchase_cobrador_historial (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        purchaseId TEXT NOT NULL,
        cobradorId TEXT NOT NULL,
        asignadoDesde TEXT NOT NULL,
        asignadoHasta TEXT,
        FOREIGN KEY (purchaseId) REFERENCES purchases(id) ON DELETE CASCADE,
        FOREIGN KEY (cobradorId) REFERENCES users(id)
      );
    `);

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS purchase_products (
        purchaseId TEXT NOT NULL,
        productId TEXT NOT NULL,
        quantity INTEGER NOT NULL DEFAULT 1,
        PRIMARY KEY (purchaseId, productId),
        FOREIGN KEY (purchaseId) REFERENCES purchases(id) ON DELETE CASCADE,
        FOREIGN KEY (productId) REFERENCES products(id)
      );
    `);

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS purchase_payments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        purchaseId TEXT NOT NULL,
        date TEXT NOT NULL,
        amount REAL NOT NULL,
        receiptId TEXT,
        userId TEXT NOT NULL,
        FOREIGN KEY (purchaseId) REFERENCES purchases(id) ON DELETE CASCADE,
        FOREIGN KEY (userId) REFERENCES users(id)
      );
    `);

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS purchase_notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        purchaseId TEXT NOT NULL,
        content TEXT NOT NULL,
        createdAt TEXT NOT NULL,
        FOREIGN KEY (purchaseId) REFERENCES purchases(id) ON DELETE CASCADE
      );
    `);

    // Trigger para actualizar totalPaid automáticamente
    await db.execAsync(`
      CREATE TRIGGER IF NOT EXISTS update_purchase_total_paid
      AFTER INSERT ON purchase_payments
      FOR EACH ROW
      BEGIN
        UPDATE purchases 
        SET totalPaid = (
          SELECT COALESCE(SUM(amount), 0) 
          FROM purchase_payments 
          WHERE purchaseId = NEW.purchaseId
        )
        WHERE id = NEW.purchaseId;
      END;
    `);
  }
}
