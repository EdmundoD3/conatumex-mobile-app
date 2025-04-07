import { AddressRepository, CityTable, ColoniaTable } from "../repository/AddresRepository";
import { ClienteRepository } from "../repository/ClienteRepository";
import { StatusReq } from "./statusSquema";

interface ColoniaReqParams {
  colonia: string;
  coloniaId: string;
}

interface CiudadReqParams {
  ciudad: string;
  ciudadId: string;
}

interface DirectionParams {
  clienteId: string;
  calle: string;
  numeroCasa: string;
  colonia?: ColoniaReqParams;
  ciudad?: CiudadReqParams;
  entreCalles?: string;
  referencia?: string;
}

interface CustomerRequestParams {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: Date;
  direction: DirectionParams;
  status: string;
  purchases: any;
  updatedAt: Date;
}

class ColoniaReq {
  colonia: string;
  id: string;

  constructor({ colonia, coloniaId }: ColoniaReqParams) {
    this.colonia = colonia;
    this.id = coloniaId;
  }

  async save(): Promise<void> {
    const newColonia = new ColoniaTable({ id: this.id, colonia: this.colonia });
    await newColonia.getOrSave();
  }
}

class CiudadReq {
  city: string;
  id: string;

  constructor({ ciudad, ciudadId }: CiudadReqParams) {
    this.city = ciudad;
    this.id = ciudadId;
  }

  async save(): Promise<void> {
    const newCity = new CityTable({ id: this.id, city: this.city });
    await newCity.getOrSave();
  }
}

class Direction {
  clienteId: string;
  street: string;
  noAddress: string;
  betweenStreet?: string;
  colonia: ColoniaReq | {};
  coloniaId?: string;
  ciudad: CiudadReq | {};
  cityId?: string;
  referencia?: string;

  constructor({
    clienteId,
    calle,
    numeroCasa,
    colonia,
    ciudad,
    entreCalles,
    referencia,
  }: DirectionParams) {
    this.clienteId = clienteId;
    this.street = calle;
    this.noAddress = numeroCasa;
    this.betweenStreet = entreCalles;
    this.colonia = colonia ? new ColoniaReq(colonia) : {};
    this.coloniaId = this.colonia instanceof ColoniaReq ? this.colonia.id : undefined;
    this.ciudad = ciudad ? new CiudadReq(ciudad) : {};
    this.cityId = this.ciudad instanceof CiudadReq ? this.ciudad.id : undefined;
    this.referencia = referencia;
  }

  async save(): Promise<void> {
    if (this.colonia instanceof ColoniaReq) {
      await this.colonia.save();
    }
    if (this.ciudad instanceof CiudadReq) {
      await this.ciudad.save();
    }
    
    const addressFinded = await AddressRepository.getByClienteId(this.clienteId);
    if (addressFinded?.id) {
      await AddressRepository.updateById(addressFinded.id, { ...this });
    } else {
      const newAddress = new AddressRepository(this);
      await newAddress.save();
    }
  }
}

class CustomerRequestSquema {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: Date;
  direction: Direction;
  status: StatusReq;
  purchases: any;
  updatedAt: Date;

  constructor({
    id,
    name,
    email,
    phone,
    date,
    direction,
    status,
    purchases,
    updatedAt,
  }: CustomerRequestParams) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.date = date;
    this.direction = new Direction({ ...direction, clienteId: id });
    this.status = new StatusReq(status);
    this.purchases = purchases;
    this.updatedAt = updatedAt;
  }

  async save(): Promise<void> {
    const clientFinded = await ClienteRepository.getById(this.id);
    await this.direction.save();
    if (clientFinded?.id) {
      await ClienteRepository.updateById(this.id, this);
    } else {
      const newCliente = new ClienteRepository({ ...this, statusId: this.status.id });
      await newCliente.save();
    }
  }
}

export { CustomerRequestSquema };
