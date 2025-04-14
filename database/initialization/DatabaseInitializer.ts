import { SQLiteDatabase } from 'expo-sqlite';
import { CustomerTable } from '@database/initialization/tables/CustomerTable';
import { PurchaseTables } from '@database/initialization/tables/PurchaseTable';
import { UserTable } from '@database/initialization/tables/UserTable';
import { ProductTable } from '@database/initialization/tables/ProductTable';
import { StatusTable } from '@database/initialization/tables/StatusTable';

export class DatabaseInitializer {
  public static async initialize(db: SQLiteDatabase) {
    try {
      // Primero tablas maestras
      await StatusTable.createTable(db);
      await UserTable.createTable(db);
      await ProductTable.createTable(db);
      
      // Luego tablas con relaciones
      await CustomerTable.createTable(db);
      await PurchaseTables.createTable(db);
      
      // Índices para mejorar rendimiento
      await this.createIndexes(db);
    } catch (error) {
      console.error('Error initializing database:', error);
      throw error;
    }
  }

  private static async createIndexes(db: SQLiteDatabase) {
    await db.execAsync('CREATE INDEX IF NOT EXISTS idx_customer_id ON customers(id)');
    await db.execAsync('CREATE INDEX IF NOT EXISTS idx_purchase_id ON purchases(id)');
    await db.execAsync('CREATE INDEX IF NOT EXISTS idx_purchase_customerId ON purchases(customerId)');
    await db.execAsync('CREATE INDEX IF NOT EXISTS idx_user_id ON users(id)');
  }
}