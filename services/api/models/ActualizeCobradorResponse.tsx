class UserModelResponse {
  name: string;
  id: string;

  constructor({ name, id }: { name: string; id: string }) {
    this.name = name;
    this.id = id;
  }
}

class StatusModelResponse {
  status: string;
  statusId: string;

  constructor({ status, statusId }: { status: string; statusId: string }) {
    this.status = status;
    this.statusId = statusId;
  }
}

class ProductModelResponse {
  quantity: number;
  product: string;
  productId: string;

  constructor({ quantity, product, productId }: { quantity: number; product: string; productId: string }) {
    this.quantity = quantity;
    this.product = product;
    this.productId = productId;
  }
}

class PaymentModelResponse {
  // Define las propiedades de los pagos si es necesario
  // Por ejemplo:
  // amount: number;
  // date: Date;
}

class PurchaseModelResponse {
  id: string;
  vendedor: UserModelResponse;
  cobrador: UserModelResponse;
  saleDate: Date;
  creditPrice: number;
  cashPrice: number;
  cashPriceEndDate?: Date; // Opcional, ya que no está en el JSON
  collectionDate: Date;
  collectionFrequency: { amount: string };
  products: ProductModelResponse[];
  payments: PaymentModelResponse[];
  status: StatusModelResponse;
  updatedAt: Date;

  constructor({
    id,
    vendedor,
    cobrador,
    saleDate,
    creditPrice,
    cashPrice,
    cashPriceEndDate,
    collectionDate,
    collectionFrequency,
    products,
    payments,
    status,
    updatedAt,
  }: {
    id: string;
    vendedor: UserModelResponse;
    cobrador: UserModelResponse;
    saleDate: string;
    creditPrice: number;
    cashPrice: number;
    cashPriceEndDate?: string;
    collectionDate: string;
    collectionFrequency: { amount: string };
    products: { quantity: number; product: string; productId: string }[];
    payments: PaymentModelResponse[];
    status: { status: string; statusId: string };
    updatedAt: string;
  }) {
    this.id = id;
    this.vendedor = new UserModelResponse(vendedor);
    this.cobrador = new UserModelResponse(cobrador);
    this.saleDate = new Date(saleDate);
    this.creditPrice = creditPrice;
    this.cashPrice = cashPrice;
    this.cashPriceEndDate = cashPriceEndDate ? new Date(cashPriceEndDate) : undefined;
    this.collectionDate = new Date(collectionDate);
    this.collectionFrequency = collectionFrequency;
    this.products = products.map((product) => new ProductModelResponse(product));
    this.payments = payments;
    this.status = new StatusModelResponse(status);
    this.updatedAt = new Date(updatedAt);
  }
}

class ColoniaModelResponse {
  colonia: string;
  coloniaId: string;

  constructor({ colonia, coloniaId }: { colonia: string; coloniaId: string }) {
    this.colonia = colonia;
    this.coloniaId = coloniaId;
  }
}

class CiudadModelResponse {
  ciudad: string;
  ciudadId: string;

  constructor({ ciudad, ciudadId }: { ciudad: string; ciudadId: string }) {
    this.ciudad = ciudad;
    this.ciudadId = ciudadId;
  }
}

class EstadoModelResponse {
  estado: string;
  estadoId: string;

  constructor({ estado, estadoId }: { estado: string; estadoId: string }) {
    this.estado = estado;
    this.estadoId = estadoId;
  }
}

class DirectionModelResponse {
  calle: string;
  numeroCasa: string;
  colonia?: ColoniaModelResponse;
  ciudad?: CiudadModelResponse;
  estado?: EstadoModelResponse;
  entreCalles: string;
  referencia: string;

  constructor({
    calle,
    numeroCasa,
    colonia,
    ciudad,
    estado,
    entreCalles,
    referencia,
  }: {
    calle: string;
    numeroCasa: string;
    colonia?: { colonia: string; coloniaId: string };
    ciudad?: { ciudad: string; ciudadId: string };
    estado?: { estado: string; estadoId: string };
    entreCalles: string;
    referencia: string;
  }) {
    this.calle = calle;
    this.numeroCasa = numeroCasa;
    this.colonia = colonia ? new ColoniaModelResponse(colonia) : undefined;
    this.ciudad = ciudad ? new CiudadModelResponse(ciudad) : undefined;
    this.estado = estado ? new EstadoModelResponse(estado) : undefined;
    this.entreCalles = entreCalles;
    this.referencia = referencia;
  }
}

class CustomerModelResponse {
  id: string;
  name: string;
  email?: string; // Opcional, ya que no está en el JSON
  phone: string;
  date: Date;
  direction: {
    calle: string;
    numeroCasa: string;
    colonia?: { colonia: string; coloniaId: string };
    ciudad?: { ciudad: string; ciudadId: string };
    estado?: { estado: string; estadoId: string };
    entreCalles: string;
    referencia: string;
  };
  status: StatusModelResponse;
  updatedAt: Date;

  constructor({
    id,
    name,
    email,
    phone,
    date,
    direction,
    status,
    updatedAt,
  }: {
    id: string;
    name: string;
    email?: string;
    phone: string;
    date: string;
    direction: {
      calle: string;
      numeroCasa: string;
      colonia?: { colonia: string; coloniaId: string };
      ciudad?: { ciudad: string; ciudadId: string };
      estado?: { estado: string; estadoId: string };
      entreCalles: string;
      referencia: string;
    };
    status: { status: string; statusId: string };
    updatedAt: string;
  }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.date = new Date(date);
    this.direction = new DirectionModelResponse(direction);
    this.status = new StatusModelResponse(status);
    this.updatedAt = new Date(updatedAt);
  }
}

class ClientResponse {
  customer
  purchase

  constructor({ customer, purchase }: { customer: any; purchase: any }) {
    this.customer = new CustomerModelResponse(customer);
    this.purchase = new PurchaseModelResponse(purchase);
  }
}

export class ActualizeCobradorDataResponse {
  dateUpdate: Date;
  purchases: ClientResponse[];

  constructor({ dateUpdate, purchases = [] }: { dateUpdate: string; purchases: ClientResponse[] }) {
    this.dateUpdate = new Date(dateUpdate);
    this.purchases = purchases.map((e) => new ClientResponse(e));
  }
}