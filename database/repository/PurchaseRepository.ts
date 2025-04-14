// purchase.repository.ts
import {
  generateParams,
  placeholdersGenerate,
} from "@database/helpers/utilsRepository";
import {
  TCollectionFrequency,
  TCollectorHistory,
  TPayment,
  TPurchase,
  TPurchaseNote,
} from "@database/initialization/tables/PurchaseTable";
import {
  CollectionFrequency,
  Customer,
  Note,
  Payment,
  ProductItem,
  Purchase,
  Status,
  User,
} from "@database/interfaces/PrincipalInterface";
import { CobradorHistorial, Product } from "@database/models/SQLiteModels";
import { getDatabaseConnection } from "@database/sqlite";
import { SQLiteDatabase } from "expo-sqlite";
import { StatusRepository } from "./StatusRepository";
import { UserRepository } from "./UserRepository";
import { CustomerRepository } from "./CustomerRepository";
import { BaseRepository } from "./base/BaseRepository";

export class PurchaseRepository extends BaseRepository {

  create(purchase: Purchase) {
    return PurchaseRepository.create(purchase, this.db);
  }
  static async create(purchase: Purchase, db: SQLiteDatabase): Promise<void> {
    // const db = await getDatabaseConnection();
    try {
      await db.withTransactionAsync(async () => {
        await db.runAsync(
          `INSERT INTO purchases (
            id, customerId, vendedorId, cobradorId, saleDate, creditPrice, cashPrice,
            cashPriceEndDate, collectionDate, totalPaid, updatedAt,
            statusId, isActive
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            purchase.id,
            purchase.customerId,
            purchase.vendedorId,
            purchase.cobradorId,
            purchase.saleDate,
            purchase.creditPrice,
            purchase.cashPrice,
            purchase.cashPriceEndDate,
            purchase.collectionDate,
            purchase.totalPaid,
            purchase.updatedAt,
            purchase.statusId,
            purchase.isActive ? 1 : 0,
          ]
        );
        //collection frequency insert
        if (purchase.collectionFrequency) {
          const { amount, frequency, nextVisit } = purchase.collectionFrequency;
          await db.runAsync(
            `INSERT INTO purchase_collection_frequency 
             (purchaseId, amount, frequency, nextVisit) 
             VALUES (?,?,?,?)`,
            [purchase.id, amount, frequency, nextVisit]
          );
        }
        const sizeCobradorHistorial = purchase.cobradorHistorial.length;
        if (sizeCobradorHistorial > 0) {
          const injectionCobradorHistorialParams = (e: CobradorHistorial) => [
            purchase.id, // purchaseId
            e.cobradorId ?? null, // cobradorId
            e.asignadoDesde ?? null, // asignadoDesde
            e.asignadoHasta ?? null, // asignadoHasta
          ];
          // Generar los placeholders correctamente
          const placeholders = placeholdersGenerate({
            pattern: "(?, ?, ?, ?)",
            count: sizeCobradorHistorial,
          });

          // Obtener parámetros aplanados
          const params = generateParams(
            purchase.cobradorHistorial,
            injectionCobradorHistorialParams
          );

          await db.runAsync(
            `INSERT INTO purchase_cobrador_historial 
              (purchaseId, cobradorId, asignadoDesde, asignadoHasta) 
              VALUES ${placeholders}`,
            params
          );
        }
        const sizeProducts = purchase.products.length;
        if (sizeProducts > 0) {
          const injectionProducts = (product: ProductItem) => [
            purchase.id,
            product.productId,
            product.quantity,
          ];
          const placeholders = placeholdersGenerate({
            pattern: "(?, ?, ?)",
            count: sizeProducts,
          });
          const params = generateParams(purchase.products, injectionProducts);
          await db.runAsync(
            `INSERT INTO purchase_products 
            (purchaseId, productId, quantity) 
            VALUES ${placeholders}`,
            params
          );
        }
      });
    } catch (error) {
      throw new Error(`Failed to create purchase: ${error.message}`);
    }
  }
  async getById(id: string): Promise<Purchase | null> {
    const db = await getDatabaseConnection();

    // Obtener compra principal
    const purchaseResult = await db.getFirstAsync<TPurchase>(
      `SELECT * FROM purchases WHERE id = ?`,
      [id]
    );

    if (!purchaseResult) return null;

    // Obtener relaciones
    const [
      collectionFrequency,
      cobradorHistorial,
      products,
      payments,
      customer,
      cobrador,
      vendedor,
      status,
    ] = await Promise.all([
      PurchaseRepository.getCollectionFrequencyByPurchaseId(id, db),
      this.getCobradorHistorialByPurchaseId(db, id),
      this.getPurchaseProductsByPurchaseId(db, id),
      this.getPaymentsByPurchaseId(db, id),
      CustomerRepository.getAllDataById(id, db),
      UserRepository.getById(purchaseResult.collectorId, db), //para cobrador
      purchaseResult.vendedorId
        ? UserRepository.getById(purchaseResult.vendedorId, db)
        : Promise.resolve(null),
      StatusRepository.getStatusById(purchaseResult.statusId, db),
    ]);

    return {
      ...purchaseResult,
      cobradorId: purchaseResult.collectorId, // Ensure cobradorId is included
      collectionFrequency: collectionFrequency ?? undefined,
      cobradorHistorial: cobradorHistorial,
      products: products.map((p) => ({
        productId: p.productId,
        quantity: p.quantity,
        price: p.price,
        name: p.name,
      })),
      payments,
      customer,
      cobrador,
      vendedor: vendedor || undefined,
      status,
      isActive: purchaseResult.isActive == 1,
    };
  }
  static getCollectionFrequencyByPurchaseId(id: string, db: SQLiteDatabase) {
    return db.getFirstAsync<TCollectionFrequency>(
      `SELECT * FROM purchase_collection_frequency WHERE purchaseId = ?`,
      [id]
    );
  }
  getCollectionFrequencyByPurchaseId(id: string) {
    return PurchaseRepository.getCollectionFrequencyByPurchaseId(id, this.db);
  }
  getCobradorHistorialByPurchaseId(db: SQLiteDatabase, id: string) {
    return db.getAllAsync<TCollectorHistory>(
      `SELECT * FROM purchase_cobrador_historial WHERE purchaseId = ?`,
      [id]
    );
  }
  getPurchaseProductsByPurchaseId(db: SQLiteDatabase, id: string) {
    return db.getAllAsync<{
      productId: string;
      quantity: number;
      name: string;
      price: number;
    }>(
      `SELECT pp.productId, pp.quantity, p.name, p.price 
     FROM purchase_products pp
     LEFT JOIN products p ON pp.productId = p.id
     WHERE pp.purchaseId = ?`,
      [id]
    );
  }
  getPaymentsByPurchaseId(db: SQLiteDatabase, id: string) {
    return db.getAllAsync<TPayment>(
      `SELECT * FROM purchase_payments WHERE purchaseId = ?`,
      [id]
    );
  }
}
export class CobradorHistorialRepository {
  db: SQLiteDatabase;
  constructor(database: SQLiteDatabase) {
    this.db = database;
  }
}
