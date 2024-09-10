import { AddressRepository, CityTable, ColoniaTable } from "../repository/AddresRepository";
import { ClienteRepository } from "../repository/ClienteRepository";

import { StatusReq } from "./statusSquema";

class ColoniaReq {
  constructor({ colonia, coloniaId }) {
    this.colonia = colonia;
    this.id = coloniaId;
  }
  save() {
    const newColonia = new ColoniaTable({ id: this.id, colonia: this.colonia })
    return newColonia.getOrSave()
  }
}
class CiudadReq {
  constructor({ ciudad, ciudadId }) {
    this.city = ciudad;
    this.id = ciudadId;
  }
  save() {
    const newCity = new CityTable({ id: this.id, city: this.city })
    return newCity.getOrSave()
  }
}

class Direction {
  constructor({
    clienteId,
    calle,
    numeroCasa,
    colonia,
    ciudad,
    entreCalles,
    referencia,
  }) {
    this.clienteId = clienteId
    this.street = calle
    this.noAddress = numeroCasa
    this.betweenStreet = entreCalles
    this.colonia = colonia ? new ColoniaReq(colonia) : {};
    this.coloniaId = this.colonia?.id
    this.ciudad = ciudad ? new CiudadReq(ciudad) : {};
    this.cityId = this.ciudad?.id
    this.referencia = referencia
  }
  async save() {
    this.colonia.save()
    this.ciudad.save()
    const addressFinded = await AddressRepository.getByClienteId(this.clienteId)
    if (addressFinded?.id) {
      return AddressRepository.updateById(addressFinded.id, { ...this })
    }
    const newAddress = new AddressRepository(this)
    newAddress.save()
  }
}

class CustomerRequestSquema {
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
  }) {
    this.id = id
    this.name = name
    this.email = email
    this.phone = phone
    this.date = date
    this.direction = new Direction({ ...direction, clienteId: id })
    this.status = new StatusReq(status)
    this.purchases = purchases
    this.updatedAt = updatedAt
  }
  async save() {
    const clientFinded = await ClienteRepository.getById(this.id)
    this.direction.save()
    if (clientFinded?.id) {
      return ClienteRepository.updateById(this.id, this)
    }
    const newCliente = new ClienteRepository({ ...this, statusId: this.status.id })
    return newCliente.save()
  }
}

export { CustomerRequestSquema }