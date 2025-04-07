import { PagoService } from "./PagoService";
import { ClienteService } from "./ClienteService";

export class ReporteService {
  private pagoService: PagoService;
  private clienteService: ClienteService;

  constructor(pagoService: PagoService, clienteService: ClienteService) {
    this.pagoService = pagoService;
    this.clienteService = clienteService;
  }

  async getDataToSend(fechaInicio: Date): Promise<ReporteDatos> {
    // Obtener pagos desde cierta fecha
    const pagos = await this.pagoService.obtenerPagosDesde(fechaInicio);

    // Obtener nuevos clientes desde cierta fecha
    const nuevosClientes = await this.clienteService.obtenerNuevosClientesDesde(fechaInicio);

    // Obtener clientes que necesitan ser modificados
    const clientesAModificar = await this.clienteService.obtenerClientesAModificar();

    return {
      pagos,
      nuevosClientes,
      clientesAModificar,
    };
  }

  async sendDataToServer(datos: ReporteDatos): Promise<void> {
    // Lógica para enviar los datos al servidor
    console.log("Enviando datos al servidor:", datos);
    // Aquí podrías hacer una solicitud HTTP, por ejemplo:
    // await fetch("https://api.tuservidor.com/reporte", { method: "POST", body: JSON.stringify(datos) });
  }
}

// Tipo para los datos del reporte
interface ReporteDatos {
  pagos: Pago[];
  nuevosClientes: Cliente[];
  clientesAModificar: Cliente[];
}