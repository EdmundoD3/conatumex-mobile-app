import * as SQLite from "expo-sqlite";
import SingleValueTableBase from "./base/singleValueTableBase";
import { createInsert, createUpdate, whereParams } from "./helpers/paramsPush";

// https://docs.expo.dev/versions/latest/sdk/sqlite/
const db = SQLite.openDatabaseAsync("conatumex");

class CompraRepository extends SingleValueTableBase {
  constructor({ id, productoId, cuentaId, cantidad }) {
    super("compra", { id });
    this.productoId = productoId;
    this.cuentaId = cuentaId;
    this.cantidad = cantidad;
  }

  async save() {
    const columns = ["id", "producto_id", "cuenta_id", "cantidad"];
    const values = [this.id, this.productoId, this.cuentaId, this.cantidad];
    return await super.save(columns, values);
  }

  async getOrSave() {
    const columns = ["id", "producto_id", "cuenta_id", "cantidad"];
    const values = [this.id, this.productoId, this.cuentaId, this.cantidad];
    return await super.getOrSave(columns, values);
  }

  static async saveAll(compras = []) {
    const columns = ["id", "producto_id", "cuenta_id", "cantidad"];
    return await SingleValueTableBase.saveAll("compra", compras, columns);
  }
  static async getById(id){
    const source = `Select * from compra where id = ?`
    return await (await db).getFirstAsync(source, [id]);
  }
  static async get({ id, productoId, cuentaId, cantidad }, conditional = "and") {
    const { params, whereParams } = this.createWhereParams({
      id, productoId, cuentaId, cantidad
    }, conditional);
    const source = "Select * from compra where "+ whereParams
    return await (await db).getAllAsync(source, params);
  }

  static async updateById(id, { productoId, cuentaId, cantidad }) {
    const { query, queryParams } = this.createUpdate({ productoId, cuentaId, cantidad }, "id = ?");
    queryParams.push(id);
    return await (await db).runAsync(query, queryParams);
  }

  static async deleteById(id) {
    const sql = "DELETE FROM compra WHERE id = ?";
    const queryParams = [id];
    return await (await db).runAsync(sql, queryParams);
  }

  static createWhereParams({ id, productoId, cuentaId, cantidad }, conditional = "and") {
    const preParams = [
      new TableColumn("id", id, conditional),
      new TableColumn("producto_id", productoId, conditional),
      new TableColumn("cuenta_id", cuentaId, conditional),
      new TableColumn("cantidad", cantidad, conditional)
    ];
    return whereParams(preParams);
  }

  static createInsert({ id, productoId, cuentaId, cantidad }) {
    const columns = [
      new TableColumn("id", id),
      new TableColumn("producto_id", productoId),
      new TableColumn("cuenta_id", cuentaId),
      new TableColumn("cantidad", cantidad)
    ];
    return createInsert(columns, "compra");
  }

  static createUpdate({ productoId, cuentaId, cantidad }, condition = "id = ?") {
    const columns = [
      new TableColumn("producto_id", productoId),
      new TableColumn("cuenta_id", cuentaId),
      new TableColumn("cantidad", cantidad)
    ];
    return createUpdate(columns, "compra", condition);
  }
}

export { CompraRepository }