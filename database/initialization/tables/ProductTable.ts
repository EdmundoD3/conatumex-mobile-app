import { SQLiteDatabase } from "expo-sqlite";

// ProductTable.ts
export class ProductTable {
  static async createTable(db: SQLiteDatabase) {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS products (
        id TEXT PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        price TEXT NOT NULL
      );
    `);
  }
}

