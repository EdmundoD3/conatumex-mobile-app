import { PagoRepository } from "@database/repository/base/InterfacesRepository";
import { Pago } from "@database/repository/base/Entity";

class CuentaPagoManager {
  private pagoRepository: PagoRepository;

  constructor(pagoRepository: PagoRepository) {
    this.pagoRepository = pagoRepository;
  }

  async agregarPago(cuenta_id: number, pago: number, date: Date): Promise<void> {
    const nuevoPago = new Pago(0, cuenta_id, pago, date); // El ID se genera automáticamente
    await this.pagoRepository.create(nuevoPago);
  }

  async buscarPagosRecientes(cuenta_id: number, limit = 10): Promise<Pago[]> {
    return this.pagoRepository.getByCuenta(cuenta_id);
  }

  async calcularSaldo(cuenta_id: number): Promise<number> {
    const pagos = await this.pagoRepository.getByCuenta(cuenta_id);
    return pagos.reduce((total, pago) => total + pago.pago, 0);
  }
}