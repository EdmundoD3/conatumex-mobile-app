import {
  TCiudad,
  TColonia,
  TCustomer,
  TDireccion,
  TEstado,
  TNotes,
} from "@database/initialization/tables/CustomerTable";
import { Customer } from "@database/interfaces/PrincipalInterface";
import { SQLiteDatabase } from "expo-sqlite";
import { StatusRepository } from "./StatusRepository";
import { BaseRepository } from "./base/BaseRepository";

export class CustomerRepository extends BaseRepository {
  async create(customer: Customer) {
    const db = await this.getDb();
    await CustomerRepository.setInCustomerTable(customer, db);
    await DirectionRepository.setInDirectionTable(customer.direction,customer.id,db)

  }
  async getAllDataById(id: string) {
    const db = await this.getDb();
    return CustomerRepository.getAllDataById(id, db);
  }
  static async getAllDataById(
    id: string,
    db: SQLiteDatabase
  ): Promise<Customer> {
    const customers = await CustomerRepository.getById(id, db);
    const direction = await DirectionRepository.getByCustomerId(id, db);
    const notes = await NotesRepository.getByCustomerId(id, db);
    const status = await StatusRepository.getStatusById(customers.statusId, db);
    const res: Customer = {
      ...customers,
      direction,
      notes,
      status,
    };
    return res;
  }
  static getById(id: string, db: SQLiteDatabase) {
    return db.getFirstAsync<TCustomer>(`SELECT * FROM customers WHERE id = ?`, [
      id,
    ]);
  }
  static setInCustomerTable(customer: TCustomer, db: SQLiteDatabase) {
    return db.runAsync(
      `INSERT INTO purchases (
        id, name, cobradorId, phone, date, statusId
      ) VALUES (?, ?, ?, ?, ?, ?)`,
      [
        customer.id,
        customer.name,
        customer.cobradorId,
        customer.phone,
        customer.date,
        customer.statusId,
      ]
    );
  }

}

export type DirectionResult = {
  customerId: string;
  calle?: string;
  numeroCasa?: string;
  coloniaId?: string;
  estadoId?: string;
  ciudadId?: string;
  entreCalles?: string;
  referencia?: string;
  colonia: string | null;
  ciudad: string | null;
  estado: string | null;
};

export class DirectionRepository {
  static async getByCustomerId(
    id: string,
    db: SQLiteDatabase
  ): Promise<DirectionResult | null> {
    if (!id) throw new Error("Customer ID is required");

    try {
      const result = await db.getFirstAsync<DirectionResult>(
        `
        SELECT 
          cd.customerId,
          cd.calle,
          cd.numeroCasa,
          cd.coloniaId,
          cd.estadoId,
          cd.ciudadId,
          cd.entreCalles,
          cd.referencia,
          COALESCE(dc.colonia, NULL) as colonia,
          COALESCE(dci.ciudad, NULL) as ciudad,
          COALESCE(de.estado, NULL) as estado
        FROM customer_directions cd
        LEFT JOIN direction_colonia dc ON cd.coloniaId = dc.id
        LEFT JOIN direction_ciudad dci ON cd.ciudadId = dci.id
        LEFT JOIN direction_estado de ON cd.estadoId = de.id
        WHERE cd.customerId = ?
      `,
        [id]
      );

      if (!result) return null;

      return {
        customerId: result.customerId,
        calle: result.calle,
        numeroCasa: result.numeroCasa,
        coloniaId: result.coloniaId,
        estadoId: result.estadoId,
        ciudadId: result.ciudadId,
        entreCalles: result.entreCalles,
        referencia: result.referencia,
        colonia: result.coloniaId ? result.colonia || null : null,
        ciudad: result.ciudadId ? result.ciudad || null : null,
        estado: result.estadoId ? result.estado || null : null,
      };
    } catch (error) {
      throw new Error(`Failed to fetch direction: ${(error as Error).message}`);
    }
  }
  static setInDirectionTable(direction: Omit< TDireccion,"customerId">,customerId:string, db: SQLiteDatabase) {
    return db.runAsync(
      `INSERT INTO purchases (
      customerId, calle, numeroCasa, coloniaId, estadoId, ciudadId, entreCalles, referencia,
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        customerId,
        direction.calle,
        direction.numeroCasa,
        direction.coloniaId,
        direction.estadoId,
        direction.ciudadId,
        direction.entreCalles,
        direction.referencia
      ]
    );
  }
  static async saveInColoniaTable(colonia:TColonia,db:SQLiteDatabase){
    const coloniaData = await DirectionRepository.getColoniaById(colonia.id,db)
    if(coloniaData)return coloniaData
    return db.runAsync(
      `INSERT INTO direction_colonia (
      id, colonia
      ) VALUES (?, ?)`,
      [
        colonia.id,
        colonia.colonia
      ]
    );
  }
  static getColoniaById(id:string,db:SQLiteDatabase){
    return db.getFirstAsync(`SELECT * FROM direction_colonia WHERE id = ?`,[id])
  }
}

export class NotesRepository {
  static getByCustomerId(id: string, db: SQLiteDatabase) {
    return db.getAllAsync<TNotes>(
      `SELECT * FROM customer_notes WHERE customerId = ?`,
      [id]
    );
  }
}
