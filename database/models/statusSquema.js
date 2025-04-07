import { StatusRepository } from "../repository/status";

class StatusReq {
  constructor({ status, statusId }) {
    this.status = status;
    this.id = statusId;
  }
  save() {
    const newStatus = new StatusRepository({ id: this.id, status: this.status })
    return newStatus.getOrSave()
  }
}

export { StatusReq }