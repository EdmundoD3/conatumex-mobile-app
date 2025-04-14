import { getDatabaseConnection } from "@database/sqlite";
import { SQLiteDatabase } from "expo-sqlite";

// Repositorio para State
export class BaseRepository {
  _db: SQLiteDatabase;
  async init() {
    const isStartDb = this.db instanceof SQLiteDatabase;
    if (isStartDb) return;
    this.db = await getDatabaseConnection();
  }
   get db(){
    if(!this._db) this.init()
    return this._db
  }
  private set db(db:SQLiteDatabase) {
    this._db = db
  }
}