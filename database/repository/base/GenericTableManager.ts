import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabaseAsync("conatumex");

/**
 * Clase para manejar operaciones genéricas en una tabla de base de datos.
 * Permite realizar operaciones comunes como obtener, guardar y buscar datos en una tabla específica.
 */
class GenericTableManager {
  /**
   * Crea una instancia de GenericTableManager para una tabla específica.
   * @param {string} tableName - El nombre de la tabla en la base de datos.
   * @param {Object} idObject - Un objeto que contiene el identificador de la fila.
   * @param {string} idObject.id - El valor del identificador para esta instancia.
   */
  tableName:string
  id:number
  constructor(tableName, { id }) {
    this.tableName = tableName;
    this.id = id;
  }

  /**
   * Obtiene una fila de la tabla basándose en una columna y valor específicos.
   * @param {string} column - El nombre de la columna en la tabla.
   * @param {string|number} value - El valor para buscar en la columna.
   * @returns {Promise<Object>} - Una promesa que resuelve el objeto de la fila encontrada o undefined si no se encuentra.
   * @throws {Error} - Si ocurre un error al realizar la consulta.
   */
  async get(column:string, value:string|number) {
    const sql = `
        SELECT * FROM ${this.tableName} WHERE ${column} = ?;
      `;
    const queryParams = [value];
    try {
      return await (await db).getFirstAsync(sql, queryParams);
    } catch (error) {
      console.error(`Error getting data from ${this.tableName}: ${error.message}`);
      throw error;
    }
  }

  /**
   * Guarda una fila en la tabla.
   * @param {string[]} columns - Los nombres de las columnas en la tabla.
   * @param {Array<string|number>} values - Los valores correspondientes para cada columna.
   * @returns {Promise<void>} - Una promesa que se resuelve cuando la operación de inserción es exitosa.
   * @throws {Error} - Si ocurre un error al realizar la inserción o si las longitudes de columns y values no coinciden.
   */
  async save(columns:string[] = [], values:(number|string)[] = []) {
    if (columns.length !== values.length) {
      throw new Error("Columns and values length mismatch");
    }

    const placeholders = columns.map(() => "?").join(", ");
    const query = `
        INSERT INTO ${this.tableName} (
          ${columns.join(", ")}
        ) VALUES (${placeholders})
      `;
    try {
      return await (await db).runAsync(query, values);
    } catch (error) {
      console.error(`Error saving data to ${this.tableName}: ${error.message}`);
      throw error;
    }
  }

  /**
   * Obtiene una fila de la tabla o la guarda si no existe.
   * @param {string[]} columns - Los nombres de las columnas en la tabla.
   * @param {Array<string|number>} values - Los valores correspondientes para cada columna.
   * @returns {Promise<Object>} - Una promesa que resuelve el objeto de la fila encontrada o guardada.
   * @throws {Error} - Si ocurre un error al realizar la operación de obtención o inserción.
   */
  async getOrSave(columns:string[], values:(number|string)[]) {
    const item = await this.get(columns[1], values[1]);
    if (item) return item;
    await this.save(columns, values);
    return await this.get(columns[1], values[1]);
  }

  /**
   * Guarda todos los elementos en una tabla. Crea una instancia de GenericTableManager para cada elemento.
   * @param {string} tableName - El nombre de la tabla en la base de datos.
   * @param {Object[]} items - Los objetos que representan las filas a guardar en la tabla.
   * @param {string[]} columns - Los nombres de las columnas en la tabla.
   * @returns {Promise<void[]>} - Una promesa que se resuelve cuando todas las operaciones de inserción son exitosas.
   * @throws {Error} - Si ocurre un error al realizar las inserciones.
   */
  static async saveAll(tableName, items = [], columns = []) {
    try {
      return await Promise.all(
        items.map(async (item) => {
          const values = columns.map((col) => item[col]);
          return await new this(tableName, item).save(columns, values);
        })
      );
    } catch (error) {
      console.error(`Error saving all items to ${tableName}: ${error.message}`);
      throw error;
    }
  }
}

export default GenericTableManager;
