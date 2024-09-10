import SingleValueTableBase from "./base/singleValueTableBase";

class StatusRepository extends SingleValueTableBase {
  constructor({ id, status }) {
    super("status", { id });
    this.status = status;
  }

  async save() {
    return await super.save(["id", "status"], [this.id, this.status]);
  }

  async getOrSave() {
    return await super.getOrSave(
      ["id", "status"],
      [this.id, this.status]
    );
  }

  static async saveAll(statuses = []) {
    return await SingleValueTableBase.saveAll("status", statuses, ["id", "status"]);
  }
}

export { StatusRepository }