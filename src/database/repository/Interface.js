import * as SQLite from 'expo-sqlite';

// https://docs.expo.dev/versions/latest/sdk/sqlite/
const db = SQLite.openDatabaseAsync('conatumex');

class IOneDataSQLRepository {
  constructor(tableName, columnName, value) {
    this.tableName = tableName
    this.columnName = columnName
    this.value = value
  }
  async getAll({ limit = 10, offset = 0 }) {
    const sql = `SELECT * FROM ${this.tableName} limit ? offset ?`
    const res = (await db).runAsync(sql, [limit, offset])
    return res
  }
  async get() {
    if (this.value == null) return null
    const sql = `SELECT * FROM ${this.tableName} where ${this.columnName} = ?`
    const res = (await db).getFirstAsync(sql, [this.value])
    return res
  }
  async save() {
    if (!this.value) throw new Error("falta el valor")
    const sql = `INSERT INTO ${this.tableName} (${this.columnName}) VALUES (?);`
    return (await db).runAsync(sql, [this.value])
  }
  async updateById({ id, value }) {
    const sql = `UPDATE ${this.tableName} SET ${this.columnName} = ? WHERE id = ?`
    return (await db).runAsync(sql, [value, id]);
  }
  async deleteById(id) {
    const sql = `DELETE FROM ${this.tableName} WHERE id = ?`
    const tx = await db;
    return await tx.runAsync(sql, [id]);
  }
  async saveAndGet() {
    if(!this.value) return {id:null,[this.columnName]:null}
    const exist = await this.get()
    if(exist) return exist
    await this.save()
    return await this.get()
  }
}

class IRepository {
  constructor() {
  }
  static async get({ }) {
    throw new Error("implementar get")
  }

  static async getAll({ limit = 10, offset = 0 }) {
    throw new Error("implementar getAll")
  }

  static async create({}) {
    throw new Error("implementar create")
  }

  static async updateById({id, }) {
    throw new Error("implementar updateById")
  }

  static async deleteById(id) {
    throw new Error("implementar deleteById")
  }
}

export {IOneDataSQLRepository, IRepository}