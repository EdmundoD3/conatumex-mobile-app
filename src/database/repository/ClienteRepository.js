import * as SQLite from 'expo-sqlite';
import { IOneDataSQLRepository, IRepository } from './Interface';
import verifyIdsData from '../helper/verifyIdsData';
import { MissingDataError } from '../../error/typeErrors';

// https://docs.expo.dev/versions/latest/sdk/sqlite/
const db = SQLite.openDatabaseAsync('conatumex');

class Vendedor extends IOneDataSQLRepository {
  constructor(vendedor) {
    super("vendedor", "vendedor", vendedor)
  }
}

class Status extends IOneDataSQLRepository {
  constructor(status) {
    super("status", "status", status)
  }
}

class ClienteRepository extends IRepository {
  static async get({ name, lastname, email, phone, date, comments, status_id, vendedora_id }) {

  }

  static async getAll({ limit = 10, offset = 0 }) {
    throw new Error("implementar getAll")
  }

  static async getByNameId(cliente_id) {
    throw new Error("implementar getByClienteId")
  }

  static async create({ name, email, phone, date = new Date(), comments, status, vendedor }) {
    const sql = `
      INSERT INTO cliente (
        name, email, phone, date, comments, status_id, vendedor_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?);
    `;
    try {
      if (!name) throw new MissingDataError("name no incluido")
      const { id: status_id } = await (new Status(status)).saveAndGet()
      if (!status_id) throw new MissingDataError("status no incluido")
      const { id: vendedor_id } = await (new Vendedor(vendedor)).saveAndGet()
      if (!vendedor_id) throw new MissingDataError("vendedor no incluido")
      const queryParams = [
        name, email, phone, date, comments, status_id, vendedor_id
      ]
      return (await (await db).runAsync(sql, queryParams)).lastInsertRowId
    } catch (error) {
      throw error
    }
  }
  static async ArrayCreate(clientes = [{}]) {
    const statusIds = uniqueData(clientes, "status")
    const vendedorIds = uniqueData(clientes, "vendedor")
    console.log({ statusIds, vendedorIds });

  }
  static async updateById({ id, }) {
    throw new Error("implementar updateById")
  }

  static async deleteById(id) {
    throw new Error("implementar deleteById")
  }
}

const uniqueData = (dataArray, nameParam = "id") => {
  const res = []
  dataArray.reduce((acc, current) => {
    const x = acc.find(item => item[nameParam] === current[nameParam]);
    if (!x) {
      acc.push(current);
      res.push(current[nameParam])
    }
    return acc;
  }, []);
  return res
}
export { Vendedor, Status, ClienteRepository }