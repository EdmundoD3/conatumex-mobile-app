import db from "@database/sqlite";
import { Status } from "@database/repository/base/Entity";
import { StatusRepository } from "@database/repository/base/InterfacesRepository";

export class SQLStatusRepository implements StatusRepository {
  async getAll(limit = 10, offset = 0): Promise<Status[]> {
    const statuses = await (await db).getAllAsync<Status[]>(
      "SELECT * FROM status OFFSET ? LIMIT ?",
      [offset, limit]
    );
    return statuses.map((status: any) => new Status(status.id, status.status));
  }

  async getById(id: string): Promise<Status | null> {
    const status = await (await db).getFirstAsync<Status>(
      "SELECT * FROM status WHERE id = ?",
      [id]
    );
    return status ? new Status(status.id, status.status) : null;
  }

  async create(status: Status): Promise<void> {
    await (await db).runAsync(
      "INSERT INTO status (id, status) VALUES (?, ?)",
      [status.id, status.status]
    );
  }

  async update(status: Status): Promise<void> {
    await (await db).runAsync(
      "UPDATE status SET status = ? WHERE id = ?",
      [status.status, status.id]
    );
  }

  async delete(id: string): Promise<void> {
    await (await db).runAsync("DELETE FROM status WHERE id = ?", [id]);
  }

  async getByStatusName(statusName: string): Promise<Status | null> {
    const status = await (await db).getFirstAsync<Status>(
      "SELECT * FROM status WHERE status = ?",
      [statusName]
    );
    return status ? new Status(status.id, status.status) : null;
  }
}