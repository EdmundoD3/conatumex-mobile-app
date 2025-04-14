import { TUser } from "@database/initialization/tables/UserTable";
import { SQLiteDatabase } from "expo-sqlite";
import { BaseRepository } from "./base/BaseRepository";

export class UserRepository extends BaseRepository {
  create(){

  }
  getById(id:string){
    return UserRepository.getById(id,this.db)
  }
  static getById(id: string,db: SQLiteDatabase) {
    return db.getFirstAsync<TUser>(`SELECT * FROM users WHERE id = ?`, [
      id,
    ]);
  }
}