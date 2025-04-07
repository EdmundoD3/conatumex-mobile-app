import { NetworkError, TimeoutError } from "@error/typeErrors";

type FetchOptions = RequestInit; // Puedes agregar tipos más específicos si conoces la estructura de las opciones

function fetchWithTimeout(url: string, options: FetchOptions, timeout: number = 5000): Promise<Response> {
  return new Promise((resolve, reject) => {
    // Crear un temporizador que rechace la promesa después de un tiempo determinado
    const timer = setTimeout(() => {
      reject(new TimeoutError('Request timed out'));
    }, timeout);

    // Realizar el fetch
    fetch(url, options)
      .then(response => {
        clearTimeout(timer);
        resolve(response);
      })
      .catch(err => {
        clearTimeout(timer);
        reject(new NetworkError(err.message || 'Network error occurred'));
      });
  });
}

export { fetchWithTimeout };
