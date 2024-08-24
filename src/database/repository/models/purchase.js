
class VendedorTable {
    constructor({ id, vendedor }) {
        this.id = id;
        this.vendedor = vendedor;
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
    constructor({ id, mongodbId, clienteId, credito, contado, abono, date, contadoDate, nextCollectionDate, isChange, noCuenta, isActive,vendedorId }) {
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
        this.vendedorId = vendedorId
    }
}

export {CuentaTable,CompraTable,PagosTable,VendedorTable}