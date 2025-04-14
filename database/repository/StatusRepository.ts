import { TStatus } from "@database/initialization/tables/StatusTable";
import { SQLiteDatabase } from "expo-sqlite";
import { BaseRepository } from "./base/BaseRepository";

export class StatusRepository extends BaseRepository {

  create(){

  }
  getById(id:string){
    return StatusRepository.getStatusById(id,this.db)
  }
  static getStatusById(statusId: string,db: SQLiteDatabase) {
    return db.getFirstAsync<TStatus>(`SELECT * FROM statuses WHERE id = ?`, [
      statusId,
    ]);
  }
}