import { getDatabaseConnection } from "@database/sqlite";
import { SQLiteDatabase } from "expo-sqlite";

export class BaseRepository {
  private _db: SQLiteDatabase | null = null;

  async getDb(): Promise<SQLiteDatabase> {
    if (!this._db) {
      this._db = await getDatabaseConnection();
    }
    return this._db;
  }
}
