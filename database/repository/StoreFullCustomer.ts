import db from "@database/sqlite";
import { Cliente, ClienteServer } from "@database/repository/base/Entity";
import { SQLClienteRepository } from "@database/repository/ClienteRepository";
import { SQLAddressRepository } from "@database/repository/AddresRepository";
import { SQLPagoRepository } from "@database/repository/PagosRepository";

async function StoreFullCustomer(cliente: ClienteServer): Promise<void> {
  // Crear instancias de los repositorios
  const clienteRepository = new SQLClienteRepository();
  const addressRepository = new SQLAddressRepository();
  const pagoRepository = new SQLPagoRepository();

  // Iniciar una transacción
  await (await db).runAsync("BEGIN TRANSACTION");

  try {
    // Almacenar el cliente
    await clienteRepository.create(cliente);

    // Almacenar la dirección
    await addressRepository.create(cliente.direccion);

    // Almacenar los pagos
    for (const pago of cliente.pagos) {
      await pagoRepository.create(pago);
    }

    // Confirmar la transacción
    await (await db).runAsync("COMMIT");
  } catch (error) {
    // Revertir la transacción en caso de error
    await (await db).runAsync("ROLLBACK");
    throw new Error("Error al almacenar el cliente: " + error.message);
  }
}