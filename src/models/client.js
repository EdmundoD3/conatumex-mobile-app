class client {
  constructor({id,mongodbId,name,email,phone,date,comments,statusId,vendedorId}){
    this.id = id
    this.mongodbId = mongodbId
    this.name = name
    this.email=email
    this.phone = phone
    this.date = date
    this.comments = comments
    this.statusId = statusId
    this.vendedorId = vendedorId
  }
}
const clienteTable = `CREATE TABLE IF NOT EXISTS cliente (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  mongodb_id TEXT,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  date DATE NOT NULL,
  comments TEXT,
  status_id INTEGER NOT NULL,
  vendedor_id INTEGER NOT NULL,
  FOREIGN KEY (status_id) REFERENCES status(id) ON DELETE NO ACTION ON UPDATE NO ACTION,
  FOREIGN KEY (vendedor_id) REFERENCES vendedor(id) ON DELETE NO ACTION ON UPDATE NO ACTION
);`;