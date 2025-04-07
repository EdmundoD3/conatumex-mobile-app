import GenericTableManager from "./base/GenericTableManager";
import { createInsert, createUpdate, TableColumn, whereParams } from "./helpers/paramsPush";
import * as SQLite from "expo-sqlite";

// https://docs.expo.dev/versions/latest/sdk/sqlite/
const db = SQLite.openDatabaseAsync("conatumex");

class StateTable extends GenericTableManager {
  constructor({ id, state }) {
    super("state", { id });
    this.state = state;
  }

  async save() {
    return await super.save(["id", "state"], [this.id, this.state]);
  }

  async getOrSave() {
    return await super.getOrSave(
      ["id", "state"],
      [this.id, this.state]
    );
  }

  static async saveAll(states = []) {
    return await GenericTableManager.saveAll("state", states, ["id", "state"]);
  }
}

class ColoniaTable extends GenericTableManager {
  colonia:string

  constructor({ id, colonia }) {
    super("colonia", { id });
    this.colonia = colonia;
  }

  async save() {
    return await super.save(["id", "colonia"], [this.id, this.colonia]);
  }

  async getOrSave() {
    return await super.getOrSave(
      ["id", "colonia"],
      [this.id, this.colonia]
    );
  }

  static async saveAll(colonias = []) {
    return await GenericTableManager.saveAll("colonia", colonias, [
      "id",
      "colonia",
    ]);
  }
}

class CityTable extends GenericTableManager {
  city:string
  constructor({ id, city }) {
    super("city", { id });
    this.city = city;
  }

  async save() {
    return await super.save(["id", "city"], [this.id, this.city]);
  }

  async getOrSave() {
    return await super.getOrSave(
      ["id", "city"],
      [this.id, this.city]
    );
  }

  static async saveAll(cities = []) {
    return await GenericTableManager.saveAll("city", cities, ["id", "city"]);
  }
}

class AddressRepository {
  clienteId:string;
  street:string;
  noAddress:string;
  betweenStreet:string;
  referencia:string;
  observation:string;
  stateId:string;
  coloniaId:string;
  cityId:string;
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
  }) {
    const {params,whereParams} = this.createWhereParams({
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
    return await (await db).getAllAsync(whereParams, params);
  }
  static async getByColum(column, value) {
    const sql = `
        SELECT * FROM address WHERE ${column} = ?;
      `;
    const queryParams = [value];
    try {
      return await (await db).getAllAsync(sql, queryParams);
    } catch (error) {
      throw error;
    }
  }
  static async getByClienteId(clienteId:string) {
    const sql = `
        SELECT * FROM address WHERE cliente_id = ?;
      `;
    const queryParams = [clienteId];
    try {
      return await (await db).getFirstAsync(sql, queryParams);
    } catch (error) {
      throw error;
    }
  }
  static async getById(id:string|number) {
    return this.getByColum("id", id)
  }

  async save() {
    const { query, queryParams } = AddressRepository.createInsert(this)

    try {
      return await (await db).runAsync(query, queryParams);
    } catch (error) {
      throw error;
    }
  }

  static async saveAll(items = [{
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
  }]) {
    try {
      return await Promise.all(
        items.map((item) => { 
          const newAddress = new AddressRepository(item) 
          return newAddress.save()
        })
      );
    } catch (error) {
      throw error;
    }
  }
  static async updateById(id,{
    clienteId,
    street,
    noAddress,
    betweenStreet,
    referencia,
    observation,
    stateId,
    coloniaId,
    cityId,
  }){
    const {query,queryParams}=AddressRepository.createUpdate("id = ?",{
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
    queryParams.push(id)
    return await (await db).runAsync(query,queryParams)
  }
  static createWhereParams({
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
    return whereParams(preParams);
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
    return createInsert(columns, "address");
  }
  static createUpdate(condition = "id = id", {
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

export { AddressRepository , CityTable, ColoniaTable, StateTable };
