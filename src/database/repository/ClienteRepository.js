import * as SQLite from "expo-sqlite";
import { IOneDataSQLRepository, IRepository } from "./Interface";
import verifyIdsData from "../helper/verifyIdsData";
import { MissingDataError } from "../../error/typeErrors";

// https://docs.expo.dev/versions/latest/sdk/sqlite/
const db = SQLite.openDatabaseAsync("conatumex");

class Vendedor extends IOneDataSQLRepository {
  constructor(vendedor) {
    super("vendedor", "vendedor", vendedor);
  }
}

class Status extends IOneDataSQLRepository {
  constructor(status) {
    super("status", "status", status);
  }
}

class ClienteRepository extends IRepository {
  static async getByName({ name }) {
    const sql = `
      SELECT * cliente WHERE name = ?;
    `;
    const queryParams = [name];
    return await (await db).runAsync(sql, queryParams);
  }
  static async get({ text, offset = 0 }) {
    const sql = `SELECT cliente.id, cliente.name, cliente.phone, address.street, state.state, colonia.colonia
FROM cliente
JOIN address ON cliente.id = address.cliente_id
JOIN state ON address.state_id = state.id
JOIN colonia ON address.colonia_id = colonia.id
WHERE cliente.name LIKE '%?%'
   OR cliente.phone LIKE '%?%'
   OR address.street LIKE '%?%'
   OR state.state LIKE '%?%'
   OR colonia.colonia LIKE '%?%';`;
    const queryParams = [text, text, text, text, text, offset];
    return await (await db).runAsync(sql, queryParams);
  }
  static async getForCobranzaDate() {
    const sql = `SELECT cuenta.id, cliente.name, cuenta.credito, cuenta.abono, cuenta.date, cuenta.contado_date, cuenta.next_collection_date
FROM cuenta
JOIN cliente ON cuenta.cliente_id = cliente.id
WHERE cuenta.is_active = 1
ORDER BY cuenta.date ASC;`;
    return await (await db).runAsync(sql);
  }
  static async getAll({ limit = 10, offset = 0 }) {
    throw new Error("implementar getAll");
  }

  static async getByNameId(cliente_id) {
    throw new Error("implementar getByClienteId");
  }
  static async saveNewData(clients = []) {
    clients.map(({ name }) => [`('${name}')`, `()`]);
    throw new Error("Implementar saveNewClient en ClientRepository");
  }
  static async create({
    name,
    email,
    phone,
    date = new Date(),
    comments,
    status,
    vendedor,
  }) {
    const sql = `
      INSERT INTO cliente (
        name, email, phone, date, comments, status_id, vendedor_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?);
    `;
    try {
      if (!name) throw new MissingDataError("name no incluido");
      const { id: status_id } = await new Status(status).saveAndGet();
      if (!status_id) throw new MissingDataError("status no incluido");
      const { id: vendedor_id } = await new Vendedor(vendedor).saveAndGet();
      if (!vendedor_id) throw new MissingDataError("vendedor no incluido");
      const queryParams = [
        name,
        email,
        phone,
        date,
        comments,
        status_id,
        vendedor_id,
      ];
      return (await (await db).runAsync(sql, queryParams)).lastInsertRowId;
    } catch (error) {
      throw error;
    }
  }
  static async ArrayCreate(clientes = [{}]) {
    const statusIds = uniqueData(clientes, "status");
    const vendedorIds = uniqueData(clientes, "vendedor");
    console.log({ statusIds, vendedorIds });
  }
  static async updateById({ id }) {
    throw new Error("implementar updateById");
  }

  static async deleteById(id) {
    throw new Error("implementar deleteById");
  }
}

const uniqueData = (dataArray, nameParam = "id") => {
  const res = [];
  dataArray.reduce((acc, current) => {
    const x = acc.find((item) => item[nameParam] === current[nameParam]);
    if (!x) {
      acc.push(current);
      res.push(current[nameParam]);
    }
    return acc;
  }, []);
  return res;
};
export { Vendedor, Status, ClienteRepository };
