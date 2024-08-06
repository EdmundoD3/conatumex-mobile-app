import { NetworkError, TimeoutError } from "../error/typeErrors";

function fetchWithTimeout(url, options, timeout = 5000) {
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
        reject(new NetworkError(err));
      });
  });
}

export {fetchWithTimeout}