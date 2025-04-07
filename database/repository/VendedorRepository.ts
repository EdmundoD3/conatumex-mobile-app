import db from "@database/sqlite";
import { Vendedor } from "@database/repository/base/Entity";
import { VendedorRepository } from "@database/repository/base/InterfacesRepository";

export class SQLVendedorRepository implements VendedorRepository {
  async getAll(limit = 10, offset = 0): Promise<Vendedor[]> {
    const vendedores = await (await db).getAllAsync<Vendedor[]>(
      "SELECT * FROM users OFFSET ? LIMIT ?",
      [offset, limit]
    );
    return vendedores.map(
      (vendedor: any) =>
        new Vendedor(
          vendedor.id,
          vendedor.user
        )
    );
  }

  async getById(id: string): Promise<Vendedor | null> {
    const vendedor = await (await db).getFirstAsync<Vendedor>(
      "SELECT * FROM users WHERE id = ?",
      [id]
    );
    return vendedor
      ? new Vendedor(
          vendedor.id,
          vendedor.user
        )
      : null;
  }

  async create(vendedor: Vendedor): Promise<void> {
    await (await db).runAsync(
      "INSERT INTO users (id, user) VALUES (?, ?)",
      [vendedor.id, vendedor.user]
    );
  }

  async update(vendedor: Vendedor): Promise<void> {
    await (await db).runAsync(
      "UPDATE users SET user = ? WHERE id = ?",
      [vendedor.user, vendedor.id]
    );
  }

  async delete(id: string): Promise<void> {
    await (await db).runAsync("DELETE FROM users WHERE id = ?", [id]);
  }

  async getByUserName(userName: string): Promise<Vendedor | null> {
    const vendedor = await (await db).getFirstAsync<Vendedor>(
      "SELECT * FROM users WHERE user = ?",
      [userName]
    );
    return vendedor
      ? new Vendedor(
          vendedor.id,
          vendedor.user
        )
      : null;
  }
}