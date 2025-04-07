class TableColumn {
  private _column: string;
  private _data: string | number | null;
  private _conditional: string;

  constructor(column: string, data: string | number | null, conditional: string = "and") {
    this._column = column;
    this._data = data !== undefined ? data : null;
    this._conditional = conditional;
  }

  exists(): boolean {
    return Boolean(this._data);
  }

  get(): { [key: string]: string | number | null } {
    return { [this._column]: this._data };
  }

  // Getters para las propiedades
  get column(): string {
    return this._column;
  }

  get whereLike(): string {
    return `${this._column} LIKE ?`;
  }

  get whereEqual(): string {
    return `${this._column} = ?`;
  }

  get conditional(): string {
    return ` ${this._conditional}`;
  }

  get data(): string | number | null {
    return this._data;
  }
}

function whereParams(columns: TableColumn[] = [new TableColumn("column", "data column", "and")]): { whereParams: string, params: (string | number)[] } {
  const params: (string | number)[] = [];
  let whereParams = "";
  const length = columns.length;

  columns.forEach((column, index) => {
    if (column.exists()) {
      whereParams += column.whereLike + (index < length - 1 ? ` ${column.conditional.trim()} ` : "");
      params.push(column.data as string | number); // Añade los datos para LIKE
    }
  });

  // Remover condicional sobrante al final
  whereParams = whereParams.replace(/(\s+and|\s+or)\s*$/, "");

  return { whereParams, params };
}

function createWhere(columns: TableColumn[] = [new TableColumn("column", "data column", "and")]): { whereParams: string, params: (string | number | null)[] } {
  const params: (string | number | null)[] = [];
  let whereParams = "";
  const length = columns.length;

  columns.forEach((column, index) => {
    whereParams += column.whereLike + (index < length - 1 ? ` ${column.conditional.trim()} ` : "");
    params.push(column.data);
  });
  
  return { whereParams, params };
}

function createInsert(columns: TableColumn[] = [], tableName: string = ''): { query: string, queryParams: (string | number | null)[] } {
  const validColumns = columns.filter(col => col.data !== undefined && col.data !== null && col.data !== "");

  if (validColumns.length === 0) {
    return { query: '', queryParams: [] };
  }

  const columnNames = validColumns.map(col => col.column).join(", ");
  const queryParams = validColumns.map(col => col.data);
  const columnValues = validColumns.map(() => '?').join(", ");

  const query = `INSERT INTO ${tableName} (${columnNames}) VALUES (${columnValues});`;

  return { query, queryParams };
}

function createUpdate(columns: TableColumn[] = [new TableColumn("column", "data column", "and")], tableName: string, condition: string = "id = id"): { query: string, queryParams: (string | number | null)[] } {
  const validColumns = columns.filter(col => col.data !== undefined && col.data !== null && col.data !== "");

  if (validColumns.length === 0) {
    return { query: '', queryParams: [] };
  }

  const setClause = validColumns.map(col => `${col.column} = ?`).join(", ");
  const queryParams = validColumns.map(col => col.data);

  const query = `UPDATE ${tableName} SET ${setClause} WHERE ${condition};`;

  return { query, queryParams };
}

export { TableColumn, whereParams, createWhere, createInsert, createUpdate };