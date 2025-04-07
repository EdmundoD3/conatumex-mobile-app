import db from "@database/sqlite";
import { Pago } from "@database/repository/base/Entity";
import { PagoRepository } from "@database/repository/base/InterfacesRepository";

export class SQLPagoRepository implements PagoRepository {
  
  async getAll(limit = 10, offset = 0): Promise<Pago[]> {
    const pagos = await (await db).getAllAsync<Pago[]>(
      "SELECT * FROM pagos OFFSET ? LIMIT ?",
      [offset, limit]
    );
    return pagos.map(
      (pago: any) =>
        new Pago(
          pago.id,
          pago.cuenta_id,
          pago.pago,
          new Date(pago.date)
        )
    );
  }

  async getById(id: number): Promise<Pago | null> {
    const pago = await (await db).getFirstAsync<Pago>(
      "SELECT * FROM pagos WHERE id = ?",
      [id]
    );
    return pago
      ? new Pago(
          pago.id,
          pago.cuenta_id,
          pago.pago,
          new Date(pago.date)
        )
      : null;
  }

  async create(pago: Pago): Promise<void> {
    await (await db).runAsync(
      "INSERT INTO pagos (cuenta_id, pago, date) VALUES (?, ?, ?)",
      [pago.cuenta_id, pago.pago, pago.date.toISOString()]
    );
  }

  async update(pago: Pago): Promise<void> {
    await (await db).runAsync(
      "UPDATE pagos SET cuenta_id = ?, pago = ?, date = ? WHERE id = ?",
      [pago.cuenta_id, pago.pago, pago.date.toISOString(), pago.id]
    );
  }

  async delete(id: number): Promise<void> {
    await (await db).runAsync("DELETE FROM pagos WHERE id = ?", [id]);
  }

  async getByCuentaId(cuenta_id: string): Promise<Pago[]> {
    const pagos = await (await db).getAllAsync<Pago[]>(
      "SELECT * FROM pagos WHERE cuenta_id = ?",
      [cuenta_id]
    );
    return pagos.map(
      (pago: any) =>
        new Pago(
          pago.id,
          pago.cuenta_id,
          pago.pago,
          new Date(pago.date)
        )
    );
  }
  async getByAfterDate(after_date: Date): Promise<Pago[]> {
    const formattedDate = after_date.toISOString(); // Asegura formato ISO válido para SQL

    const pagos = await (await db).getAllAsync<Pago>(
      "SELECT * FROM pagos WHERE date > ?",
      [formattedDate]
    );

    return pagos.map(
      (pago) =>
        new Pago(
          pago.id,
          pago.cuenta_id,
          pago.pago,
          new Date(pago.date) // Asegura que el campo `date` se convierta en `Date`
        )
    );
  }
}