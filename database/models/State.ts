import db from "@database/sqlite";
import { DataExistsError } from "@error/typeErrors";
interface IStateRow {
  id: string;
  state: string;
}
type TState = { id: string; state: string };

class State {
  id: string;
  state: string;
  static tableName = "state";

  constructor({ id, state }: TState) {
    this.id = id;
    this.state = state;
  }

  // Guardar un nuevo estado en la tabla 'state'
  async save() {
    const existingValue = await State.getById(this.id); // Esperar el resultado
    const prevVal = new State(existingValue);
    const isDifferent = Object.keys(prevVal).some((key) =>
      key != "id" ? prevVal[key] == this[key] : "false"
    );
    if (existingValue) return; // Si ya existe, salir del método

    const query = `
      INSERT INTO ${State.tableName} (id, state) VALUES (?, ?)
    `;
    const values = [this.id, this.state];
    return (await db).runAsync(query, values);
  }

  // Obtener un registro por ID
  static async getById(idSearched: string): Promise<State | undefined> {
    const sql = `
      SELECT * FROM ${State.tableName} WHERE id = ?;
    `;
    const queryParams = [idSearched];

    try {
      const result = await (
        await db
      ).getFirstAsync<IStateRow>(sql, queryParams);

      if (!result) return undefined;

      return new State(result);
    } catch (error) {
      throw new DataExistsError(
        `Error retrieving state with id ${idSearched}: ${error.message}`,
        "stateSchema.ts State.getById"
      );
    }
  }

  static async getFirst(state: string): Promise<State | undefined> {
    const sql = `
      SELECT * FROM ${State.tableName} WHERE state = ?;
    `;
    const queryParams = [`%${state}%`];
    const stateRow = await (
      await db
    ).getFirstAsync<IStateRow>(sql, queryParams);

    // Manejo del caso undefined
    if (!stateRow) return undefined;
    return new State(stateRow); // Retornar el nuevo estado
  }

  static async getAll(
    state?: string,
    { limit = 10, offset = 0 }: { limit?: number; offset?: number } = {}
  ) {
    let sql = `SELECT * FROM ${State.tableName}`;
    const queryParams: (string | number)[] = [];

    if (state) {
      sql += ` WHERE state LIKE ?`;
      queryParams.push(`%${state}%`); // Concatenar '%' para la búsqueda
    }

    sql += ` LIMIT ? OFFSET ?`;
    queryParams.push(limit, offset);
    const stateRows = await (await db).getAllAsync<IStateRow>(sql, queryParams);
    return stateRows.map((state) => new State(state));
  }
}

class StateManager {
  private states: State[];

  constructor() {
    this.states = []; // Inicializa el array de estados
  }

  // Agregar un nuevo estado al array
  add(state: State) {
    this.states.push(state);
  }

  // Obtener un estado por ID
  getById(id: string): State | undefined {
    return this.states.find((state) => state.id === id);
  }

  // Obtener todos los estados
  getAll(): State[] {
    return this.states;
  }

  // Eliminar un estado por ID
  removeById(id: string): boolean {
    const initialLength = this.states.length;
    this.states = this.states.filter((state) => state.id !== id);
    return this.states.length < initialLength; // Retorna true si se eliminó un estado
  }

  // Actualizar un estado por ID
  updateById(id: string, newState: Partial<State>): boolean {
    const stateIndex = this.states.findIndex((state) => state.id === id);
    if (stateIndex === -1) return false;

    const existingState = this.states[stateIndex];
    this.states[stateIndex] = new State({
      id: existingState.id,
      state: newState.state || existingState.state,
    });
    return true; // Retorna true si se actualizó el estado
  }

  // Cargar estados desde la base de datos
  async loadFromDatabase(
    state: string | null,
    { limit = 10, offset = 0 }: { limit?: number; offset?: number } = {}
  ) {
    const allStates = await State.getAll(state, { limit, offset }); // Asumiendo que `State.getAll()` obtiene todos los estados de la base de datos
    this.states = allStates;
  }
}

export { State, StateManager };
