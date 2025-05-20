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
  TPurchaseProduct,
} from "@database/initialization/tables/PurchaseTable";
import {
  Payment,
  ProductItem,
  Purchase,
} from "@database/interfaces/PrincipalInterface";
import { getDatabaseConnection } from "@database/sqlite";
import { SQLiteDatabase } from "expo-sqlite";
import { StatusRepository } from "./StatusRepository";
import { UserRepository } from "./UserRepository";
import { CustomerRepository } from "./CustomerRepository";
import { BaseRepository } from "./base/BaseRepository";

export class PurchaseRepository extends BaseRepository {
  async create(purchase: Purchase) {
    const db = await this.getDb();
    return PurchaseRepository.create(purchase, db);
  }
  static async create(purchase: Purchase, db: SQLiteDatabase): Promise<void> {
    // const db = await getDatabaseConnection();

    try {
      await db.withTransactionAsync(async () => {
        await PurchaseRepository.setPurchaseTable(purchase, db);
        //collection frequency insert
        if (purchase.collectionFrequency) {
          const collectionFrequency: TCollectionFrequency = {
            ...purchase.collectionFrequency,
            purchaseId: purchase.id,
          };
          await PurchaseRepository.setCollectionFrequencyInTable(
            collectionFrequency,
            db
          );
        }
        await PurchaseRepository.setCobradorHistorialInTable(
          purchase.cobradorHistorial,
          purchase.id,
          db
        );
        await PurchaseRepository.setInProductsTable(
          purchase.products,
          purchase.id,
          db
        );
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
      UserRepository.getById(purchaseResult.cobradorId, db), //para cobrador
      purchaseResult.vendedorId
        ? UserRepository.getById(purchaseResult.vendedorId, db)
        : Promise.resolve(null),
      StatusRepository.getStatusById(purchaseResult.statusId, db),
    ]);
    const formatedPayment: Payment[] = payments.map(
      ({ amount, date, id, userId }) => ({
        amount,
        createdAt: date,
        userId,
        id: id.toString(),
        date,
      })
    );
    const res: Purchase = {
      ...purchaseResult,
      cobradorId: purchaseResult.cobradorId, // Ensure cobradorId is included
      collectionFrequency: collectionFrequency ?? undefined,
      cobradorHistorial: cobradorHistorial,
      products: products.map((p) => ({
        productId: p.productId,
        quantity: p.quantity,
        price: p.price,
        name: p.name,
      })),
      payments: formatedPayment,
      customer,
      cobrador,
      vendedor: vendedor || undefined,
      status,
      isActive: purchaseResult.isActive == 1,
    };
    return res;
  }
  static getCollectionFrequencyByPurchaseId(id: string, db: SQLiteDatabase) {
    return db.getFirstAsync<TCollectionFrequency>(
      `SELECT * FROM purchase_collection_frequency WHERE purchaseId = ?`,
      [id]
    );
  }
  async getCollectionFrequencyByPurchaseId(id: string) {
    const db = await this.getDb();
    return PurchaseRepository.getCollectionFrequencyByPurchaseId(id, db);
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
  private static setPurchaseTable(purchase: TPurchase, db: SQLiteDatabase) {
    return db.runAsync(
      `INSERT INTO purchases (
        id, customerId, vendedorId, cobradorId, saleDate, creditPrice, cashPrice,
        cashPriceEndDate, collectionDate, totalPaid,
        statusId, isActive
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
        purchase.statusId,
        purchase.isActive ? 1 : 0
      ]
    );
  }
  private static setCollectionFrequencyInTable(
    { amount, frequency, nextVisit, purchaseId }: TCollectionFrequency,
    db: SQLiteDatabase
  ) {
    return db.runAsync(
      `INSERT INTO purchase_collection_frequency 
        (purchaseId, amount, frequency, nextVisit) 
        VALUES (?,?,?,?)`,
      [purchaseId, amount, frequency, nextVisit]
    );
  }
  private static setCobradorHistorialInTable(
    cobradorHistorial: Omit<TCollectorHistory, "purchaseId">[],
    purchaseId: string,
    db: SQLiteDatabase
  ) {
    const size = cobradorHistorial.length;
    if (size <= 0) return null;
    const injectionCobradorHistorialParams = (e: TCollectorHistory) => [
      purchaseId, // purchaseId
      e.cobradorId ?? null, // cobradorId
      e.asignadoDesde ?? null, // asignadoDesde
      e.asignadoHasta ?? null, // asignadoHasta
    ];
    // Generar los placeholders correctamente
    const placeholders = placeholdersGenerate({
      pattern: "(?, ?, ?, ?)",
      count: size,
    });

    // Obtener parámetros aplanados
    const params = generateParams(
      cobradorHistorial,
      injectionCobradorHistorialParams
    );

    return db.runAsync(
      `INSERT INTO purchase_cobrador_historial 
        (purchaseId, cobradorId, asignadoDesde, asignadoHasta) 
        VALUES ${placeholders}`,
      params
    );
  }
  private static setInProductsTable(
    products: Omit<TPurchaseProduct, "purchaseId">[],
    purchaseId: string,
    db: SQLiteDatabase
  ) {
    const size = products.length;
    if (size <= 0) return null;
    const injectionProducts = (product: ProductItem) => [
      purchaseId,
      product.productId,
      product.quantity,
    ];
    const placeholders = placeholdersGenerate({
      pattern: "(?, ?, ?)",
      count: size,
    });
    const params = generateParams(products, injectionProducts);
    return db.runAsync(
      `INSERT INTO purchase_products 
      (purchaseId, productId, quantity) 
      VALUES ${placeholders}`,
      params
    );
  }
}
export class CobradorHistorialRepository {
  db: SQLiteDatabase;
  constructor(database: SQLiteDatabase) {
    this.db = database;
  }
}
