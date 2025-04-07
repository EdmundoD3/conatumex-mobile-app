import { ExecutionInProgressError } from "@error/typeErrors";

/**
 * eventManager es una función de orden superior que limita la ejecución de una función asíncrona,
 * evitando que se realicen múltiples invocaciones hasta que la ejecución actual haya terminado.
 * También lanza un error si la función no se completa dentro de un tiempo especificado.
 *
 * @param fn - La función asíncrona a limitar. Puede aceptar cualquier número de argumentos.
 * @param delay - Tiempo en milisegundos para esperar antes de permitir otra ejecución de la función. 
 *                El valor predeterminado es 3000 ms (3 segundos).
 * @returns Una función que limita la ejecución de `fn`.
 */
const eventManager = (fn: Function, delay = 3000) => {
  let executing = false; // Bandera para verificar si la función está en ejecución.

  return async (...args: any) => {
    if (!executing) {
      executing = true; // Marca que la función está en ejecución.
      try {
        await fn(...args); // Ejecuta la función asíncrona.
      } catch (error) {
        throw new ExecutionInProgressError(error); // Lanza un error si ocurre.
      } finally {
        setTimeout(() => (executing = false), delay); // Restablece la bandera después del tiempo especificado.
      }
    }
  };
};

export { eventManager };
