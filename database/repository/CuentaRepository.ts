import db from "@database/sqlite";
import { Cuenta } from "@database/repository/base/Entity";
import { CuentaRepository } from "@database/repository/base/InterfacesRepository";

export class SQLCuentaRepository implements CuentaRepository {
  async getAll(limit = 10, offset = 0): Promise<Cuenta[]> {
    const cuentas = await (await db).getAllAsync<Cuenta[]>(
      "SELECT * FROM cuenta OFFSET ? LIMIT ?",
      [offset, limit]
    );
    return cuentas.map(
      (cuenta: any) =>
        new Cuenta(
          cuenta.id,
          cuenta.vendedor_id,
          cuenta.cobrador_id,
          cuenta.cliente_id,
          cuenta.credito,
          cuenta.contado,
          cuenta.abono,
          new Date(cuenta.date),
          new Date(cuenta.contado_date),
          new Date(cuenta.next_collection_date),
          cuenta.is_change,
          cuenta.no_cuenta,
          cuenta.is_active
        )
    );
  }

  async getById(id: string): Promise<Cuenta | null> {
    const cuenta = await (await db).getFirstAsync<Cuenta>(
      "SELECT * FROM cuenta WHERE id = ?",
      [id]
    );
    return cuenta
      ? new Cuenta(
          cuenta.id,
          cuenta.vendedor_id,
          cuenta.cobrador_id,
          cuenta.cliente_id,
          cuenta.credito,
          cuenta.contado,
          cuenta.abono,
          new Date(cuenta.date),
          new Date(cuenta.contado_date),
          new Date(cuenta.next_collection_date),
          cuenta.is_change,
          cuenta.no_cuenta,
          cuenta.is_active
        )
      : null;
  }

  async create(cuenta: Cuenta): Promise<void> {
    await (await db).runAsync(
      "INSERT INTO cuenta (id, vendedor_id, cobrador_id, cliente_id, credito, contado, abono, date, contado_date, next_collection_date, is_change, no_cuenta, is_active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        cuenta.id,
        cuenta.vendedor_id,
        cuenta.cobrador_id,
        cuenta.cliente_id,
        cuenta.credito,
        cuenta.contado,
        cuenta.abono,
        cuenta.date.toISOString(),
        cuenta.contado_date.toISOString(),
        cuenta.next_collection_date.toISOString(),
        cuenta.is_change,
        cuenta.no_cuenta,
        cuenta.is_active,
      ]
    );
  }

  async update(cuenta: Cuenta): Promise<void> {
    await (await db).runAsync(
      "UPDATE cuenta SET vendedor_id = ?, cobrador_id = ?, cliente_id = ?, credito = ?, contado = ?, abono = ?, date = ?, contado_date = ?, next_collection_date = ?, is_change = ?, no_cuenta = ?, is_active = ? WHERE id = ?",
      [
        cuenta.vendedor_id,
        cuenta.cobrador_id,
        cuenta.cliente_id,
        cuenta.credito,
        cuenta.contado,
        cuenta.abono,
        cuenta.date.toISOString(),
        cuenta.contado_date.toISOString(),
        cuenta.next_collection_date.toISOString(),
        cuenta.is_change,
        cuenta.no_cuenta,
        cuenta.is_active,
        cuenta.id,
      ]
    );
  }

  async delete(id: string): Promise<void> {
    await (await db).runAsync("DELETE FROM cuenta WHERE id = ?", [id]);
  }

  async getByCliente(cliente_id: string): Promise<Cuenta[]> {
    const cuentas = await (await db).getAllAsync<Cuenta[]>(
      "SELECT * FROM cuenta WHERE cliente_id = ?",
      [cliente_id]
    );
    return cuentas.map(
      (cuenta: any) =>
        new Cuenta(
          cuenta.id,
          cuenta.vendedor_id,
          cuenta.cobrador_id,
          cuenta.cliente_id,
          cuenta.credito,
          cuenta.contado,
          cuenta.abono,
          new Date(cuenta.date),
          new Date(cuenta.contado_date),
          new Date(cuenta.next_collection_date),
          cuenta.is_change,
          cuenta.no_cuenta,
          cuenta.is_active
        )
    );
  }

  async getByVendedor(vendedor_id: string): Promise<Cuenta[]> {
    const cuentas = await (await db).getAllAsync<Cuenta[]>(
      "SELECT * FROM cuenta WHERE vendedor_id = ?",
      [vendedor_id]
    );
    return cuentas.map(
      (cuenta: any) =>
        new Cuenta(
          cuenta.id,
          cuenta.vendedor_id,
          cuenta.cobrador_id,
          cuenta.cliente_id,
          cuenta.credito,
          cuenta.contado,
          cuenta.abono,
          new Date(cuenta.date),
          new Date(cuenta.contado_date),
          new Date(cuenta.next_collection_date),
          cuenta.is_change,
          cuenta.no_cuenta,
          cuenta.is_active
        )
    );
  }

  async getByCobrador(cobrador_id: string): Promise<Cuenta[]> {
    const cuentas = await (await db).getAllAsync<Cuenta[]>(
      "SELECT * FROM cuenta WHERE cobrador_id = ?",
      [cobrador_id]
    );
    return cuentas.map(
      (cuenta: any) =>
        new Cuenta(
          cuenta.id,
          cuenta.vendedor_id,
          cuenta.cobrador_id,
          cuenta.cliente_id,
          cuenta.credito,
          cuenta.contado,
          cuenta.abono,
          new Date(cuenta.date),
          new Date(cuenta.contado_date),
          new Date(cuenta.next_collection_date),
          cuenta.is_change,
          cuenta.no_cuenta,
          cuenta.is_active
        )
    );
  }

  async getByDate(date: Date): Promise<Cuenta[]> {
    const cuentas = await (await db).getAllAsync<Cuenta[]>(
      "SELECT * FROM cuenta WHERE date = ?",
      [date.toISOString()]
    );
    return cuentas.map(
      (cuenta: any) =>
        new Cuenta(
          cuenta.id,
          cuenta.vendedor_id,
          cuenta.cobrador_id,
          cuenta.cliente_id,
          cuenta.credito,
          cuenta.contado,
          cuenta.abono,
          new Date(cuenta.date),
          new Date(cuenta.contado_date),
          new Date(cuenta.next_collection_date),
          cuenta.is_change,
          cuenta.no_cuenta,
          cuenta.is_active
        )
    );
  }
}

// import * as SQLite from "expo-sqlite";
// import SingleValueTableBase from "./base/GenericTableManager";
// import { createInsert, createUpdate, whereParams } from "../helpers/queryGenerators";

// // https://docs.expo.dev/versions/latest/sdk/sqlite/
// const db = SQLite.openDatabaseAsync("conatumex");

// class UsersRepository extends SingleValueTableBase {
//   constructor({ id, user }) {
//     super("users", { id });
//     this.user = user;
//   }

//   async save() {
//     return await super.save(["id", "user"], [this.id, this.user]);
//   }

//   async getOrSave() {
//     return await super.getOrSave(
//       ["id", "user"],
//       [this.id, this.user]
//     );
//   }

//   static async saveAll(statuses = []) {
//     return await SingleValueTableBase.saveAll("users", statuses, ["id", "user"]);
//   }
// }

// class CuentaRepository extends SingleValueTableBase {
//   constructor({ id, vendedorId, clienteId, credito, contado, abono, date, contadoDate, nextCollectionDate, ischange, noCuenta, isActive, isChange }) {
//     super("cuenta", { id });
//     this.vendedorId = vendedorId;
//     this.clienteId = clienteId;
//     this.credito = credito;
//     this.contado = contado;
//     this.abono = abono;
//     this.date = date;
//     this.contadoDate = contadoDate;
//     this.nextCollectionDate = nextCollectionDate;
//     this.ischange = ischange;
//     this.noCuenta = noCuenta;
//     this.isActive = isActive;
//     this.isChange = isChange;
//   }

//   async save() {
//     const columns = [
//       "id", "vendedor_id", "cliente_id", "credito", "contado", "abono", "date",
//       "contado_date", "next_collection_date", "ischange", "no_cuenta", "is_active", "is_change"
//     ];
//     const values = [
//       this.id, this.vendedorId, this.clienteId, this.credito, this.contado, this.abono, this.date,
//       this.contadoDate, this.nextCollectionDate, this.ischange, this.noCuenta, this.isActive, this.isChange
//     ];
//     return await super.save(columns, values);
//   }

//   async getOrSave() {
//     const columns = [
//       "id", "vendedor_id", "cliente_id", "credito", "contado", "abono", "date",
//       "contado_date", "next_collection_date", "ischange", "no_cuenta", "is_active", "is_change"
//     ];
//     const values = [
//       this.id, this.vendedorId, this.clienteId, this.credito, this.contado, this.abono, this.date,
//       this.contadoDate, this.nextCollectionDate, this.ischange, this.noCuenta, this.isActive, this.isChange
//     ];
//     return await super.getOrSave(columns, values);
//   }

//   static async saveAll(cuentas = []) {
//     const columns = [
//       "id", "vendedor_id", "cliente_id", "credito", "contado", "abono", "date",
//       "contado_date", "next_collection_date", "ischange", "no_cuenta", "is_active", "is_change"
//     ];
//     return await SingleValueTableBase.saveAll("cuenta", cuentas, columns);
//   }

//   static async get({ id, vendedorId, clienteId, credito, contado, abono, date, contadoDate, nextCollectionDate, ischange, noCuenta, isActive, isChange }, conditional = "and") {
//     const { params, whereParams } = this.createWhereParams({
//       id, vendedorId, clienteId, credito, contado, abono, date, contadoDate, nextCollectionDate, ischange, noCuenta, isActive, isChange
//     }, conditional);
//     return await (await db).getAllAsync(whereParams, params);
//   }

//   static async updateById(id, { vendedorId, clienteId, credito, contado, abono, date, contadoDate, nextCollectionDate, ischange, noCuenta, isActive, isChange }) {
//     const { query, queryParams } = this.createUpdate({
//       vendedorId, clienteId, credito, contado, abono, date, contadoDate, nextCollectionDate, ischange, noCuenta, isActive, isChange
//     }, "id = ?");
//     queryParams.push(id);
//     return await (await db).runAsync(query, queryParams);
//   }

//   static async deleteById(id) {
//     const sql = "DELETE FROM cuenta WHERE id = ?";
//     const queryParams = [id];
//     return await (await db).runAsync(sql, queryParams);
//   }

//   static createWhereParams({ id, vendedorId, clienteId, credito, contado, abono, date, contadoDate, nextCollectionDate, ischange, noCuenta, isActive, isChange }, conditional = "and") {
//     const preParams = [
//       new TableColumn("id", id, conditional),
//       new TableColumn("vendedor_id", vendedorId, conditional),
//       new TableColumn("cliente_id", clienteId, conditional),
//       new TableColumn("credito", credito, conditional),
//       new TableColumn("contado", contado, conditional),
//       new TableColumn("abono", abono, conditional),
//       new TableColumn("date", date, conditional),
//       new TableColumn("contado_date", contadoDate, conditional),
//       new TableColumn("next_collection_date", nextCollectionDate, conditional),
//       new TableColumn("ischange", ischange, conditional),
//       new TableColumn("no_cuenta", noCuenta, conditional),
//       new TableColumn("is_active", isActive, conditional),
//       new TableColumn("is_change", isChange, conditional)
//     ];
//     return whereParams(preParams);
//   }

//   static createInsert({ id, vendedorId, clienteId, credito, contado, abono, date, contadoDate, nextCollectionDate, ischange, noCuenta, isActive, isChange }) {
//     const columns = [
//       new TableColumn("id", id),
//       new TableColumn("vendedor_id", vendedorId),
//       new TableColumn("cliente_id", clienteId),
//       new TableColumn("credito", credito),
//       new TableColumn("contado", contado),
//       new TableColumn("abono", abono),
//       new TableColumn("date", date),
//       new TableColumn("contado_date", contadoDate),
//       new TableColumn("next_collection_date", nextCollectionDate),
//       new TableColumn("ischange", ischange),
//       new TableColumn("no_cuenta", noCuenta),
//       new TableColumn("is_active", isActive),
//       new TableColumn("is_change", isChange)
//     ];
//     return createInsert(columns, "cuenta");
//   }

//   static createUpdate({ vendedorId, clienteId, credito, contado, abono, date, contadoDate, nextCollectionDate, ischange, noCuenta, isActive, isChange }, condition = "id = ?") {
//     const columns = [
//       new TableColumn("vendedor_id", vendedorId),
//       new TableColumn("cliente_id", clienteId),
//       new TableColumn("credito", credito),
//       new TableColumn("contado", contado),
//       new TableColumn("abono", abono),
//       new TableColumn("date", date),
//       new TableColumn("contado_date", contadoDate),
//       new TableColumn("next_collection_date", nextCollectionDate),
//       new TableColumn("ischange", ischange),
//       new TableColumn("no_cuenta", noCuenta),
//       new TableColumn("is_active", isActive),
//       new TableColumn("is_change", isChange)
//     ];
//     return createUpdate(columns, "cuenta", condition);
//   }
// }

// export { CuentaRepository, UsersRepository }