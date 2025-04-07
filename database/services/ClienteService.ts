import { Cliente } from "@database/repository/base/Entity";
import { SQLClienteRepository as ClienteRepository } from "@database/repository/ClienteRepository";

export class ClienteService {
  private clienteRepository: ClienteRepository;

  constructor(clienteRepository: ClienteRepository) {
    this.clienteRepository = clienteRepository;
  }

  async setNewClients(): Promise<Cliente[]> {
    // Lógica para obtener clientes que necesitan ser modificados
    return this.clienteRepository.getClientesAModificar();
  }
}