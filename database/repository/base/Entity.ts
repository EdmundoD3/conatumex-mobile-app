// Entidad State
export class State {
  constructor(public id: string, public state: string) {}
}

// Entidad Colonia
export class Colonia {
  constructor(public id: string, public colonia: string) {}
}

// Entidad City
export class City {
  constructor(public id: string, public city: string) {}
}

// Entidad Address
export class Address {
  constructor(
    public id: number,
    public cliente_id: string,
    public street: string,
    public no_address: string,
    public between_street: string,
    public referencia: string,
    public observation: string,
    public state_id: string,
    public colonia_id: string,
    public city_id: string
  ) {}
}

// Entidad Status
export class Status {
  constructor(public id: string, public status: string) {}
}

// Entidad Cliente
export class Cliente {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public phone: string,
    public date: Date,
    public comments: string,
    public status_id: string
  ) {}
}

export class ClienteServer extends Cliente {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public phone: string,
    public date: Date,
    public comments: string,
    public status_id: string,
    public direccion: Address,
    public pagos: Pago[]
  ) {
    super(id,name,email,phone,date,comments,status_id);
    this.direccion = direccion
    this.pagos = pagos

  }
}

// Entidad Pago
export class Pago {
  constructor(
    public id: number,
    public cuenta_id: number,
    public pago: number,
    public date: Date
  ) {}
}

// Entidad Producto
export class Producto {
  constructor(
    public id: number,
    public producto: string,
    public contado: number,
    public credito: number
  ) {}
}

// Entidad Compra
export class Compra {
  constructor(
    public id: number,
    public producto_id: number,
    public cuenta_id: string,
    public cantidad: number
  ) {}
}

// Entidad Vendedor
export class Vendedor {
  constructor(public id: string, public user: string) {}
}

// Entidad CollectionFrequency
export class CollectionFrequency {
  constructor(
    public cuenta_id: string,
    public amount: string,
    public frequency: string
  ) {}
}

// Entidad Cuenta
export class Cuenta {
  constructor(
    public id: string,
    public vendedor_id: string,
    public cobrador_id: string,
    public cliente_id: string,
    public credito: string,
    public contado: string,
    public abono: string,
    public date: Date,
    public contado_date: Date,
    public next_collection_date: Date,
    public is_change: number,
    public no_cuenta: string,
    public is_active: number
  ) {}
}
