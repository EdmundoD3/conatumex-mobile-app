import * as SQLite from "expo-sqlite";
import SingleValueTableBase from "./base/singleValueTableBase";
import { createInsert, createUpdate, whereParams } from "./helpers/paramsPush";

// https://docs.expo.dev/versions/latest/sdk/sqlite/
const db = SQLite.openDatabaseAsync("conatumex");


class ProductoRepository extends SingleValueTableBase {
  constructor({ id, producto, contado, credito }) {
    super("producto", { id });
    this.producto = producto;
    this.contado = contado;
    this.credito = credito;
  }

  async save() {
    const columns = ["id", "producto", "contado", "credito"];
    const values = [this.id, this.producto, this.contado, this.credito];
    return await super.save(columns, values);
  }

  async getOrSave() {
    const columns = ["id", "producto", "contado", "credito"];
    const values = [this.id, this.producto, this.contado, this.credito];
    return await super.getOrSave(columns, values);
  }

  static async saveAll(productos = []) {
    const columns = ["id", "producto", "contado", "credito"];
    return await SingleValueTableBase.saveAll("producto", productos, columns);
  }

  static async get({ id, producto, contado, credito }, conditional = "and") {
    const { params, whereParams } = this.createWhereParams({
      id, producto, contado, credito
    }, conditional);
    return await (await db).getAllAsync(whereParams, params);
  }

  static async updateById(id, { producto, contado, credito }) {
    const { query, queryParams } = this.createUpdate({ producto, contado, credito }, "id = ?");
    queryParams.push(id);
    return await (await db).runAsync(query, queryParams);
  }

  static async deleteById(id) {
    const sql = "DELETE FROM producto WHERE id = ?";
    const queryParams = [id];
    return await (await db).runAsync(sql, queryParams);
  }

  static createWhereParams({ id, producto, contado, credito }, conditional = "and") {
    const preParams = [
      new TableColumn("id", id, conditional),
      new TableColumn("producto", producto, conditional),
      new TableColumn("contado", contado, conditional),
      new TableColumn("credito", credito, conditional)
    ];
    return whereParams(preParams);
  }

  static createInsert({ id, producto, contado, credito }) {
    const columns = [
      new TableColumn("id", id),
      new TableColumn("nombre", producto),
      new TableColumn("contado", contado),
      new TableColumn("credito", credito)
    ];
    return createInsert(columns, "producto");
  }

  static createUpdate({ producto, contado, credito }, condition = "id = ?") {
    const columns = [
      new TableColumn("producto", producto),
      new TableColumn("contado", contado),
      new TableColumn("credito", credito)
    ];
    return createUpdate(columns, "producto", condition);
  }
}

export { ProductoRepository }