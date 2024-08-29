import * as SQLite from "expo-sqlite";
import SingleValueTableBase from "../base/singleValueTableBase";

const db = SQLite.openDatabaseAsync("conatumex");

class StatusTable extends SingleValueTableBase {
  constructor({ id, status }) {
    super("status", { id });
    this.status = status;
  }

  async save() {
    // Guarda el dato en la tabla 'status'
    return await super.save(["id", "status"], [this.id, this.status]);
  }

  async getOrSave() {
    // Obtiene el dato o lo guarda si no existe
    return await super.getOrSave(
      "status",
      this.status,
      ["id", "status"],
      [this.id, this.status]
    );
  }

  static async saveAll(statuses = []) {
    // Guarda todos los datos en la tabla 'status'
    return await SingleValueTableBase.saveAll("status", statuses, ["id", "status"]);
  }
}

export { StatusTable }