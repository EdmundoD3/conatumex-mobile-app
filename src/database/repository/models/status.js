import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseAsync("conatumex");

class StatusTable {
    constructor({status,statusId}){
      this.status = status
      this.statusId = statusId
    }
    async get(){
      const sql = `
        SELECT * status WHERE status = ?;
      `;
      const queryParams = [this.status];
      return await (await db).getFirstAsync(sql, queryParams);
    }
    async save(){
      const query = `
      INSERT INTO status (
        id,satus
      ) VALUES (?, ?)
    `;
      const values = [this.statusId,this.status];
      return await (await db).runAsync(query, values)
    }
    async getOrSave(){
      const status = await this.get()
      if(status) return status
      this.save()
      return await this.get()
    }
  }

export {StatusTable }