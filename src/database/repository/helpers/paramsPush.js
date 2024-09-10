class TableColumn {
  constructor(column, data, conditional = "and") {
    this._column = column;
    this._data = data;
    this._conditional = conditional;
  }

  exists() {
    return Boolean(this._data);
  }

  get() {
    return { [this._column]: this._data };
  }

  // Getters para las propiedades
  get column() {
    return this._column;
  }

  get whereLike() {
    return `${this._column} LIKE "%?%"`;
  }
  get whereEqueal() {
    return `${this._column} = "?"`;
  }

  get conditional() {
    return ` ${this._conditional}`;
  }

  get data() {
    return this._data;
  }
}

function whereParams(columns = [new TableColumn("column", "data column", "and")]) {
  const params = [];
  let whereParams = "";
  const length = columns.length;

  columns.forEach((column, index) => {
    if (column.exists()) {
      whereParams += column.whereLike + (index < length - 1 ? column.conditional : "");
      params.push(`${column.data}`); // Añade los datos con % para LIKE
    }
  });

  // Remover condicional sobrante al final
  whereParams = whereParams.trim();
  if (whereParams.endsWith("and")) {
    whereParams = whereParams.slice(0, -3);
  } else if (whereParams.endsWith("or")) {
    whereParams = whereParams.slice(0, -2);
  }

  return { whereParams, params };
}

function createWhere(columns = [new TableColumn("column", "data column", "and")]) {
  const params = [];
  let whereParams = "";
  const length = columns.length;

  columns.forEach((column, index) => {
    whereParams += column.whereLike + (index < length - 1 ? column.conditional : "");
    params.push(column.data);
  });
  return { whereParams, params };
}

function createInsert(columns=[], tableName='') {
  // Filtrar las columnas que tienen datos válidos
  const validColumns = columns.filter(col => col.data !== undefined && col.data !== null && col.data !== "");

  // Si no hay columnas válidas, devolver una consulta vacía
  if (validColumns.length === 0) {
    return { query: '', queryParams: [] };
  }

  // Extraer los nombres de las columnas y los valores
  const columnNames = validColumns.map(col => col.column).join(", ");
  const queryParams = validColumns.map(col => col.data);
  const columnValues = validColumns.map(() => '?').join(", ");

  // Construir la consulta SQL
  const query = `INSERT INTO ${tableName} (${columnNames}) VALUES (${columnValues});`;

  return { query, queryParams };
}


function createUpdate(columns=[new TableColumn("column", "data column", "and")], tableName, condition = "id = id") {
  // Filtrar las columnas que tienen datos válidos
  const validColumns = columns.filter(col => col.data !== undefined && col.data !== null && col.data !== "");

  // Si no hay columnas válidas, devolver una consulta vacía
  if (validColumns.length === 0) {
    return { query: '', queryParams: [] };
  }

  // Extraer los nombres de las columnas y los valores
  const setClause = validColumns.map(col => `${col.column} = ?`).join(", ");
  const queryParams = validColumns.map(col => col.data);

  // Construir la consulta SQL
  const query = `UPDATE ${tableName} SET ${setClause} WHERE ${condition};`;

  return { query, queryParams };
}

export { TableColumn, whereParams, createWhere,createInsert,createUpdate };
