import * as SQLite from "expo-sqlite";
import SingleValueTableBase from "./base/singleValueTableBase";
import { createInsert, createUpdate, whereParams } from "./helpers/paramsPush";

// https://docs.expo.dev/versions/latest/sdk/sqlite/
const db = SQLite.openDatabaseAsync("conatumex");

class PagosRepository extends SingleValueTableBase {
  constructor({ id, cuentaId, pago, date }) {
    super("pagos", { id });
    this.cuentaId = cuentaId;
    this.pago = pago;
    this.date = date;
  }

  async save() {
    const columns = ["id", "cuenta_id", "pago", "date"];
    const values = [this.id, this.cuentaId, this.pago, this.date];
    return await super.save(columns, values);
  }

  async getOrSave() {
    const columns = ["id", "cuenta_id", "pago", "date"];
    const values = [this.id, this.cuentaId, this.pago, this.date];
    return await super.getOrSave(columns, values);
  }

  static async saveAll(pagos = []) {
    const columns = ["id", "cuenta_id", "pago", "date"];
    return await SingleValueTableBase.saveAll("pagos", pagos, columns);
  }

  static async get({ id, cuentaId, pago, date }, conditional = "and") {
    const { params, whereParams } = this.createWhereParams({ id, cuentaId, pago, date }, conditional);
    return await (await db).getAllAsync(whereParams, params);
  }

  static async updateById(id, { cuentaId, pago, date }) {
    const { query, queryParams } = this.createUpdate({ cuentaId, pago, date }, "id == ?");
    queryParams.push(id)
    return await (await db).runAsync(query, queryParams);
  }

  static async deleteById(id) {
    const sql = "DELETE FROM pagos WHERE id = ?";
    const queryParams = [id];
    return await (await db).runAsync(sql, queryParams);
  }

  static createWhereParams({ id, cuentaId, pago, date }, conditional = "and") {
    const preParams = [
      new TableColumn("id", id, conditional),
      new TableColumn("cuenta_id", cuentaId, conditional),
      new TableColumn("pago", pago, conditional),
      new TableColumn("date", date, conditional)
    ];
    return whereParams(preParams);
  }

  static createInsert({ id, cuentaId, pago, date }) {
    const columns = [
      new TableColumn("id", id, conditional),
      new TableColumn("cuenta_id", cuentaId, conditional),
      new TableColumn("pago", pago, conditional),
      new TableColumn("date", date, conditional)
    ];
    return createInsert(columns, "pagos");
  }

  static createUpdate({ id, cuentaId, pago, date }, condition = "id = id") {
    const columns = [
      new TableColumn("id", id),
      new TableColumn("cuenta_id", cuentaId),
      new TableColumn("pago", pago),
      new TableColumn("date", date)
    ];
    return this.createUpdate(columns, "pagos", condition);
  }
}

export { PagosRepository }