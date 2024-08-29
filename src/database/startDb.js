import * as SQLite from "expo-sqlite";
import { BaseError } from "../error/typeErrors";
import SyncDateHandler from "./updateDate";
import { URL_GET_ALL_PURCHASES } from "../constants/url";
import { AdminUserStorage } from "./AdminUserStorage";

const db = SQLite.openDatabaseAsync("conatumex");

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
  cliente_id INTEGER NOT NULL,
  street TEXT,
  noaddress TEXT,
  betweenstreet TEXT,
  referencia TEXT,
  observation TEXT,
  state_id TEXT NOT NULL,
  colonia_id TEXT NOT NULL,
  city_id TEXT NOT NULL,
  FOREIGN KEY (cliente_id) REFERENCES cliente(id) ON DELETE NO ACTION ON UPDATE NO ACTION,
  FOREIGN KEY (state_id) REFERENCES state(id) ON DELETE NO ACTION ON UPDATE NO ACTION,
  FOREIGN KEY (colonia_id) REFERENCES colonia(id) ON DELETE NO ACTION ON UPDATE NO ACTION,
  FOREIGN KEY (city_id) REFERENCES city(id) ON DELETE NO ACTION ON UPDATE NO ACTION
);`;

const vendedorTable = `CREATE TABLE IF NOT EXISTS vendedor (
  id TEXT PRIMARY KEY,
  vendedor TEXT NOT NULL UNIQUE
);`;

const statusTable = `CREATE TABLE IF NOT EXISTS status (
  id TEXT PRIMARY KEY,
  status TEXT NOT NULL UNIQUE
);`;

const clienteTable = `CREATE TABLE IF NOT EXISTS cliente (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  mongodb_id TEXT,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  date DATE NOT NULL,
  comments TEXT,
  status_id TEXT NOT NULL,
  FOREIGN KEY (status_id) REFERENCES status(id) ON DELETE NO ACTION ON UPDATE NO ACTION,
  FOREIGN KEY (vendedor_id) REFERENCES vendedor(id) ON DELETE NO ACTION ON UPDATE NO ACTION
);`;

const pagosTable = `CREATE TABLE IF NOT EXISTS pagos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  cuenta_id INTEGER NOT NULL,
  pago VARCHAR(10) NOT NULL,
  date DATETIME NOT NULL,
  FOREIGN KEY (cuenta_id) REFERENCES cuenta(id) ON DELETE NO ACTION ON UPDATE NO ACTION
);`;

const productosTable = `CREATE TABLE IF NOT EXISTS producto (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL UNIQUE,
  contado INTEGER,
  credito INTEGER
);`;

const compraTable = `CREATE TABLE IF NOT EXISTS compra (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  producto_id INTEGER NOT NULL,
  cuenta_id INTEGER NOT NULL,
  cantidad INTEGER NOT NULL,
  FOREIGN KEY (producto_id) REFERENCES producto(id) ON DELETE NO ACTION ON UPDATE NO ACTION,
  FOREIGN KEY (cuenta_id) REFERENCES cuenta(id) ON DELETE NO ACTION ON UPDATE NO ACTION
);`;

const cuentaTable = `CREATE TABLE IF NOT EXISTS cuenta (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  mongodb_id TEXT,
  vendedor_id TEXT NOT NULL,
  cliente_id INTEGER NOT NULL,
  credito VARCHAR(12) NOT NULL,
  contado VARCHAR(12),
  abono VARCHAR(12) NOT NULL,
  date DATE NOT NULL,
  contado_date DATE NOT NULL,
  next_collection_date DATE NOT NULL,
  ischange INTEGER NOT NULL DEFAULT 0,
  no_cuenta VARCHAR(12),
  is_active INTEGER NOT NULL DEFAULT 1,
  is_change INTEGER NOT NULL,
  FOREIGN KEY (cliente_id) REFERENCES cliente(id) ON DELETE NO ACTION ON UPDATE NO ACTION
);`;

const initTables = `${stateTable} ${coloniaTable} ${cityTable} ${addressTable} ${vendedorTable} ${statusTable} ${clienteTable} ${pagosTable} ${productosTable} ${compraTable} ${cuentaTable}`;
const deleteTables = `DROP TABLE IF EXISTS address;
  DROP TABLE IF EXISTS state;
  DROP TABLE IF EXISTS colonia;
  DROP TABLE IF EXISTS city;
  DROP TABLE IF EXISTS address;
  DROP TABLE IF EXISTS vendedor;
  DROP TABLE IF EXISTS status;
  DROP TABLE IF EXISTS cliente;
  DROP TABLE IF EXISTS pagos;
  DROP TABLE IF EXISTS productos;
  DROP TABLE IF EXISTS compra;
  DROP TABLE IF EXISTS cuenta;`;

const url = URL_GET_ALL_PURCHASES;
const fetchInit = async () => {
  const token = await AdminUserStorage.getToken(); 
  if (!token) throw new Error("La session no se pudo iniciar");
  const { data } = await fetch(url, {
    method: "GET",
    headers: {
      token: `${token.getToken()}`,
    },
  }).then((response) => {
    console.log(response);
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    return response.json();
  });
  return data;
};
const saveInit = (client=[]) => {
  client.forEach(({ customer, purchase }) => {
    console.log(customer);
    console.log(purchase);
  });
};

const startDatabase = async () => {
  try {
    await (await db).execAsync(initTables);
    const lastUpdateDate = await SyncDateHandler.getLastUpdateDate();
    if (!lastUpdateDate) {
      const data = await fetchInit();
      const { dateUpdate,client } = data;
      // SyncDateHandler.saveLastUpdateDate(new Date(dateUpdate))
      saveInit(client)
    }
  } catch (error) {
    throw new BaseError(error);
  }
};
const deleteDatabase = async () => {
  try {
    await (await db).execAsync(deleteTables);
  } catch (error) {
    throw new BaseError(error);
  }
};

export { startDatabase, deleteDatabase };
