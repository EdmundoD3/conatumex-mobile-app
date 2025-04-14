import { SQLiteDatabase } from "expo-sqlite";

export type TStatus = {
  id: number;
  name:string;
};
export class StatusTable {
  static async createTable(db: SQLiteDatabase) {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS statuses (
        id TEXT PRIMARY KEY NOT NULL,
        name TEXT NOT NULL
      );
    `);
  }
}