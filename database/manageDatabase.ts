import { DatabaseError } from "@error/typeErrors";
import db from "./sqlite";


const stateTable = `CREATE TABLE IF NOT EXISTS state (
  id TEXT PRIMARY KEY,
  state TEXT NOT NULL UNIQUE
);`;

const coloniaTable = `CREATE TABLE IF NOT EXISTS colonia (
  id TEXT PRIMARY KEY,
  colonia TEXT NOT NULL UNIQUE
);`;

const cityTable = `CREATE TABLE IF NOT EXISTS city (
  id TEXT PRIMARY KEY,
  city TEXT NOT NULL UNIQUE
);`;

const addressTable = `CREATE TABLE IF NOT EXISTS address (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  cliente_id TEXT NOT NULL,
  street TEXT,
  no_address TEXT,
  between_street TEXT,
  referencia TEXT,
  observation TEXT,
  state_id TEXT,
  colonia_id TEXT NOT NULL,
  city_id TEXT NOT NULL,
  FOREIGN KEY (cliente_id) REFERENCES cliente(id) ON DELETE NO ACTION ON UPDATE NO ACTION,
  FOREIGN KEY (state_id) REFERENCES state(id) ON DELETE NO ACTION ON UPDATE NO ACTION,
  FOREIGN KEY (colonia_id) REFERENCES colonia(id) ON DELETE NO ACTION ON UPDATE NO ACTION,
  FOREIGN KEY (city_id) REFERENCES city(id) ON DELETE NO ACTION ON UPDATE NO ACTION
);`;

const statusTable = `CREATE TABLE IF NOT EXISTS status (
  id TEXT PRIMARY KEY,
  status TEXT NOT NULL UNIQUE
);`;

const clienteTable = `CREATE TABLE IF NOT EXISTS cliente (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  date DATE NOT NULL,
  comments TEXT,
  status_id TEXT NOT NULL,
  FOREIGN KEY (status_id) REFERENCES status(id) ON DELETE NO ACTION ON UPDATE NO ACTION
);`;

const pagosTable = `CREATE TABLE IF NOT EXISTS pagos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  cuenta_id INTEGER NOT NULL,
  pago INTEGER NOT NULL,
  date DATETIME NOT NULL,
  FOREIGN KEY (cuenta_id) REFERENCES cuenta(id) ON DELETE NO ACTION ON UPDATE NO ACTION
);`;

const productosTable = `CREATE TABLE IF NOT EXISTS producto (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  producto TEXT NOT NULL UNIQUE,
  contado INTEGER,
  credito INTEGER
);`;

const compraTable = `CREATE TABLE IF NOT EXISTS compra (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  producto_id INTEGER NOT NULL,
  cuenta_id TEXT NOT NULL,
  cantidad INTEGER NOT NULL,
  FOREIGN KEY (producto_id) REFERENCES producto(id) ON DELETE NO ACTION ON UPDATE NO ACTION,
  FOREIGN KEY (cuenta_id) REFERENCES cuenta(id) ON DELETE NO ACTION ON UPDATE NO ACTION
);`;

const vendedorTable = `CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  user TEXT NOT NULL UNIQUE
);`;
const collectionFrequency = `CREATE TABLE IF NOT EXISTS collection_frequency (
  cuenta_id TEXT NOT NULL UNIQUE,
  amount TEXT NOT NULL,
  frequency TEXT NOT NULL,
  FOREIGN KEY (cuenta_id) REFERENCES cuenta(id) ON DELETE NO ACTION ON UPDATE NO ACTION
);`;

const cuentaTable = `CREATE TABLE IF NOT EXISTS cuenta (
  id TEXT PRIMARY KEY,
  vendedor_id TEXT NOT NULL,
  cobrador_id TEXT NOT NULL,
  cliente_id TEXT NOT NULL,
  credito VARCHAR(12) NOT NULL,
  contado VARCHAR(12),
  abono VARCHAR(12) NOT NULL,
  date DATE NOT NULL,
  contado_date DATE NOT NULL,
  next_collection_date DATE NOT NULL,
  is_change INTEGER NOT NULL DEFAULT 0,  -- Corregido a is_change
  no_cuenta VARCHAR(12),
  is_active INTEGER NOT NULL DEFAULT 1,
  FOREIGN KEY (cliente_id) REFERENCES cliente(id) ON DELETE NO ACTION ON UPDATE NO ACTION,
  FOREIGN KEY (vendedor_id) REFERENCES users(id) ON DELETE NO ACTION ON UPDATE NO ACTION,
  FOREIGN KEY (cobrador_id) REFERENCES users(id) ON DELETE NO ACTION ON UPDATE NO ACTION
);`;

const initTables = `${stateTable} ${coloniaTable} ${cityTable} ${addressTable} ${vendedorTable} ${statusTable} ${collectionFrequency} ${clienteTable} ${pagosTable} ${productosTable} ${compraTable} ${cuentaTable}`;
const deleteTables = `DROP TABLE IF EXISTS address;
  DROP TABLE IF EXISTS state;
  DROP TABLE IF EXISTS colonia;
  DROP TABLE IF EXISTS city;
  DROP TABLE IF EXISTS collection_frequency;
  DROP TABLE IF EXISTS vendedor;
  DROP TABLE IF EXISTS status;
  DROP TABLE IF EXISTS cliente;
  DROP TABLE IF EXISTS pagos;
  DROP TABLE IF EXISTS producto;  -- Corregido a producto (en lugar de productos)
  DROP TABLE IF EXISTS compra;
  DROP TABLE IF EXISTS cuenta;`;

const deleteDatabase = async () => {
  try {
    await (await db).execAsync(deleteTables);
  } catch (error) {
    throw new DatabaseError(error,"startDb.ts, deleteDatabase");
  }
};
const startDatabase = async () => {
  try {
    await (await db).execAsync(initTables);
  } catch (error) {
    throw new DatabaseError(error,"startDb.ts, startDatabase");
  }
};

export { startDatabase, deleteDatabase };
