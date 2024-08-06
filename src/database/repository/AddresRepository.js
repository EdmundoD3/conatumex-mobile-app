import * as SQLite from 'expo-sqlite';
import { DataExistsError, MissingDataError } from '../../error/typeErrors';
import { IOneDataSQLRepository } from './Interface';
import verifyIdsData from '../helper/verifyIdsData';

// https://docs.expo.dev/versions/latest/sdk/sqlite/
const db = SQLite.openDatabaseAsync('conatumex');

function querySelect({ dataClauses, tableName }) {
  let query = `SELECT * FROM ${tableName};`
  const queryParams = [];
  const whereClauses = [];
  dataClauses.forEach(({ clauses, params }) => {
    if (params !== undefined && params !== null) {
      whereClauses.push(clauses);
      queryParams.push(params);
    }
  });
  if (queryParams.length <= 0) return null
  if (whereClauses.length > 0) query += ' WHERE ' + whereClauses.join(' AND ');
  return query
}

class StateRepository extends IOneDataSQLRepository {
  constructor(state) {
    super("state", "state", state)
  }
}
class ColoniaRepository extends IOneDataSQLRepository {
  constructor(colonia) {
    super("colonia", "colonia", colonia)
  }
}
class CityRepository extends IOneDataSQLRepository {
  constructor(city) {
    super("city", "city", city)
  }
}

class AddresRepository {
  constructor() {
  }
  static async get({ street, noaddress, betweenstreet, referencia, observation }) {


    // Definimos los dataClauses con las propiedades correspondientes
    const dataClauses = [
      { clauses: 'street = ?', params: street },
      { clauses: 'noaddress = ?', params: noaddress },
      { clauses: 'betweenstreet = ?', params: betweenstreet },
      { clauses: 'referencia = ?', params: referencia },
      { clauses: 'observation = ?', params: observation },
    ];
    const query = querySelect({ dataClauses, tableName: "address" })
    if (query) return (await db).getFirstAsync(query, queryParams)
    return []
  }

  static async getAll({ limit = 10, offset = 0 }) {
    const sql = `SELECT * FROM address LIMIT ? OFFSET ?`;
    return (await db).getAllAsync(sql, [limit, offset])
  }

  static async getByClienteId(cliente_id) {
    return (await db).getFirstAsync(`SELECT * FROM address WHERE cliente_id = ?`, [cliente_id]);
  }

  static async create(addres = {}) {
    const { cliente_id, street, noaddress, betweenstreet, referencia, observation,
      state, colonia, city } = addres

    try {
      if (!cliente_id) throw new MissingDataError("falta id referencia del cliente")
      const clientAddres = await this.getByClienteId(cliente_id)
      if (clientAddres) throw new DataExistsError("cliente ya existe")
      const { cityId, coloniaId, stateId } = await getStateColoniaAndCity({ state, colonia, city });
      const query = `
      INSERT INTO address (
        cliente_id, street, noaddress, betweenstreet, referencia, observation, state_id, colonia_id, city_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
      const values = [cliente_id, street || null, noaddress || null, betweenstreet || null,
        referencia || null, observation || null, stateId, coloniaId, cityId];
      await (await db).runAsync(query, values)
      const thisAddress = await this.get({ ...addres, stateId, coloniaId, cityId })
      return thisAddress

    } catch (error) {
      throw error
    }
  }

  static async updateById({ id, state }) {
    const sql = `UPDATE addres SET ${IAddresData.prototype.columnName} = ? WHERE id = ?`;
    return (await db).runAsync(sql, [state, id])
  }

  static async deleteById(id) {
    const sql = `DELETE FROM addres WHERE id = ?`;
    return (await db).runAsync(sql, [id])
  }
}




async function getStateColoniaAndCity({ state, colonia, city }) {
  const query = `
    SELECT 
      (SELECT id FROM state WHERE state = ?) AS stateId,
      (SELECT id FROM colonia WHERE colonia = ?) AS coloniaId,
      (SELECT id FROM city WHERE city = ?) AS cityId
  `;
  try {
    const { stateId, coloniaId, cityId } = await (await db).getFirstAsync(query, [state, colonia, city]);

    // Verificar y ajustar los IDs obtenidos según sea necesario
    const verifiedStateId = state ? await verifyIdsData(stateId, new StateRepository(state)) : null;
    const verifiedColoniaId = colonia ? await verifyIdsData(coloniaId, new ColoniaRepository(colonia)) : null;
    const verifiedCityId = city ? await verifyIdsData(cityId, new CityRepository(city)) : null;

    return { stateId: verifiedStateId, coloniaId: verifiedColoniaId, cityId: verifiedCityId };
  } catch (error) {
    console.error('Error en getAddresData:', error);
    throw error; // Opcional: relanzar el error para manejo superior
  }
}

export { AddresRepository, StateRepository, ColoniaRepository, CityRepository }