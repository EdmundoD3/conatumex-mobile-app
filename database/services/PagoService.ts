import { SQLPagoRepository } from "@database/repository/PagosRepository";
import { Pago } from "@database/repository/base/Entity";

export class PagoService {
  private pagoRepository: SQLPagoRepository;

  constructor(pagoRepository: SQLPagoRepository) {
    this.pagoRepository = pagoRepository;
  }

  async obtenerPagosDesde(fechaInicio: Date): Promise<Pago[]> {
    return this.pagoRepository.getByAfterDate(fechaInicio);
  }
}