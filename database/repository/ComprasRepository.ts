import db from "@database/sqlite";
import { Compra } from "@database/repository/base/Entity";
import { CompraRepository } from "@database/repository/base/InterfacesRepository";

export class SQLCompraRepository implements CompraRepository {
  async getAll(limit = 10, offset = 0): Promise<Compra[]> {
    const compras = await (await db).getAllAsync<Compra[]>(
      "SELECT * FROM compra OFFSET ? LIMIT ?",
      [offset, limit]
    );
    return compras.map(
      (compra: any) =>
        new Compra(
          compra.id,
          compra.producto_id,
          compra.cuenta_id,
          compra.cantidad
        )
    );
  }

  async getById(id: number): Promise<Compra | null> {
    const compra = await (await db).getFirstAsync<Compra>(
      "SELECT * FROM compra WHERE id = ?",
      [id]
    );
    return compra
      ? new Compra(
          compra.id,
          compra.producto_id,
          compra.cuenta_id,
          compra.cantidad
        )
      : null;
  }

  async create(compra: Compra): Promise<void> {
    await (await db).runAsync(
      "INSERT INTO compra (producto_id, cuenta_id, cantidad) VALUES (?, ?, ?)",
      [compra.producto_id, compra.cuenta_id, compra.cantidad]
    );
  }

  async update(compra: Compra): Promise<void> {
    await (await db).runAsync(
      "UPDATE compra SET producto_id = ?, cuenta_id = ?, cantidad = ? WHERE id = ?",
      [compra.producto_id, compra.cuenta_id, compra.cantidad, compra.id]
    );
  }

  async delete(id: number): Promise<void> {
    await (await db).runAsync("DELETE FROM compra WHERE id = ?", [id]);
  }

  async getByCuenta(cuenta_id: string): Promise<Compra[]> {
    const compras = await (await db).getAllAsync<Compra[]>(
      "SELECT * FROM compra WHERE cuenta_id = ?",
      [cuenta_id]
    );
    return compras.map(
      (compra: any) =>
        new Compra(
          compra.id,
          compra.producto_id,
          compra.cuenta_id,
          compra.cantidad
        )
    );
  }
}