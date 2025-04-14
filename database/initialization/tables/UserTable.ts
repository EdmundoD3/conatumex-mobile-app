// UserTable.ts
import { SQLiteDatabase } from 'expo-sqlite';

export type TUser = {
  id:string,
  name:string,
  username:string
}
export class UserTable {
  static async createTable(db: SQLiteDatabase) {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        username TEXT NOT NULL
      );
    `);
  }
}

