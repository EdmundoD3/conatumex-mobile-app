import errorHandler from "../../../error/errorHandler";
import { Vendedor } from "../ClienteRepository";

class VendedorTable {
  constructor({ id, vendedor }) {
    this.id = id;
    this.vendedor = vendedor;
  }

  async get() {
    const sql = `
        SELECT * FROM vendedor WHERE vendedor = ?;
      `;
    const queryParams = [this.vendedor];
    try {
      return await (await db).getFirstAsync(sql, queryParams);
    } catch (error) {
      console.error("Error fetching vendedor:", error);
      throw error;
    }
  }

  async save() {
    const query = `
        INSERT INTO vendedor (
          id, vendedor
        ) VALUES (?, ?)
      `;
    const values = [this.id, this.vendedor];
    try {
      return await (await db).runAsync(query, values);
    } catch (error) {
      console.error("Error saving vendedor:", error);
      throw error;
    }
  }

  async getOrSave() {
    const vendedor = await this.get();
    if (vendedor) return vendedor;
    await this.save();
    return await this.get();
  }

  static async saveAll(vendedores = []) {
    try {
      return await Promise.all(
        vendedores.map(
          async (vendedor) => await new VendedorTable(vendedor).save()
        )
      );
    } catch (error) {
      errorHandler(error)
    }
  }
}

class PagosTable {
  constructor({ id, cuentaId, pago, date }) {
    this.id = id;
    this.cuentaId = cuentaId;
    this.pago = pago;
    this.date = date;
  }
}
class CompraTable {
  constructor({ id, productoId, cuentaId, cantidad }) {
    this.id = id;
    this.productoId = productoId;
    this.cuentaId = cuentaId;
    this.cantidad = cantidad;
  }
}

class CuentaTable {
  constructor({
    id,
    mongodbId,
    clienteId,
    credito,
    contado,
    abono,
    date,
    contadoDate,
    nextCollectionDate,
    isChange,
    noCuenta,
    isActive,
    vendedorId,
  }) {
    this.id = id;
    this.mongodbId = mongodbId;
    this.clienteId = clienteId;
    this.credito = credito;
    this.contado = contado;
    this.abono = abono;
    this.date = date;
    this.contadoDate = contadoDate;
    this.nextCollectionDate = nextCollectionDate;
    this.isChange = isChange;
    this.noCuenta = noCuenta;
    this.isActive = isActive;
    this.vendedorId = vendedorId;
  }
}

export { CuentaTable, CompraTable, PagosTable, VendedorTable };
