import SingleValueTableBase from "../base/singleValueTableBase";

class StateTable extends SingleValueTableBase {
  constructor({ id, state }) {
    super("state", { id });
    this.state = state;
  }

  async save() {
    return await super.save(["id", "state"], [this.id, this.state]);
  }

  async getOrSave() {
    return await super.getOrSave(
      "state",
      this.state,
      ["id", "state"],
      [this.id, this.state]
    );
  }

  static async saveAll(states = []) {
    return await SingleValueTableBase.saveAll("state", states, ["id", "state"]);
  }
}

class ColoniaTable extends SingleValueTableBase {
  constructor({ id, colonia }) {
    super("colonia", { id });
    this.colonia = colonia;
  }

  async save() {
    return await super.save(["id", "colonia"], [this.id, this.colonia]);
  }

  async getOrSave() {
    return await super.getOrSave(
      "colonia",
      this.colonia,
      ["id", "colonia"],
      [this.id, this.colonia]
    );
  }

  static async saveAll(colonias = []) {
    return await SingleValueTableBase.saveAll("colonia", colonias, [
      "id",
      "colonia",
    ]);
  }
}

class CityTable extends SingleValueTableBase {
  constructor({ id, city }) {
    super("city", { id });
    this.city = city;
  }

  async save() {
    return await super.save(["id", "city"], [this.id, this.city]);
  }

  async getOrSave() {
    return await super.getOrSave(
      "city",
      this.city,
      ["id", "city"],
      [this.id, this.city]
    );
  }

  static async saveAll(cities = []) {
    return await SingleValueTableBase.saveAll("city", cities, ["id", "city"]);
  }
}

class AddressTable {
  constructor({
    id,
    clienteId,
    street,
    noaddress,
    betweenstreet,
    referencia,
    observation,
    stateId,
    coloniaId,
    cityId,
  }) {
    this.id = id;
    this.clienteId = clienteId;
    this.street = street;
    this.noaddress = noaddress;
    this.betweenstreet = betweenstreet;
    this.referencia = referencia;
    this.observation = observation;
    this.stateId = stateId;
    this.coloniaId = coloniaId;
    this.cityId = cityId;
  }
}

export { AddressTable, CityTable, ColoniaTable, StateTable };
