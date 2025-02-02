import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabaseAsync("conatumex");


class SingleValueTableBase {
  constructor(tableName, { id }) {
    this.tableName = tableName;
    this.id = id;
  }

  async get(column, value) {
    const sql = `
        SELECT * FROM ${this.tableName} WHERE ${column} = ?;
      `;
    const queryParams = [value];
    try {
      return await (await db).getFirstAsync(sql, queryParams);
    } catch (error) {
      throw error;
    }
  }

  async save(columns = [], values = []) {
    const placeholders = columns.map(() => "?").join(", ");
    const query = `
        INSERT INTO ${this.tableName} (
          ${columns.join(", ")}
        ) VALUES (${placeholders})
      `;
    try {
      return await (await db).runAsync(query, values);
    } catch (error) {
      throw error;
    }
  }

  async getOrSave(columns, values) {
    const item = await this.get(columns[1], values[1]);
    if (item) return item;
    await this.save(columns, values);
    return await this.get(columns[1], values[1]);
  }

  static async saveAll(tableName, items = [], columns = []) {
    try {
      return await Promise.all(
        items.map(async (item) => {
          const values = columns.map((col) => item[col]);
          return await new this(tableName, item).save(columns, values);
        })
      );
    } catch (error) {
      throw error;
    }
  }
}

export default SingleValueTableBase;
