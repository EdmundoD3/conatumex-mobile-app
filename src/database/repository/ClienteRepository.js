import * as SQLite from "expo-sqlite";
import SingleValueTableBase from "./base/singleValueTableBase";
import { createInsert, createUpdate, TableColumn, whereParams } from "./helpers/paramsPush";

// https://docs.expo.dev/versions/latest/sdk/sqlite/
const db = SQLite.openDatabaseAsync("conatumex");


class ClienteRepository extends SingleValueTableBase {
  constructor({ id, name, email, phone, date, comments, statusId }) {
    super("cliente", { id });
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.date = date;
    this.comments = comments;
    this.statusId = statusId;
  }

  async save() {
    const columns = ["id", "name", "email", "phone", "date", "comments", "status_id"];
    const values = [this.id, this.name, this.email, this.phone, this.date, this.comments, this.statusId];
    return await super.save(columns, values);
  }

  async getOrSave() {
    const columns = ["id", "name", "email", "phone", "date", "comments", "status_id"];
    const values = [this.id, this.name, this.email, this.phone, this.date, this.comments, this.statusId];
    return await super.getOrSave(columns, values);
  }

  static async saveAll(clientes = []) {
    const columns = ["id", "name", "email", "phone", "date", "comments", "status_id"];
    return await SingleValueTableBase.saveAll("cliente", clientes, columns);
  }
  static async getById(id){
    const source = `Select * from cliente where id = ?`
    return await (await db).getFirstAsync(source, [id]);
  }
  static async get({ id, name, email, phone, date, comments, statusId }, conditional="and") {
    const { params, whereParams } = this.createWhereParams({
      id, name, email, phone, date, comments, statusId
    }, conditional);
    const source = "Select * from cliente where "+ whereParams
    return await (await db).getAllAsync(source, params);
  }

  static async getByText({ text, offset = 0, limit = 10 }) {
    const sql = `
      SELECT cliente.id, cliente.name, cliente.phone, address.street, state.state, colonia.colonia
      FROM cliente
      JOIN address ON cliente.id = address.cliente_id
      JOIN state ON address.state_id = state.id
      JOIN colonia ON address.colonia_id = colonia.id
      WHERE cliente.name LIKE ? OR cliente.phone LIKE ? OR address.street LIKE ?
         OR state.state LIKE ? OR colonia.colonia LIKE ?
      OFFSET ? LIMIT ?;
    `;
    const queryParams = [`%${text}%`, `%${text}%`, `%${text}%`, `%${text}%`, `%${text}%`, offset, limit];
    return await (await db).runAsync(sql, queryParams);
  }

  static async getForCobranzaDate() {
    const sql = `
      SELECT cuenta.id, cliente.name, cuenta.credito, cuenta.abono, cuenta.date, cuenta.contado_date, cuenta.next_collection_date
      FROM cuenta
      JOIN cliente ON cuenta.cliente_id = cliente.id
      WHERE cuenta.is_active = 1
      ORDER BY cuenta.date ASC;
    `;
    return await (await db).runAsync(sql);
  }

  static async updateById(id, { name, email, phone, date, comments, statusId }) {
    const { query, queryParams } = this.createUpdate({ name, email, phone, date, comments, statusId }, "id = ?");
    queryParams.push(id)
    return await (await db).runAsync(query, queryParams);
  }

  static async deleteById(id) {
    const sql = "DELETE FROM cliente WHERE id = ?";
    const queryParams = [id];
    return await (await db).runAsync(sql, queryParams);
  }

  static createWhereParams({ id, name, email, phone, date, comments, statusId }, conditional = "and") {
    const preParams = [
      new TableColumn("id", id, conditional),
      new TableColumn("name", name, conditional),
      new TableColumn("email", email, conditional),
      new TableColumn("phone", phone, conditional),
      new TableColumn("date", date, conditional),
      new TableColumn("comments", comments, conditional),
      new TableColumn("status_id", statusId, conditional)
    ];

    return whereParams(preParams);
  }

  static createInsert({ id, name, email, phone, date, comments, statusId }) {
    const columns = [
      new TableColumn("id", id),
      new TableColumn("name", name),
      new TableColumn("email", email),
      new TableColumn("phone", phone),
      new TableColumn("date", date),
      new TableColumn("comments", comments),
      new TableColumn("status_id", statusId)
    ];
    return createInsert(columns, "cliente");
  }

  static createUpdate({ id, name, email, phone, date, comments, statusId }, condition = "id = ?") {
    const columns = [
      new TableColumn("id", id),
      new TableColumn("name", name),
      new TableColumn("email", email),
      new TableColumn("phone", phone),
      new TableColumn("date", date),
      new TableColumn("comments", comments),
      new TableColumn("status_id", statusId)
    ];
    return createUpdate(columns, "cliente", condition);
  }
}


export { ClienteRepository };
