import db from "@database/sqlite";
import { CollectionFrequency } from "@database/repository/base/Entity";
import { CollectionFrequencyRepository } from "@database/repository/base/InterfacesRepository";

export class SQLCollectionFrequencyRepository implements CollectionFrequencyRepository {
  async getAll(limit = 10, offset = 0): Promise<CollectionFrequency[]> {
    const frequencies = await (await db).getAllAsync<CollectionFrequency[]>(
      "SELECT * FROM collection_frequency OFFSET ? LIMIT ?",
      [offset, limit]
    );
    return frequencies.map(
      (frequency: any) =>
        new CollectionFrequency(
          frequency.cuenta_id,
          frequency.amount,
          frequency.frequency
        )
    );
  }

  async getById(cuenta_id: string): Promise<CollectionFrequency | null> {
    const frequency = await (await db).getFirstAsync<CollectionFrequency>(
      "SELECT * FROM collection_frequency WHERE cuenta_id = ?",
      [cuenta_id]
    );
    return frequency
      ? new CollectionFrequency(
          frequency.cuenta_id,
          frequency.amount,
          frequency.frequency
        )
      : null;
  }

  async create(frequency: CollectionFrequency): Promise<void> {
    await (await db).runAsync(
      "INSERT INTO collection_frequency (cuenta_id, amount, frequency) VALUES (?, ?, ?)",
      [frequency.cuenta_id, frequency.amount, frequency.frequency]
    );
  }

  async update(frequency: CollectionFrequency): Promise<void> {
    await (await db).runAsync(
      "UPDATE collection_frequency SET amount = ?, frequency = ? WHERE cuenta_id = ?",
      [frequency.amount, frequency.frequency, frequency.cuenta_id]
    );
  }

  async delete(cuenta_id: string): Promise<void> {
    await (await db).runAsync("DELETE FROM collection_frequency WHERE cuenta_id = ?", [cuenta_id]);
  }
}