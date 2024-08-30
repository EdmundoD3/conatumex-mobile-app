import { isString } from "../../helper/isDataType";
import SingleValueTableBase from "../base/singleValueTableBase";
import { createInsert, getParams, TableColumn } from "../helpers/paramsPush";

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
    clienteId = "",
    street = "",
    noAddress = "",
    betweenStreet = "",
    referencia = "",
    observation = "",
    stateId = "",
    coloniaId = "",
    cityId = "",
  }) {
    this.clienteId = clienteId;
    this.street = street;
    this.noAddress = noAddress;
    this.betweenStreet = betweenStreet;
    this.referencia = referencia;
    this.observation = observation;
    this.stateId = stateId;
    this.coloniaId = coloniaId;
    this.cityId = cityId;
  }
  static async get({
    id="",
    clienteId = "",
    street = "",
    noAddress = "",
    betweenStreet = "",
    referencia = "",
    observation = "",
    stateId = "",
    coloniaId = "",
    cityId = "",
  }) {
    const params = this.createParams({
      id,
      clienteId,
      street,
      noAddress,
      betweenStreet,
      referencia,
      observation,
      stateId,
      coloniaId,
      cityId,
    })

  }
  static async getByColum(column, value) {
    const sql = `
        SELECT * FROM address WHERE ${column} = ?;
      `;
    const queryParams = [value];
    try {
      return await (await db).getFirstAsync(sql, queryParams);
    } catch (error) {
      throw error;
    }
  }
  static async getById(id) {
    return this.getByColum("id",id)
  }

  async save(columns = [], values = []) {
    const placeholders = columns.map(() => "?").join(", ");
    const query = `
        INSERT INTO address (
          ${columns.join(", ")}
        ) VALUES (${placeholders})
      `;
    try {
      return await (await db).runAsync(query, values);
    } catch (error) {
      console.error(`Error saving to address:`, error);
      throw error;
    }
  }

  async getOrSave(column, value, columns, values) {
    const item = await this.get(column, value);
    if (item) return item;
    await this.save(columns, values);
    return await this.get(column, value);
  }

  static async saveAll(tableName, items = [], columns = []) {
    try {
      return await Promise.all(
        items.map(async (item) => {
          const values = columns.map((col) => item[col]);
          return await new this(tableName, item).save(columns, values);
        })
      );
    } catch (error) {
      throw error;
    }
  }
  static createParams({
    id = "",
    clienteId = "",
    street = "",
    noAddress = "",
    betweenStreet = "",
    referencia = "",
    observation = "",
    stateId = "",
    coloniaId = "",
    cityId = "",
  }, conditional = "and") {
    const preParams = [
      new TableColumn("id", id, conditional),
      new TableColumn("cliente_id", clienteId, conditional),
      new TableColumn("street", street, conditional),
      new TableColumn("no_address", noAddress, conditional),
      new TableColumn("between_street", betweenStreet, conditional),
      new TableColumn("referencia", referencia, conditional),
      new TableColumn("observation", observation, conditional),
      new TableColumn("state_id", stateId, conditional),
      new TableColumn("colonia_id", coloniaId, conditional),
      new TableColumn("city_id", cityId, conditional),
    ];
    return getParams(preParams);
  }
  static createInsert({
    id,
    clienteId,
    street,
    noAddress,
    betweenStreet,
    referencia,
    observation,
    stateId,
    coloniaId,
    cityId,
  }) {
    const columns = [
      new TableColumn("id", id),
      new TableColumn("cliente_id", clienteId),
      new TableColumn("street", street),
      new TableColumn("no_address", noAddress),
      new TableColumn("between_street", betweenStreet),
      new TableColumn("referencia", referencia),
      new TableColumn("observation", observation),
      new TableColumn("state_id", stateId),
      new TableColumn("colonia_id", coloniaId),
      new TableColumn("city_id", cityId),
    ];
    return createInsert(columns,"address");
  }
  static createUpdate({
    id,
    clienteId,
    street,
    noAddress,
    betweenStreet,
    referencia,
    observation,
    stateId,
    coloniaId,
    cityId,
  }, condition) {
    // Crear instancias de TableColumn para cada propiedad del objeto de datos
    const columns = [
      new TableColumn("id", id),
      new TableColumn("cliente_id", clienteId),
      new TableColumn("street", street),
      new TableColumn("no_address", noAddress),
      new TableColumn("between_street", betweenStreet),
      new TableColumn("referencia", referencia),
      new TableColumn("observation", observation),
      new TableColumn("state_id", stateId),
      new TableColumn("colonia_id", coloniaId),
      new TableColumn("city_id", cityId),
    ];

    // Llamar a createUpdate para construir la consulta y los parámetros
    return createUpdate(columns, "address", condition);
  }
}

export { AddressTable, CityTable, ColoniaTable, StateTable };
