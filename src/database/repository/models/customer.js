import { StatusTable } from "./status";

const customerSchema = new Schema({
    name: String,
    password: String,
    email:String,
    phone: String,
    date: Date,
    direction: {
      calle: String,
      numeroCasa: String,
      coloniaId: { type: Schema.Types.ObjectId, ref: 'Colonia' },
      ciudadId: { type: Schema.Types.ObjectId, ref: 'Ciudad' },
      entreCalles: String,
      referencia:String,
    },
    statusId:{ type: Schema.Types.ObjectId, ref: 'Status' },
    purchases: [{ type: Schema.Types.ObjectId, ref: 'Purchase' }],
    updatedAt: {
      type: Date,
      default: new Date()
    },
  });

class Customer{
    constructor(customer){
        this.cliente = new ClienteTable(customer)
    }
}

  class ClienteTable {
    constructor({ id, mongodbId, name, email, phone, date, comments='', statusId }) {
        this.id = id;
        this.mongodbId = mongodbId;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.date = date;
        this.comments = comments;
        this.statusId = statusId;
    }
}

class CiudadModelRes {
    constructor({ ciudad, _id }) {
      this.ciudad = ciudad;
      this.ciudadId = _id;
    }
  }
  class ColoniaModelRes {
    constructor({ colonia, _id }) {
      this.colonia = colonia;
      this.coloniaId = _id;
    }
  }
  
export {CiudadModelRes,ClienteTable,ColoniaModelRes}