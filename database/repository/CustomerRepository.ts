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
import { getDatabaseConnection } from "@database/sqlite";
import { BaseRepository } from "./base/BaseRepository";

export class CustomerRepository extends BaseRepository {

  getAllDataById(id:string){
    return CustomerRepository.getAllDataById(id,this.db)
  }
  static async getAllDataById(
    id: string,
    db: SQLiteDatabase
  ): Promise<Customer> {
    const customers = await CustomerRepository.getById(id, db);
    const direction = await DirectionRepository.getByCustomerId(id, db);
    const notes = await NotesRepository.getByCustomerId(id, db);
    const status = await StatusRepository.getStatusById(customers.statusId, db);
    const res: Customer = { ...customers, direction, notes, status };
    return res;
  }
  static getById(id: string, db: SQLiteDatabase) {
    return db.getFirstAsync<TCustomer>(`SELECT * FROM customers WHERE id = ?`, [
      id,
    ]);
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
}

export class NotesRepository {
  static getByCustomerId(id: string, db: SQLiteDatabase) {
    return db.getAllAsync<TNotes>(
      `SELECT * FROM customer_notes WHERE customerId = ?`,
      [id]
    );
  }
}
