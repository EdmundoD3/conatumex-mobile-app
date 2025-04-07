import { Address, City, Cliente, CollectionFrequency, Colonia, Compra, Cuenta, Pago, Producto, State, Status, Vendedor } from "./Entity";

// Repositorio para State
export interface StateRepository {
  getAll(): Promise<State[]>;
  getById(id: string): Promise<State | null>;
  getByStateName(stateName: string): Promise<State | null>; // Nuevo método
  create(state: State): Promise<void>;
  update(state: State): Promise<void>;
  delete(id: string): Promise<void>;
}

// Repositorio para Colonia
export interface ColoniaRepository {
  getAll(): Promise<Colonia[]>;
  getById(id: string): Promise<Colonia | null>;
  create(colonia: Colonia): Promise<void>;
  update(colonia: Colonia): Promise<void>;
  delete(id: string): Promise<void>;
}

// Repositorio para City
export interface CityRepository {
  getAll(): Promise<City[]>;
  getById(id: string): Promise<City | null>;
  create(city: City): Promise<void>;
  update(city: City): Promise<void>;
  delete(id: string): Promise<void>;
}

// Repositorio para Address
export interface AddressRepository {
  getAll(): Promise<Address[]>;
  getById(id: number): Promise<Address | null>;
  getByCity(city_id: string): Promise<Address[]>; // Nuevo método
  getByColonia(colonia_id: string): Promise<Address[]>; // Nuevo método
  create(address: Address): Promise<void>;
  update(address: Address): Promise<void>;
  delete(id: number): Promise<void>;
}

// Repositorio para Status
export interface StatusRepository {
  getAll(): Promise<Status[]>;
  getById(id: string): Promise<Status | null>;
  create(status: Status): Promise<void>;
  update(status: Status): Promise<void>;
  delete(id: string): Promise<void>;
}

// Repositorio para Cliente
export interface ClienteRepository {
  getAll(): Promise<Cliente[]>;
  getById(id: string): Promise<Cliente | null>;
  getByName(name: string): Promise<Cliente | null>; // Nuevo método
  getByStatus(status_id: string): Promise<Cliente[]>; // Nuevo método
  create(cliente: Cliente): Promise<void>;
  createAll(cliente: Cliente): Promise<void>;
  update(cliente: Cliente): Promise<void>;
  delete(id: string): Promise<void>;
}

// Repositorio para Pago
export interface PagoRepository {
  getAll(): Promise<Pago[]>;
  getById(id: number): Promise<Pago | null>;
  create(pago: Pago): Promise<void>;
  update(pago: Pago): Promise<void>;
  delete(id: number): Promise<void>;
  getByAfterDate(after_date: Date): Promise<Pago[]>;
  getByCuentaId(cuenta_id: string): Promise<Pago[]>;
}

// Repositorio para Producto
export interface ProductoRepository {
  getAll(): Promise<Producto[]>;
  getById(id: number): Promise<Producto | null>;
  create(producto: Producto): Promise<void>;
  update(producto: Producto): Promise<void>;
  delete(id: number): Promise<void>;
}

// Repositorio para Compra
export interface CompraRepository {
  getAll(): Promise<Compra[]>;
  getById(id: number): Promise<Compra | null>;
  create(compra: Compra): Promise<void>;
  update(compra: Compra): Promise<void>;
  delete(id: number): Promise<void>;
}

// Repositorio para Vendedor
export interface VendedorRepository {
  getAll(): Promise<Vendedor[]>;
  getById(id: string): Promise<Vendedor | null>;
  create(vendedor: Vendedor): Promise<void>;
  update(vendedor: Vendedor): Promise<void>;
  delete(id: string): Promise<void>;
}

// Repositorio para CollectionFrequency
export interface CollectionFrequencyRepository {
  getAll(): Promise<CollectionFrequency[]>;
  getById(cuenta_id: string): Promise<CollectionFrequency | null>;
  create(frequency: CollectionFrequency): Promise<void>;
  update(frequency: CollectionFrequency): Promise<void>;
  delete(cuenta_id: string): Promise<void>;
}

// Repositorio para Cuenta
export interface CuentaRepository {
  getAll(): Promise<Cuenta[]>;
  getById(id: string): Promise<Cuenta | null>;
  getByDate(date: Date): Promise<Cuenta[]>; // Nuevo método
  getByCliente(cliente_id: string): Promise<Cuenta[]>; // Nuevo método
  create(cuenta: Cuenta): Promise<void>;
  update(cuenta: Cuenta): Promise<void>;
  delete(id: string): Promise<void>;
}