import db from "@database/sqlite";
import { Colonia } from "@database/repository/base/Entity";
import { ColoniaRepository } from "@database/repository/base/InterfacesRepository";

export class SQLColoniaRepository implements ColoniaRepository {
  async getAll(limit = 10, offset = 0): Promise<Colonia[]> {
    const colonias = await (await db).getAllAsync<Colonia[]>(
      "SELECT * FROM colonia OFFSET ? LIMIT ?",
      [offset, limit]
    );
    return colonias.map((colonia: any) => new Colonia(colonia.id, colonia.colonia));
  }

  async getById(id: string): Promise<Colonia | null> {
    const colonia = await (await db).getFirstAsync<Colonia>(
      "SELECT * FROM colonia WHERE id = ?",
      [id]
    );
    return colonia ? new Colonia(colonia.id, colonia.colonia) : null;
  }

  async create(colonia: Colonia): Promise<void> {
    await (await db).runAsync(
      "INSERT INTO colonia (id, colonia) VALUES (?, ?)",
      [colonia.id, colonia.colonia]
    );
  }

  async update(colonia: Colonia): Promise<void> {
    await (await db).runAsync(
      "UPDATE colonia SET colonia = ? WHERE id = ?",
      [colonia.colonia, colonia.id]
    );
  }

  async delete(id: string): Promise<void> {
    await (await db).runAsync("DELETE FROM colonia WHERE id = ?", [id]);
  }

  async getByColoniaName(coloniaName: string): Promise<Colonia | null> {
    const colonia = await (await db).getFirstAsync<Colonia>(
      "SELECT * FROM colonia WHERE colonia = ?",
      [coloniaName]
    );
    return colonia ? new Colonia(colonia.id, colonia.colonia) : null;
  }
}