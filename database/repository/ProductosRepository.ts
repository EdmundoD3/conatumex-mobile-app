import db from "@database/sqlite";
import { Producto } from "@database/repository/base/Entity";
import { ProductoRepository } from "@database/repository/base/InterfacesRepository";

export class SQLProductoRepository implements ProductoRepository {
  async getAll(limit = 10, offset = 0): Promise<Producto[]> {
    const productos = await (await db).getAllAsync<Producto[]>(
      "SELECT * FROM producto OFFSET ? LIMIT ?",
      [offset, limit]
    );
    return productos.map(
      (producto: any) =>
        new Producto(
          producto.id,
          producto.producto,
          producto.contado,
          producto.credito
        )
    );
  }

  async getById(id: number): Promise<Producto | null> {
    const producto = await (await db).getFirstAsync<Producto>(
      "SELECT * FROM producto WHERE id = ?",
      [id]
    );
    return producto
      ? new Producto(
          producto.id,
          producto.producto,
          producto.contado,
          producto.credito
        )
      : null;
  }

  async create(producto: Producto): Promise<void> {
    await (await db).runAsync(
      "INSERT INTO producto (producto, contado, credito) VALUES (?, ?, ?)",
      [producto.producto, producto.contado, producto.credito]
    );
  }

  async update(producto: Producto): Promise<void> {
    await (await db).runAsync(
      "UPDATE producto SET producto = ?, contado = ?, credito = ? WHERE id = ?",
      [producto.producto, producto.contado, producto.credito, producto.id]
    );
  }

  async delete(id: number): Promise<void> {
    await (await db).runAsync("DELETE FROM producto WHERE id = ?", [id]);
  }

  async getByProductName(productName: string): Promise<Producto | null> {
    const producto = await (await db).getFirstAsync<Producto>(
      "SELECT * FROM producto WHERE producto = ?",
      [productName]
    );
    return producto
      ? new Producto(
          producto.id,
          producto.producto,
          producto.contado,
          producto.credito
        )
      : null;
  }
}